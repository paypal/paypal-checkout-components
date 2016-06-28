
export let props = {

    token: {
        type: 'string',
        required: false
    },

    getToken: {
        type: 'function',
        required: false,
        denodeify: true
    },

    onPaymentAuthorize: {
        type: 'function',
        required: false
    },

    onPaymentComplete: {
        type: 'function',
        required: false
    }
};