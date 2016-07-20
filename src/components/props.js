
export let props = {

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
