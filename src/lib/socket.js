/* @flow */
/* eslint unicorn/prefer-add-event-listener: off */

import { ZalgoPromise } from 'zalgo-promise/src';
import { request, uniqueID, once } from 'belter/src';

import { sleep } from './util';

const MESSAGE_TYPE = {
    REQUEST:  ('request' : 'request'),
    RESPONSE: ('response' : 'response')
};

const MESSAGE_STATUS = {
    SUCCESS: ('success' : 'success'),
    ERROR:   ('error' : 'error')
};

type RequestMessage<T> = {|
    app_name : string,
    app_version : string,
    type : typeof MESSAGE_TYPE.REQUEST,
    id : string,
    session_uid? : string,
    name : string,
    data : T
|};

type ResponseMessage<T> = {|
    app_name : string,
    app_version : string,
    type : typeof MESSAGE_TYPE.RESPONSE,
    status : $Values<typeof MESSAGE_STATUS>,
    id : string,
    session_uid? : string,
    name : string,
    data : T
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
    appName : string,
    appVersion : string
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

export function messageSocket({ sessionUID, driver, appName, appVersion } : MessageSocketOptions) : MessageSocket {
    
    const socketPromise = new ZalgoPromise();

    const requestListeners = {};
    const responseListeners = {};

    driver.open();

    driver.onOpen(() => {
        socketPromise.resolve(driver);
    });

    driver.onMessage(<T>(messageData) => {
        let parsedData : RequestMessage<T> | ResponseMessage<T>;

        try {
            parsedData = JSON.parse(messageData);
        } catch (err) {
            throw new Error(`Could not parse socket message: ${ messageData }`);
        }

        if (!parsedData) {
            throw new Error(`No data passed from socket message`);
        }
        
        const { id, name, type, data, session_uid } = parsedData;

        if (!id || !name || !type) {
            throw new Error(`Incomplete message: ${ messageData }`);
        }

        if (type === MESSAGE_TYPE.REQUEST) {
            
            const sendResponse = <R>(status, responseData : R) => {
                const response : ResponseMessage<R> = {
                    id,
                    name,
                    status,
                    type:        MESSAGE_TYPE.RESPONSE,
                    data:        responseData,
                    app_name:    appName,
                    app_version: appVersion
                };

                return socketPromise.then(socket => {
                    return socket.send(JSON.stringify(response, null, 4));
                });
            };

            ZalgoPromise.try(() => {
                const requestListener = requestListeners[name];

                if (!requestListener) {
                    throw new Error(`No listener found for name: ${ name }`);
                }

                if (session_uid !== sessionUID) {
                    throw new Error(`Incorrect sessionUID: ${ session_uid || 'undefined' }`);
                }

                return requestListener({ data });
            }).then(res => {
                sendResponse(MESSAGE_STATUS.SUCCESS, res);
            }, err => {
                sendResponse(MESSAGE_STATUS.ERROR, { message: (err && err.message) ? err.message : 'Unknown error' });
            });

        } else if (type === MESSAGE_TYPE.RESPONSE) {
            const responseListener = responseListeners[id];
            const { status } = parsedData;

            if (!responseListener) {
                throw new Error(`Could not find response listener with id: ${ id }`);
            }

            delete responseListeners[id];

            if (status === MESSAGE_STATUS.SUCCESS) {
                responseListener.resolve({ data });
            } else if (status === MESSAGE_STATUS.ERROR) {
                responseListener.reject(new Error(data.message));
            } else {
                throw new Error(`Can not handle response status: ${ status || 'undefined' }`);
            }

            delete responseListeners[id];
            responseListener.resolve({ data, sessionUID: session_uid });
            
        } else {
            throw new Error(`Unhandleable message type: ${ type }`);
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

    const send = <T, R>(name, data : T) : ZalgoPromise<R> => {
        return socketPromise.then(socket => {
            const id = uniqueID();

            const message : RequestMessage<T> = {
                id,
                name,
                data,
                app_name:    appName,
                app_version: appVersion,
                type:        MESSAGE_TYPE.REQUEST
            };

            const responseListener = new ZalgoPromise();
            responseListeners[id] = responseListener;

            socket.send(JSON.stringify(message));

            return responseListener;
        });
    };

    return { on, send };
}

type WebSocketOptions = {|
    sessionUID : string,
    url : string,
    appName : string,
    appVersion : string
|};
 
export function webSocket({ sessionUID, url, appName, appVersion } : WebSocketOptions) : MessageSocket {
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

    return messageSocket({ sessionUID, driver, appName, appVersion });
}

export function httpSocket({ url, appName, appVersion, sessionUID } : WebSocketOptions) : MessageSocket {
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

    return messageSocket({ sessionUID, driver, appName, appVersion });
}
