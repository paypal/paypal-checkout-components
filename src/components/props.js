
export let props = {

    token: {
        type: 'string',
        required: false
    },

    getToken: {
        type: 'function',
        required: false,
        denodeify: true,
        precall: true
    },

    onPaymentAuthorize: {
        type: 'function',
        required: false,
        once: true,
        autoClose: true
    },

    onPaymentComplete: {
        type: 'function',
        required: false,
        once: true,
        autoClose: true
    },

    onCancel: {
        type: 'function',
        required: false,
        once: true,
        autoClose: true
    }
};