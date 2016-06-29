
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
        required: false
    },

    onPaymentComplete: {
        type: 'function',
        required: false
    },

    onCancel: {
        type: 'function',
        required: false
    }
};