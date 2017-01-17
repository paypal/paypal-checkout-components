import braintree from 'braintree';


let gateway = braintree.connect({
    accessToken: 'access_token$sandbox$3w2ttvwd246548hd$829117ab3d240f371c0b2069492b8453'
});


let api = {
  clientToken: () => {
      
      let response = new Promise((resolve, reject) => {
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
    let response = new Promise((resolve, reject) => {
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

export default api;