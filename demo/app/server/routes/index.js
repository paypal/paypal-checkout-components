
import braintree from '../lib/braintree';
import paypal from '../lib/paypal';
import fs from 'fs';
import { config } from '../config';

let routeRegister = function (app) {
    console.info('Registering routes ......');

    app.get('/checkout', (req, res) =>{
        let validPages = config.pages;
        let page = (req.query && req.query.page);
        page = page && validPages.indexOf(page) > -1 ? page : 'basic';
        let content;
        try {
            content = fs.readFileSync(`${req.v4app.staticDir}/templates/index.htm`, 'utf-8');
        } catch (err) {
            res.status(500).send('Internal error');
        }

        res.writeHead(200);
        res.write(content);
        res.end();
    });
    
    app.get('/generate-client-token', (req, res) => {
        return braintree.clientToken()
            .then(response => {
               res.send(response);
            }, err => {
                res.status(500).send('Internal Service Error, ' + err);
            });
    });

    app.post('/payment', (req, res) => {
        return braintree.pay(req.body)
            .then(response => {
                res.send(response)
            }, err => {
                res.status(500).send('Could not complete payment, ' + err);
            });
    });
    
    app.post('/create-payment', (req, res) => {
       return paypal.getAccessToken()
           .then(paypal.createPayment)
           .then(response => {
               res.send({payToken: response});
           }, err => {
               let error = err || err.message;
               console.error(err);
               res.status(500).send('Internal Service Error, ' + error);
           });
    });

    app.post('/execute-payment', (req, res) => {

        let { payToken, payerId } = req.body;

        if (payToken && payerId) {
            return paypal.getAccessToken()
                .then(accessToken => {
                    return paypal.executePayment(accessToken, payToken, payerId);
                })
                .then(response => {
                    res.send(response);
                }, err => {
                    let error = err || err.message;
                    res.status(500).send('Could not complete payment, ' + error);
                });
        } else {
            res.status(500).send('Bad request, need both payToken and payerId');
        }
    });
    
    app.post('/confirmation', (req, res) => {
        let details = req.body;

        let content;

        try {
            content = fs.readFileSync(`${req.v4app.staticDir}/html/thankyou.html`, 'utf-8');
        } catch (err) {
            res.status(500).send('Internal error');
        }

        let shipping = details && details.shipping_address;

        content = content.replace('${name}', details.first_name);
        content = content.replace('${recipient}', shipping.recipient_name);
        content = content.replace('${address}', shipping.line1);
        content = content.replace('${city}', shipping.city);
        content = content.replace('${state}', shipping.state);
        content = content.replace('${zip}', shipping.postal_code);
        content = content.replace('${country}', shipping.country_code);

        res.send({html: content});

    });
    
    app.post('/create-agreement', (req, res) => {
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
                                        let url = response.links[0].href;
                                        let params = parseQuery(url);

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

    app.post('/execute-agreement', (req, res) => {
        let payToken = req.body.payToken;

        if (payToken) {
            return paypal.getAccessToken()
                .then(accessToken => {
                    return paypal.executeBillingAgreement(accessToken, payToken);
                })
                .then(response => {
                    res.send(response);
                }, err => {
                    let error = err || err.message;
                    res.status(500).send('Could not complete payment, ' + error);
                });

        }
    });


    app.get('*', (req, res) => {
        console.info('UNKNOWN ROUTE....');
        res.status(404);
        res.send('Resource Not Found');
    });

    console.info('Registering Routes is complete!');
};

export default routeRegister;
