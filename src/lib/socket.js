/* @flow */
/* eslint unicorn/prefer-add-event-listener: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { request, uniqueID } from 'belter/src';

import { sleep } from './util';

const MESSAGE_TYPE = {
    REQUEST:  ('request' : 'request'),
    RESPONSE: ('response' : 'response')
};

const RESPONSE_STATUS = {
    SUCCESS: ('success' : 'success'),
    ERROR:   ('error' : 'error')
};

type RequestMessage<T> = {|
    source_app : string,
    source_app_version : string,
    target_app : string,
    message_type : typeof MESSAGE_TYPE.REQUEST,
    message_uid : string,
    request_uid : string,
    session_uid? : string,
    message_name : string,
    message_data : T
|};

type ResponseMessage<T> = {|
    source_app : string,
    source_app_version : string,
    target_app : string,
    message_type : typeof MESSAGE_TYPE.RESPONSE,
    message_uid : string,
    request_uid : string,
    session_uid? : string,
    message_name : string,
    message_status : string,
    message_data : T
|};

type MessageSocketDriver = {|
    send : (string) => void,
    close : () => void,
    onMessage : ((string) => void) => void,
    onError : ((mixed) => void) => void,
    onOpen : (() => void) => void,
    onClose : ((Error) => void) => void,
    isOpen : () => boolean
|};

export type MessageSocketOptions = {|
    sessionUID : string,
    driver : () => MessageSocketDriver,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string,
    retry? : boolean
|};

export type MessageSocket = {|
    on : <T, R>( // eslint-disable-line no-undef
        name : string,
        handler : ({ data : T }) => ZalgoPromise<R> | R, // eslint-disable-line no-undef
        opts? : {|
            requireSessionUID? : boolean
        |}
    ) => void,
    send : <T, R>( // eslint-disable-line no-undef
        name : string,
        data : T, // eslint-disable-line no-undef
        opts? : {|
            requireSessionUID? : boolean
        |}
    ) => ZalgoPromise<R>, // eslint-disable-line no-undef
    reconnect : () => ZalgoPromise<void>,
    close : () => void
|};

export function messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp, retry = true } : MessageSocketOptions) : MessageSocket {

    const receivedMessages = {};
    const requestListeners = {};
    const responseListeners = {};

    const sendMessage = (socket, data) => {
        const messageUID = uniqueID();

        const message = {
            message_uid:        messageUID,
            source_app:         sourceApp,
            source_app_version: sourceAppVersion,
            target_app:         targetApp,
            ...data
        };

        socket.send(JSON.stringify(message));
    };

    const sendResponse = (socket, { messageName, responseStatus, responseData, messageSessionUID, requestUID }) => {
        if (!socket.isOpen()) {
            return;
        }
        
        return sendMessage(socket, {
            session_uid:        messageSessionUID,
            request_uid:        requestUID,
            message_name:       messageName,
            message_status:     responseStatus,
            message_type:       MESSAGE_TYPE.RESPONSE,
            message_data:       responseData
        });
    };

    const onRequest = (socket, { messageSessionUID, requestUID, messageName, messageData }) => {
        return ZalgoPromise.try(() => {
            const requestListener = requestListeners[messageName];

            if (!requestListener) {
                throw new Error(`No listener found for name: ${ messageName }`);
            }

            const { handler, requireSessionUID } = requestListener;

            if (requireSessionUID && messageSessionUID !== sessionUID) {
                throw new Error(`Incorrect sessionUID: ${ messageSessionUID || 'undefined' }`);
            }

            return handler({ data: messageData });
        }).then(res => {
            sendResponse(socket, { responseStatus: RESPONSE_STATUS.SUCCESS, responseData: res, messageName, messageSessionUID, requestUID  });
        }, err => {
            const res = { message: (err && err.message) ? err.message : 'Unknown error' };
            sendResponse(socket, { responseStatus: RESPONSE_STATUS.ERROR, responseData: res, messageName, messageSessionUID, requestUID });
        });
    };

    const onResponse = ({ requestUID, messageSessionUID, responseStatus, messageData }) => {
        const { listenerPromise, requireSessionUID } = responseListeners[requestUID];
        
        if (!listenerPromise) {
            throw new Error(`Could not find response listener with id: ${ requestUID }`);
        }

        if (requireSessionUID && messageSessionUID !== sessionUID) {
            throw new Error(`Incorrect sessionUID: ${ messageSessionUID || 'undefined' }`);
        }
        
        delete responseListeners[requestUID];
        
        if (responseStatus === RESPONSE_STATUS.SUCCESS) {
            listenerPromise.resolve({ data: messageData });
        } else if (responseStatus === RESPONSE_STATUS.ERROR) {
            listenerPromise.reject(new Error(messageData.message));
        } else {
            throw new Error(`Can not handle response status: ${ status || 'undefined' }`);
        }
    };

    const onMessage = <T>(socket, rawData) => {
        let parsedData : RequestMessage<T> | ResponseMessage<T>;

        try {
            parsedData = JSON.parse(rawData);
        } catch (err) {
            throw new Error(`Could not parse socket message: ${ rawData }`);
        }

        if (!parsedData) {
            throw new Error(`No data passed from socket message`);
        }
    
        const {
            session_uid:    messageSessionUID,
            request_uid:    requestUID,
            message_uid:    messageUID,
            message_name:   messageName,
            message_type:   messageType,
            message_data:   messageData,
            message_status: responseStatus,
            target_app:     messageTargetApp
        } = parsedData;

        if (!messageUID || !requestUID || !messageName || !messageType || !messageTargetApp) {
            throw new Error(`Incomplete message: ${ rawData }`);
        }

        if (receivedMessages[messageUID] || messageTargetApp !== sourceApp) {
            return;
        }

        receivedMessages[messageUID] = true;

        if (messageType === MESSAGE_TYPE.REQUEST) {
            return onRequest(socket, { messageSessionUID, requestUID, messageName, messageData });

        } else if (messageType === MESSAGE_TYPE.RESPONSE) {
            return onResponse({ requestUID, messageSessionUID, responseStatus, messageData });
        
        } else {
            throw new Error(`Unhandleable message type: ${ messageType }`);
        }
    };

    let closed = false;
    let retryDelay;

    const updateRetryDelay = () => {
        if (retry) {
            retryDelay = retryDelay ? (retryDelay * 2) : 1;
        }
    };

    let socketPromise;
    let retryPromise;

    const init = () => {
        socketPromise = ZalgoPromise.try(() => {
            if (retryDelay) {
                retryPromise = ZalgoPromise.delay(retryDelay);
                return retryPromise;
            }
        }).then(() => {
            retryPromise = null;
            const instance = driver();

            const connectionPromise = new ZalgoPromise((resolve, reject) => {
                instance.onOpen(() => {
                    closed = false;
                    retryDelay = 0;
                    resolve(instance);
                });

                instance.onClose(err => {
                    closed = true;
                    reject(err || new Error('socket closed'));
                    updateRetryDelay();
                    init();
                });
        
                instance.onError(err => {
                    reject(err);
                });
            });

            instance.onMessage(rawMessage => {
                return connectionPromise.then(socket => {
                    return onMessage(socket, rawMessage);
                });
            });

            return connectionPromise;
        });
    };

    init();

    const on = (name, handler, { requireSessionUID = true } = {}) => {
        if (requestListeners[name]) {
            throw new Error(`Listener already registered for name: ${ name }`);
        }

        requestListeners[name] = {
            handler,
            requireSessionUID
        };
    };

    const send = <T, R>(messageName, messageData : T, { requireSessionUID = true } = {}) : ZalgoPromise<R> => {
        return socketPromise.then(socket => {
            const requestUID = uniqueID();

            const listenerPromise = new ZalgoPromise();
            responseListeners[requestUID] = {
                listenerPromise,
                requireSessionUID
            };

            sendMessage(socket, {
                request_uid:  requestUID,
                message_name: messageName,
                message_type: MESSAGE_TYPE.REQUEST,
                message_data: messageData
            });

            return listenerPromise;
        });
    };

    const reconnect = () => {
        return ZalgoPromise.try(() => {
            if (!closed) {
                return socketPromise;
            }
            
            if (retryPromise) {
                retryPromise.resolve();
                return socketPromise;
            }

            retryDelay = 0;
            return init();
        });
    };

    const close = () => {
        retry = false;
        socketPromise.then(socket => {
            socket.close();
        });
    };

    return { on, send, reconnect, close };
}

type WebSocketOptions = {|
    sessionUID : string,
    url : string,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string
|};
 
export function webSocket({ sessionUID, url, sourceApp, sourceAppVersion, targetApp } : WebSocketOptions) : MessageSocket {
    const driver = () => {
        const socket = new WebSocket(url);

        return {
            send: (data) => {
                socket.send(data);
            },
            close: () => {
                socket.close();
            },
            onMessage: (handler) => {
                socket.onmessage = (event) => {
                    const data = event.data;
    
                    if (typeof data !== 'string' || !data) {
                        throw new TypeError(`Expected string data from web socket`);
                    }
    
                    handler(data);
                };
            },
            onError: (handler) => {
                socket.onerror = () => {
                    handler(new Error(`The socket encountered an error`));
                };
            },
            onOpen: (handler) => {
                socket.onopen = () => handler();
            },
            onClose: (handler) => {
                socket.onclose = () => handler(new Error(`Websocket connection closed`));
            },
            isOpen: () => {
                return socket.readyState === WebSocket.OPEN;
            }
        };
    };

    return messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp });
}

export function httpSocket({ url, sourceApp, sourceAppVersion, targetApp, sessionUID } : WebSocketOptions) : MessageSocket {
    const driver = () => {
        const onMessageHandlers = [];
        const onErrorHandlers = [];
        const onCloseHandlers = [];

        let open = true;
        let errDelay = 1;

        const flush = (messages) => {
            for (const message of messages) {
                for (const handler of onMessageHandlers) {
                    handler(JSON.stringify(message, null, 4));
                }
            }
        };
    
        const error = (err) => {
            for (const handler of onErrorHandlers) {
                handler(err);
            }
        };

        const close = (err) => {
            open = false;
            for (const handler of onCloseHandlers) {
                handler(err);
            }
        };
    
        const fullURL = `${ url }/${ sessionUID }`;
    
        const poll = () => {
            if (!open) {
                return;
            }
            
            return request({ url: fullURL }).then(({ status, body }) => {
                if (status !== 200) {
                    throw new Error(`Bad status code from ${ url }: ${ status }`);
                }
    
                if (!body || !body.messages || !Array.isArray(body.messages)) {
                    throw new Error(`Expected messages to be an array`);
                }
    
                flush(body.messages);
    
            }).catch(err => {
    
                if (errDelay >= 32) {
                    error(err);
                    return new ZalgoPromise();
                }
    
                errDelay *= 2;
                return sleep(errDelay);
    
            }).then(() => {
                return poll();
            });
        };

        poll();

        return {
            send: (data) => {
                request({
                    url,
                    method: 'post',
                    json:   {
                        poll:     false,
                        messages: [
                            JSON.parse(data)
                        ]
                    }
                }).catch(error);
            },
            close: () => {
                close(new Error(`Http socket was closed`));
            },
            onMessage: (handler) => {
                onMessageHandlers.push(handler);
            },
            onError: (handler) => {
                onErrorHandlers.push(handler);
            },
            onOpen: (handler) => {
                handler();
            },
            onClose: (handler) => {
                onCloseHandlers.push(handler);
            },
            isOpen: () => {
                return open;
            }
        };
    };

    return messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp });
}
