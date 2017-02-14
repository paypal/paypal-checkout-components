var request = require('request');
var config = require('../config');

module.exports = {
    createPayment: (accessToken) => {
        var paymentEndpoint = config.urls['sandbox'] + config.apis.payment;

        return new Promise((resolve, reject) => {
           request.post({
               url: paymentEndpoint,
               headers: {
                   'Authorization': `Bearer ${accessToken}`,
                   'Content-Type': 'application/json'
               },
               json: Object.assign({}, config.payment.createReq)

           }, (error, res, body) => {
               
               if (error || res.statusCode >= 400) {
                   error ? reject(error) : reject(res.statusMessage);
               } else {

                   resolve(body && body.id);
               }
           });
        });
    },

    executePayment: (accessToken, payToken, payerId) => {
        var paymentEndpoint = config.urls['sandbox'] + config.apis.payment;
        return new Promise((resolve, reject) => {
            request.post({
                url: `${paymentEndpoint}/${payToken}/execute/`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                json: {
                    payer_id: payerId
                }
            }, (error, res, body) => {

                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else if (body.state === 'approved') {
                    
                    var payerInfo = body.payer.payer_info;
                    var transactionState = body.state;
                    var txnDetails = body.transactions[0].amount;

                    var approval = {
                        payerInfo: payerInfo,
                        state: transactionState,
                        transactionDetails: txnDetails
                    };

                    resolve(approval);
                } else {
                    reject(body);
                }
            });
        });
    },
    
    createBillingAgreement: (accessToken, planId) => {
        var billingEndpoint = config.urls['sandbox'] + config.apis.billing;
        var req = Object.assign({
            plan: {
                id: planId
            }
        }, config.billing.createReq);
        return new Promise((resolve, reject) => {
            request.post({
                url: `${billingEndpoint}`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                json: req
            }, (error, res, body) => {
                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else if (body) {
                    resolve(body);
                } else {
                    reject(body);
                }
            });
        });
    },

    getActiveBillingPlans: (accessToken) => {
        var billingEndpoint = config.urls['sandbox'] + config.apis.billingPlans;
        return new Promise((resolve, reject) => {
            request.get({
                url: `${billingEndpoint}/?status=ACTIVE&total_items=yes`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }, (error, res, body) => {
                body = JSON.parse(body);
                var plans = body && body.plans;
                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else if (plans && plans.length > 0 && plans[0]) {
                    resolve(plans);
                } else {
                    reject(body);
                }
            });

        });
    },

    executeBillingAgreement: (accessToken, payToken) => {
        var billingEndpoint = config.urls['sandbox'] + config.apis.billing;

        return new Promise((resolve, reject) => {
            request.post({
                url: `${billingEndpoint}/${payToken}/agreement-execute/`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }, (error, res, body) => {
                
                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else if (body) {
                    resolve(body);
                } else {
                    reject(body);
                }
            });
        });
    },

    getAccessToken: () => {
        var encodedClientId = new Buffer(`${config.client['sandbox']}:`).toString('base64');
        var authEndpoint = config.urls['sandbox'] + config.apis.auth;
        
        return new Promise((resolve, reject) => {
            request.post({
                url: authEndpoint,
                headers: {
                    'Authorization': `Basic ${encodedClientId}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'grant_type=client_credentials'
            }, (error, res, body) => {
                if (error || res.statusCode >= 400) {
                    error ? reject(error) : reject(res.statusMessage);
                } else {

                    body = body && JSON.parse(body);

                    var accessToken = body && body.access_token;
                    resolve(accessToken);
                }
            });

        });
    }
};
