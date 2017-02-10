import request from 'request';
import { config } from '../config';

let api = {
    createPayment: (accessToken) => {
        let paymentEndpoint = config.urls['sandbox'] + config.apis.payment;

        return new Promise((resolve, reject) => {
           request.post({
               url: paymentEndpoint,
               headers: {
                   'Authorization': `Bearer ${accessToken}`,
                   'Content-Type': 'application/json'
               },
               json: { ...config.payment.createReq }

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
        let paymentEndpoint = config.urls['sandbox'] + config.apis.payment;
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
                    
                    let payerInfo = body.payer.payer_info;
                    let transactionState = body.state;
                    let txnDetails = body.transactions[0].amount;

                    let approval = {
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
        let billingEndpoint = config.urls['sandbox'] + config.apis.billing;
        let req = {
            ...config.billing.createReq,
            plan: {
                id: planId
            }
        };
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
        let billingEndpoint = config.urls['sandbox'] + config.apis.billingPlans;
        return new Promise((resolve, reject) => {
            request.get({
                url: `${billingEndpoint}/?status=ACTIVE&total_items=yes`,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }, (error, res, body) => {
                body = JSON.parse(body);
                let plans = body && body.plans;
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
        let billingEndpoint = config.urls['sandbox'] + config.apis.billing;

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
        let encodedClientId = new Buffer(`${config.client['sandbox']}:`).toString('base64');
        let authEndpoint = config.urls['sandbox'] + config.apis.auth;
        
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

                    let accessToken = body && body.access_token;
                    resolve(accessToken);
                }
            });

        });
    }
};

export default api;
