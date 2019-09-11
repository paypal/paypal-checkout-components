/* @flow */
/* eslint unicorn/prefer-add-event-listener: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { request, uniqueID, once } from 'belter/src';

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
    open : () => void,
    send : (string) => void,
    onMessage : ((string) => void) => void,
    onError : ((mixed) => void) => void,
    onOpen : (() => void) => void,
    onClose : ((Error) => void) => void
|};

export type MessageSocketOptions = {|
    sessionUID : string,
    driver : MessageSocketDriver,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string
|};

export type MessageSocket = {|
    on : (
        name : string,
        handler : <T, R>({ data : T }) => ZalgoPromise<R> | R // eslint-disable-line no-undef
    ) => void,
    send : <T, R>( // eslint-disable-line no-undef
        name : string,
        data : T // eslint-disable-line no-undef
    ) => ZalgoPromise<R> // eslint-disable-line no-undef
|};

export function messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp } : MessageSocketOptions) : MessageSocket {
    
    const socketPromise = new ZalgoPromise();

    const receivedMessages = {};
    const requestListeners = {};
    const responseListeners = {};

    driver.open();

    driver.onOpen(() => {
        socketPromise.resolve(driver);
    });

    driver.onMessage(<T>(rawData) => {
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
            session_uid:  messageSessionUID,
            request_uid:  requestUID,
            message_uid:  messageUID,
            message_name: messageName,
            message_type: messageType,
            message_data: messageData,
            target_app:   messageTargetApp
        } = parsedData;

        if (!messageUID || !requestUID || !messageName || !messageType || !messageTargetApp) {
            throw new Error(`Incomplete message: ${ rawData }`);
        }

        if (receivedMessages[messageUID] || messageTargetApp !== sourceApp) {
            return;
        }

        receivedMessages[messageUID] = true;

        if (messageType === MESSAGE_TYPE.REQUEST) {
            
            const sendResponse = <R>({ responseStatus, responseData } : { responseStatus : $Values<typeof RESPONSE_STATUS>, responseData : R }) => {
                const responseMessageUID = uniqueID();
                
                const response : ResponseMessage<R> = {
                    session_uid:        messageSessionUID,
                    request_uid:        requestUID,
                    message_uid:        responseMessageUID,
                    message_name:       messageName,
                    message_status:     responseStatus,
                    message_type:       MESSAGE_TYPE.RESPONSE,
                    message_data:       responseData,
                    source_app:         sourceApp,
                    source_app_version: sourceAppVersion,
                    target_app:         targetApp
                };

                return socketPromise.then(socket => {
                    return socket.send(JSON.stringify(response, null, 4));
                });
            };

            ZalgoPromise.try(() => {
                const requestListener = requestListeners[messageName];

                if (!requestListener) {
                    throw new Error(`No listener found for name: ${ messageName }`);
                }

                if (messageSessionUID !== sessionUID) {
                    throw new Error(`Incorrect sessionUID: ${ messageSessionUID || 'undefined' }`);
                }

                return requestListener({ data: messageData });
            }).then(res => {
                sendResponse({ responseStatus: RESPONSE_STATUS.SUCCESS, responseData: res });
            }, err => {
                const res = { message: (err && err.message) ? err.message : 'Unknown error' };
                sendResponse({ responseStatus: RESPONSE_STATUS.ERROR, responseData: res });
            });

        } else if (messageType === MESSAGE_TYPE.RESPONSE) {
            const responseListener = responseListeners[requestUID];
            const {
                message_status: responseStatus
            } = parsedData;

            if (!responseListener) {
                throw new Error(`Could not find response listener with id: ${ requestUID }`);
            }

            delete responseListeners[requestUID];

            if (responseStatus === RESPONSE_STATUS.SUCCESS) {
                responseListener.resolve({ data: messageData });
            } else if (responseStatus === RESPONSE_STATUS.ERROR) {
                responseListener.reject(new Error(messageData.message));
            } else {
                throw new Error(`Can not handle response status: ${ status || 'undefined' }`);
            }
            
        } else {
            throw new Error(`Unhandleable message type: ${ messageType }`);
        }
    });

    driver.onClose(err => {
        socketPromise.asyncReject(err);
    });

    driver.onError(err => {
        socketPromise.asyncReject(err);
    });

    const on = (name, handler) => {
        if (requestListeners[name]) {
            throw new Error(`Listener already registered for name: ${ name }`);
        }

        requestListeners[name] = handler;
    };

    const send = <T, R>(messageName, messageData : T) : ZalgoPromise<R> => {
        return socketPromise.then(socket => {
            const requestUID = uniqueID();
            const messageUID = uniqueID();

            const message : RequestMessage<T> = {
                request_uid:        requestUID,
                message_uid:        messageUID,
                message_name:       messageName,
                message_type:       MESSAGE_TYPE.REQUEST,
                message_data:       messageData,
                source_app:         sourceApp,
                source_app_version: sourceAppVersion,
                target_app:         targetApp
            };

            const responseListener = new ZalgoPromise();
            responseListeners[requestUID] = responseListener;

            socket.send(JSON.stringify(message));

            return responseListener;
        });
    };

    return { on, send };
}

type WebSocketOptions = {|
    sessionUID : string,
    url : string,
    sourceApp : string,
    sourceAppVersion : string,
    targetApp : string
|};
 
export function webSocket({ sessionUID, url, sourceApp, sourceAppVersion, targetApp } : WebSocketOptions) : MessageSocket {
    let socket;

    const driver = {
        open: () => {
            socket = new WebSocket(url);
        },
        send: (data) => {
            socket.send(data);
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
        }
    };

    return messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp });
}

export function httpSocket({ url, sourceApp, sourceAppVersion, targetApp, sessionUID } : WebSocketOptions) : MessageSocket {
    const onMessageHandlers = [];
    const onErrorHandlers = [];
    const onOpenHandlers = [];

    let isOpen = false;
    let errDelay = 1;

    const open = () => {
        for (const handler of onOpenHandlers) {
            handler();
        }
    };

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

    const fullURL = `${ url }/${ sessionUID }`;

    const poll = () => {
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
    
    const driver = {
        open: once(() => {
            open();
            poll();
            isOpen = true;
        }),
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
        onMessage: (handler) => {
            onMessageHandlers.push(handler);
        },
        onError: (handler) => {
            onErrorHandlers.push(handler);
        },
        onOpen: (handler) => {
            if (isOpen) {
                handler();
            } else {
                onOpenHandlers.push(handler);
            }
        },
        onClose: () => {
            // pass
        }
    };

    return messageSocket({ sessionUID, driver, sourceApp, sourceAppVersion, targetApp });
}
