var braintree = require('braintree');


var gateway = braintree.connect({
    accessToken: 'access_token$sandbox$3w2ttvwd246548hd$829117ab3d240f371c0b2069492b8453'
});


module.exports = {
  clientToken: () => {
      
      var response = new Promise((resolve, reject) => {
         gateway.clientToken.generate({}, (err, res) => {
             if (err || res.success === false) {
                 reject(err);
             }
             
             resolve(res);
         }); 
      });

      return response;
  },

  pay: (transaction) => {
    var response = new Promise((resolve, reject) => {
        gateway.transaction.sale({
            amount: transaction && transaction.amount,
            paymentMethodNonce: transaction.nonce,
            options: {
                submitForSettlement: true
            }
        }, (err, res) => {
            if (err || res.success === false) {
                reject(err);
            }
            
            resolve(res);
        });
    });

      return response;

  }
};
