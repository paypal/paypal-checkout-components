/* @flow */

type MockReq = {|
    query : { [string] : string }
|};

export function mockReq(opts : Object = {}) : MockReq {
    return {
        query: {},
        get:   () => undefined,
        ...opts
    };
}

type MockRes = {|
    _status : number,
    _headers : { [string] : string },
    _body? : string,

    status : (number) => MockRes,
    header : (string, string) => MockRes,
    send : (string) => MockRes,

    getStatus : () => number,
    removeHeader : (string) => void,
    getHeader : (string) => ?string,
    getBody : () => ?string
|};

export function mockRes(opts : Object = {}) : MockRes {
    return {
        _status:  200,
        _headers: {},

        status(status : number) : MockRes {
            this._status = status;
            return this;
        },
        header(key : string, value : string) : MockRes {
            this._headers[key] = value;
            return this;
        },
        send(str : string) : MockRes {
            this.body = str;
            return this;
        },
        getStatus() : number {
            return this._status;
        },
        getHeader(name : string) : ?string {
            return this._headers[name];
        },
        removeHeader(name : string) {
            delete this._headers[name];
        },
        getBody() : ?string {
            return this.body;
        },
        ...opts
    };
}
