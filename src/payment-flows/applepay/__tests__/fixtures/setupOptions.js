/* @flow */

// eslint-disable-next-line import/no-default-export 
export default {
  props: {
    uid: "zoid-paypal-buttons-uid_466f6975c6_mtk6mdm6nte",
    env: "local",
    vault: false,
    commit: true,
    locale: {
      country: "US",
      lang: "en",
    },
    sessionID: "uid_bfd0b4c0d6_mtk6mdm6nti",
    clientID:
      "ATq4kPMhjTp6qrUQybY0SSz6Es1sO0YDF9f67rt2e-dZx36hHGbV1U9Ek3QRwcHcyyBlHXysRr-uXg18",
    partnerAttributionID: "APPLEPAY",
    sdkCorrelationID: "6fe146b857410",
    merchantDomain: "https://stage-applepay-paypal-js-sdk.herokuapp.com",
    platform: "desktop",
    currency: "USD",
    intent: "capture",
    merchantRequestedPopupsDisabled: false,
    fundingSource: "applepay",
    // $FlowFixMe
    enableFunding: [],
    // $FlowFixMe
    disableFunding: [],
    // $FlowFixMe
    disableCard: [],
    enableThreeDomainSecure: false,
    enableNativeCheckout: false,
    experience: "",
    stageHost: "localhost.paypal.com:8443",
    apiStageHost: "msmaster.qa.paypal.com",
    standaloneFundingSource: "applepay",
    branded: true,
    stickinessID: "uid_da1ad28a5d_mji6ntg6mtq",
    allowBillingPayments: true,
    merchantID: ["8THX48SJBD4LU"],
    style: {
      label: "pay",
      layout: "horizontal",
      color: "black",
      shape: "rect",
      tagline: false,
      menuPlacement: "below",
    },
    buttonSessionID: "uid_83e2df4351_mtk6mdm6nti",
    inlinexo: false,
  },
  config: {
    sdkVersion: "5.0.317",
    cspNonce: "",
    firebase: {
      authDomain: "testmessaging-63f5d.firebaseapp.com",
      databaseURL: "https://testmessaging-63f5d.firebaseio.com",
      projectId: "testmessaging-63f5d",
      storageBucket: "testmessaging-63f5d.appspot.com",
      messagingSenderId: "330437320943",
      appId: "1:330437320943:web:c7a8b59c274429d1707b1a",
      measurementId: "G-6ZYN3ND8X2",
      apiKey: "AIzaSyAeyii31bJYddKqSHrkyiRKU3EHCvh-owM",
    },
  },
  serviceData: {
    merchantID: ["8THX48SJBD4LU"],
    buyerCountry: "US",
    fundingEligibility: {
      paypal: {
        eligible: true,
        vaultable: false,
      },
      venmo: {
        eligible: true,
      },
      applepay: {
        eligible: true,
      },
      itau: {
        eligible: false,
      },
      credit: {
        eligible: true,
      },
      paylater: {
        eligible: false,
        products: {
          payIn3: {
            eligible: false,
            variant: null,
          },
          payIn4: {
            eligible: false,
            variant: null,
          },
          paylater: {
            eligible: false,
            variant: null,
          },
        },
      },
      card: {
        eligible: true,
        branded: false,
        installments: false,
        vendors: {
          visa: {
            eligible: true,
            vaultable: true,
          },
          mastercard: {
            eligible: true,
            vaultable: true,
          },
          amex: {
            eligible: true,
            vaultable: true,
          },
          discover: {
            eligible: true,
            vaultable: true,
          },
          hiper: {
            eligible: false,
            vaultable: false,
          },
          elo: {
            eligible: false,
            vaultable: true,
          },
          jcb: {
            eligible: false,
            vaultable: true,
          },
          // $FlowFixMe
          cup: {},
        },
      },
      ideal: {
        eligible: false,
      },
      sepa: {
        eligible: false,
      },
      bancontact: {
        eligible: false,
      },
      giropay: {
        eligible: false,
      },
      sofort: {
        eligible: false,
      },
      eps: {
        eligible: false,
      },
      mybank: {
        eligible: false,
      },
      p24: {
        eligible: false,
      },
      // $FlowFixMe
      verkkopankki: {},
      payu: {
        eligible: false,
      },
      blik: {
        eligible: false,
      },
      trustly: {
        eligible: false,
      },
      zimpler: {
        eligible: false,
      },
      maxima: {
        eligible: false,
      },
      oxxo: {
        eligible: false,
      },
      boleto: {
        eligible: false,
      },
      boletobancario: {
        eligible: false,
      },
      wechatpay: {
        eligible: false,
      },
      mercadopago: {
        eligible: false,
      },
      multibanco: {
        eligible: false,
      },
    },
    wallet: {
      paypal: {
        // $FlowFixMe
        instruments: [],
      },
      credit: {
        // $FlowFixMes
        instruments: [],
      },
      card: {
        // $FlowFixMe
        instruments: [],
      },
      venmo: {
        // $FlowFixMe
        instruments: [],
      },
    },
    sdkMeta:
      "eyJ1cmwiOiJodHRwczovL2xvY2FsaG9zdC5wYXlwYWwuY29tOjg0NDMvc2RrL2pzP2NsaWVudC1pZD1BVHE0a1BNaGpUcDZxclVReWJZMFNTejZFczFzTzBZREY5ZjY3cnQyZS1kWngzNmhIR2JWMVU5RWszUVJ3Y0hjeXlCbEhYeXNSci11WGcxOCZtZXJjaGFudC1pZD04VEhYNDhTSkJENExVJmN1cnJlbmN5PVVTRCZkZWJ1Zz10cnVlJmNvbXBvbmVudHM9YnV0dG9ucyIsImF0dHJzIjp7ImRhdGEtcGFydG5lci1hdHRyaWJ1dGlvbi1pZCI6IkFQUExFUEFZIiwiZGF0YS11aWQiOiJ1aWRfZnRmdHdjZGxubnpydWtjdWNvcGh1Y2x4dGh3a256In19",
    content: {
      instantlyPayWith: "Instantly pay with",
      poweredBy: "Powered by {paypal}",
      chooseCardOrShipping: "Choose card or shipping address",
      useDifferentAccount: "Pay with a different account",
      deleteVaultedAccount: "Unlink your saved account",
      deleteVaultedCard: "Unlink your saved card",
      chooseCard: "Pay with a different payment method",
      balance: "Balance",
      payNow: "Pay Now",
      payWithDifferentMethod: "Pay with a different funding source",
      payWithDifferentAccount: "Pay with a different account",
      payWith: "Pay with",
      credit: "Credit",
      payLater: "Pay Later",
      flex: "Flex",
      payWithDebitOrCreditCard: "Debit or Credit Card",
    },
    facilitatorAccessToken:
      "A21_A.AAdq6j6PrHDRext5z4j-6ZIL-4nLrNb0wzMGjuf7gMyRu01yLbLb1PdKwr3IC6jUEBhNZhyltU_PXqMRD5u8pNFomhwEiA",
    eligibility: {
      cardForm: true,
    },
    cookies: "",
    personalization: null,
  },
  // $FlowFixMe
  components: {},
};
