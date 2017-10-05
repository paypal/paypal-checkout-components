
export function mockButtonTypes() {
    return {
        res: {
            data: {
                eligible: []
            }
        }
    };
}

export function mockPre() {
    return {
        buttonTypes: mockButtonTypes()
    };
}

export function mockConfig() {
    return {
        urls: {
            incontextScript: 'https://www.paypalobjects.com/api'
        }
    };
}

export function mockMeta() {
    return {
        version: '4',
        staticUrl: '/webapps/hermes/static',
        buildId: 'hermes-xxx',
        env: 'test',
        icstage: 'stage2md0xx'
    };
}

export function mockCookies() {
    return {

    };
}

export function mockContext() {
    return {
        config: mockConfig(),
        meta: mockMeta(),
        cookies: mockCookies(),
        pre: mockPre()
    };
}

export function mockReq() {
    return {
        query: {
            'locale.x': 'en_US'
        }
    };
}