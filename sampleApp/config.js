export let config = {
    client : {
        sandbox :   '', // for you to fill out with your client_id
        stage:      'alc_client1'
    },

    urls : {
        sandbox: 'https://www.sandbox.paypal.com',
        stage: 'https://www.msmaster.qa.paypal.com'
    },

    apis: {
        auth: '/v1/oauth2/token',
        payment: '/v1/payments/payment',
        billing: '/v1/payments/billing-agreements',
        billingPlans: '/v1/payments/billing-plans'
    },

    pages: [
        'basic',
        'braintree',
        'buttonStyles',
        'confirmation',
        'hybrid',
        'mark',
        'serverside',
        'thankyou',
        'agreements'
    ],

    jwtCsrf : {
        // we exclude our static resources
        excludedPaths: [
            'js/basic.js',
            'js/braintree.js',
            'js/buttonStyles.js',
            'js/confirmation.js',
            'js/hybrid.js',
            'js/jwt-csrf.min.js',
            'js/mark.js',
            'js/serverside.js',
            'img/watch.jpeg',
            'img/accepted_cards.png',
            'img/payWithPaypal.jpg',
            'css/main.css'
        ],
        secret: 'secretSanta' // for you to fill out
    },

    payment: {
        createReq: {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "cancel_url": "https://www.sandbox.paypal.com",
                "return_url": "https://www.sandbox.paypal.com"
            },
            "transactions": [
                {
                    "amount": {
                        "currency": "USD",
                        "total": "1.00"
                    }
                }
            ]
        }
    },

    billing: {
        createReq: {
            "name": "T-Shirt of the Month Club Agreement",
            "description": "Agreement for T-Shirt of the Month Club Plan",
            "start_date": "2017-12-19T00:37:04Z",
            "plan": {},
            "payer": {
                "payment_method": "paypal"
            }
        },

        createPlan: {
            "name": "Sample Plan",
            "description": "Plan with regular and trial",
            "type": "fixed",
            "payment_definitions": [
                {
                    "name": "Regular Payment Definition",
                    "type": "REGULAR",
                    "frequency": "MONTH",
                    "frequency_interval": "2",
                    "amount": {
                        "value": "100",
                        "currency": "USD"
                    },
                    "cycles": "12",
                    "charge_models": [
                        {
                            "type": "SHIPPING",
                            "amount": {
                                "value": "10",
                                "currency": "USD"
                            }
                        },
                        {
                            "type": "TAX",
                            "amount": {
                                "value": "12",
                                "currency": "USD"
                            }
                        }
                    ]
                },
                {
                    "name": "Trial Payment Definition",
                    "type": "trial",
                    "frequency": "week",
                    "frequency_interval": "5",
                    "amount": {
                        "value": "9.19",
                        "currency": "USD"
                    },
                    "cycles": "2",
                    "charge_models": [
                        {
                            "type": "SHIPPING",
                            "amount": {
                                "value": "1",
                                "currency": "USD"
                            }
                        },
                        {
                            "type": "TAX",
                            "amount": {
                                "value": "2",
                                "currency": "USD"
                            }
                        }
                    ]
                }
            ],
            "merchant_preferences": {
                "setup_fee": {
                    "value": "1",
                    "currency": "USD"
                },
                "return_url": "https://www.sandbox.paypal.com",
                "cancel_url": "https://www.sandbox.paypal.com",
                "auto_bill_amount": "YES",
                "initial_fail_amount_action": "CONTINUE",
                "max_fail_attempts": "0"
            }
        }
    }

};
