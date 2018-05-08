const networks = [
    'amex',
    'diners',
    'discover',
    'jcb',
    'mastercard',
    'unionpay',
    'visa',
    'mir'
];
const types = ['debit', 'credit', 'prepaid'];
const supportedInstruments = [
    {
        supportedMethods: networks
    },
    {
        supportedMethods: ['basic-card'],
        data: { supportedNetworks: networks, supportedTypes: types }
    }
];

const details = {
    total: {
        label: 'Donation',
        amount: { currency: 'USD', value: '55.00' }
    },
    displayItems: [
        {
            label: 'Original donation amount',
            amount: { currency: 'USD', value: '65.00' }
        },
        {
            label: 'Friends and family discount',
            amount: { currency: 'USD', value: '-10.00' }
        }
    ]
};

export const payment = () => new PaymentRequest(supportedInstruments, details); // eslint-disable-line no-undef

export const guestEligibilityCheck = ({ token, transactionCountry = 'US' }) => {
    const params = {
        operation: 'GuestFlowCheck',
        query: `query GuestFlowCheck { checkoutSession( token: "${
            token
        }" ) { flags { isHostedFieldsAllowed isGuestEligible }}}`,
        variables: null
    };

    return fetch('http://localhost.paypal.com:8443/graphql', // eslint-disable-line no-undef
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then(res => {
            return res.json();
        });
};
