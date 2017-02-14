
var fs = require('fs');
var path = require('path');

var braintree = require('./lib/braintree');
var paypal = require('./lib/paypal');
var config = require('./config');

var index = require('./page/index');

module.exports = function (app) {

    app.get('/', (req, res) =>{

        res.header('Content-Security-Policy', `default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https://*.paypal.com https://*.paypalobjects.com`);

        res.send(index({
            csrf: res.locals._csrf
        }));
    });

    app.get('/api/braintree/client-token/', (req, res) => {
        return braintree.clientToken().then(response => {
           res.send(response);
        }, err => {
            res.status(500).send('Internal Service Error:\n\n' + err.stack);
        });
    });

    app.post('/api/braintree/pay/', (req, res) => {
        return braintree.pay(req.body).then(response => {
            res.send(response)
        }, err => {
            res.status(500).send('Could not complete payment, ' + err);
        });
    });

    app.post('/api/paypal/payment/create/', (req, res) => {
       return paypal.getAccessToken()
           .then(paypal.createPayment)
           .then(response => {
               res.send({payToken: response});
           }, err => {
               var error = err || err.message;
               console.error(err);
               res.status(500).send('Internal Service Error, ' + error);
           });
    });

    app.post('/api/paypal/payment/execute/', (req, res) => {

        var payToken = req.body.payToken;
        var payerId = req.body.payerId;

        if (payToken && payerId) {
            return paypal.getAccessToken()
                .then(accessToken => {
                    return paypal.executePayment(accessToken, payToken, payerId);
                })
                .then(response => {
                    res.send(response);
                }, err => {
                    var error = err || err.message;
                    res.status(500).send('Could not complete payment, ' + error);
                });
        } else {
            res.status(500).send('Bad request, need both payToken and payerId');
        }
    });

    app.post('/api/paypal/agreement/create/', (req, res) => {
        function parseQuery(qstr) {
            var query = {};
            var a = qstr.substr(1).split('&');
            for (var i = 0; i < a.length; i++) {
                var b = a[i].split('=');
                query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
            }
            return query;
        }

        return paypal.getAccessToken()
            .then((accessToken) => {

                return paypal.getActiveBillingPlans(accessToken)
                    .then((plans) => {
                        if (plans[0]) {
                            return paypal.createBillingAgreement(accessToken, plans[0].id)
                                .then((response) => {
                                    if (response.links[0].rel === 'approval_url') {
                                        var url = response.links[0].href;
                                        var params = parseQuery(url);

                                        res.send({payToken: params['token']});
                                    }
                                });
                        } else {
                            // please see https://developer.paypal.com/docs/integration/direct/billing-plans/
                            res.status(500).send('NO ACTIVE BILLING PLANS');
                        }
                    })
            })
    });

    app.post('/api/paypal/agreement/execute/', (req, res) => {
        var payToken = req.body.payToken;

        if (payToken) {
            return paypal.getAccessToken()
                .then(accessToken => {
                    return paypal.executeBillingAgreement(accessToken, payToken);
                })
                .then(response => {
                    res.send(response);
                }, err => {
                    var error = err || err.message;
                    res.status(500).send('Could not complete payment, ' + error);
                });

        }
    });

    app.get('*', (req, res) => {
        res.status(404);
        res.send(`${req.originalUrl} not found.`);
    });
};
