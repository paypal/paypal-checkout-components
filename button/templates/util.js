
import request from 'request-promise';

export function query(req, key, def) {
    return req.query[key] || def;
}

export function array(req, key) {
    return query(req, key, '').split(',').filter(Boolean);
}

export function bool(req, key, def) {

    let val = query(req, key, def);

    if (val === 'true') {
        return true;
    }

    if (val === 'false') {
        return false;
    }
}

export function number(req, key, def) {

    let val = query(req, key, def);

    if (val) {
        return parseInt(val, 10);
    }
}

export function safeJSON() {
    return JSON.stringify.apply(null, arguments).replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
}

export function pollForResource(url, handler, delay, failureThreshold = 5) {
    
    let poll = async () => {
        try {
            let code = await request(`${ url }?ts=${ Date.now() }`);
            await handler(code);

        } catch (err) {
            console.error(err && err.stack);
        }

        setTimeout(poll, delay);
    };

    poll();
}