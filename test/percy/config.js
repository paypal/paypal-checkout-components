import { FUNDING } from "@paypal/sdk-constants";

import {
  BUTTON_LABEL,
  BUTTON_COLOR,
  BUTTON_SHAPE,
  BUTTON_LAYOUT,
} from "../../src/constants";

const SUPPORTED_FUNDING_SOURCES = [
  FUNDING.PAYPAL,
  FUNDING.VENMO,
  FUNDING.ITAU,
  FUNDING.CREDIT,
  FUNDING.PAYLATER,
  FUNDING.IDEAL,
  FUNDING.SEPA,
  FUNDING.BANCONTACT,
  FUNDING.GIROPAY,
  FUNDING.EPS,
  FUNDING.SOFORT,
  FUNDING.MYBANK,
  FUNDING.BLIK,
  FUNDING.P24,
  FUNDING.WECHATPAY,
  FUNDING.PAYU,
  FUNDING.TRUSTLY,
  FUNDING.OXXO,
  FUNDING.BOLETO,
  FUNDING.BOLETOBANCARIO,
  FUNDING.SATISPAY,
  FUNDING.CARD,
];

const RESPONSIVE_WIDTHS = [144, 222, 465, 670];

export const buttonConfigs = [];

buttonConfigs.push({
  button: {},
});

export const CHROME_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36";
export const IPHONE6_USER_AGENT =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1";

for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
  const userAgent =
    fundingSource === FUNDING.VENMO ? IPHONE6_USER_AGENT : CHROME_USER_AGENT;

  buttonConfigs.push({
    userAgent,
    button: {
      fundingSource,
    },
    fundingEligibility: {
      [fundingSource]: {
        eligible: true,
        products: {
          payIn4: {
            eligible: true,
          },
        },
      },
    },
  });
}

for (const label of [
  BUTTON_LABEL.PAY,
  BUTTON_LABEL.BUYNOW,
  BUTTON_LABEL.CHECKOUT,
  BUTTON_LABEL.SUBSCRIBE,
  BUTTON_LABEL.DONATE,
]) {
  buttonConfigs.push({
    button: {
      style: {
        label,
      },
    },
  });
}

for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
  buttonConfigs.push({
    fundingEligibility: {
      paypal: {
        eligible: true,
      },
      [fundingSource]: {
        eligible: true,
        products: {
          payIn4: {
            eligible: true,
          },
        },
        vendors:
          fundingSource === FUNDING.CARD
            ? {
                visa: {
                  eligible: true,
                },
                amex: {
                  eligible: true,
                },
                mastercard: {
                  eligible: true,
                },
              }
            : null,
      },
    },
    rememberedFunding: fundingSource === FUNDING.VENMO ? [fundingSource] : [],
    button: {},
  });
}

for (const width of RESPONSIVE_WIDTHS) {
  buttonConfigs.push({
    container: {
      width,
    },
    button: {},
  });
}

for (const color of [
  BUTTON_COLOR.GOLD,
  BUTTON_COLOR.BLUE,
  BUTTON_COLOR.SILVER,
  BUTTON_COLOR.BLACK,
  BUTTON_COLOR.WHITE,
]) {
  buttonConfigs.push({
    button: {
      style: {
        color,
      },
    },
  });
}

for (const shape of [BUTTON_SHAPE.RECT, BUTTON_SHAPE.PILL]) {
  buttonConfigs.push({
    button: {
      style: {
        shape,
      },
    },
  });

  buttonConfigs.push({
    button: {
      style: {
        shape,
        height: 45,
      },
    },
  });
}

for (const layout of [BUTTON_LAYOUT.VERTICAL, BUTTON_LAYOUT.HORIZONTAL]) {
  buttonConfigs.push({
    button: {
      style: {
        layout,
      },
    },
  });
}

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      tagline: false,
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
    },
  },
  container: {
    width: 300,
  },
  userAgent: IPHONE6_USER_AGENT,
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    venmo: {
      eligible: true,
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
    },
  },
  container: {
    width: 300,
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    credit: {
      eligible: true,
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
    },
  },
  container: {
    width: 300,
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    paylater: {
      eligible: true,
      products: {
        payIn4: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
    },
  },
  container: {
    width: 300,
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    itau: {
      eligible: true,
    },
  },
});

buttonConfigs.push({
  container: {
    width: 340,
  },
  button: {
    style: {
      height: 44,
    },
  },
});

buttonConfigs.push({
  container: {
    width: 550,
  },
  button: {
    style: {
      height: 55,
    },
  },
});

buttonConfigs.push({
  userAgent: IPHONE6_USER_AGENT,
  button: {
    fundingSource: "venmo",
  },
  fundingEligibility: {
    venmo: {
      eligible: true,
    },
  },
  wallet: {
    venmo: {
      instruments: [
        {
          label: "@foo",
        },
      ],
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  button: {
    fundingSource: "paypal",
  },
  wallet: {
    paypal: {
      instruments: [
        {
          label: "foo@bar.com",
          oneClick: true,
          tokenID: "12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  button: {
    fundingSource: "card",
  },
  wallet: {
    paypal: {
      instruments: [
        {
          label: "foo@bar.com",
          oneClick: true,
          tokenID: "12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          label: "foo@bar.com",
          oneClick: true,
          tokenID: "12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  button: {
    fundingSource: "paypal",
  },
  wallet: {
    paypal: {
      instruments: [
        {
          type: "card",
          label: "••1234",
          oneClick: true,
          instrumentID: "abc12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  button: {
    fundingSource: "card",
  },
  wallet: {
    paypal: {
      instruments: [
        {
          type: "bank",
          label: "••7331",
          oneClick: false,
          instrumentID: "xyz12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          type: "credit",
          label: "foo@bar.com",
          oneClick: false,
          instrumentID: "abc12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          type: "balance",
          label: "foo@bar.com",
          oneClick: true,
          instrumentID: "ttt4345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    credit: {
      instruments: [
        {
          type: "credit",
          label: "foo@bar.com",
          oneClick: true,
          instrumentID: "abc12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    credit: {
      eligible: true,
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          type: "card",
          label: "••1234",
          oneClick: true,
          instrumentID: "abc12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
  button: {
    style: {
      layout: "horizontal",
      tagline: false,
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    credit: {
      instruments: [
        {
          type: "credit",
          label: "foo@bar.com",
          oneClick: true,
          instrumentID: "abc12345",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
        {
          type: "card",
          label: "Mastercard x-1234",
          tokenID: "xyz123",
          vendor: "mastercard",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    credit: {
      eligible: true,
    },
  },
  button: {
    style: {
      layout: "horizontal",
      tagline: false,
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
          branded: true,
        },
      ],
    },
  },
  fundingEligibility: {
    card: {
      eligible: true,
    },
  },
  button: {
    fundingSource: "card",
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc-123-456",
          vendor: "visa",
        },
      ],
    },
  },
  fundingEligibility: {
    card: {
      eligible: true,
    },
  },
  button: {
    userIDToken: "1234455",
    fundingSource: "card",
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
      ],
    },
  },
  fundingEligibility: {
    card: {
      eligible: true,
    },
  },
  button: {
    userIDToken: "1234455",
    fundingSource: "card",
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc123",
          vendor: "visa",
        },
      ],
    },
  },
  fundingEligibility: {
    card: {
      eligible: true,
    },
  },
  button: {
    clientAccessToken: "5544321",
    userIDToken: "1234455",
    fundingSource: "card",
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      label: "pay",
    },
  },
  container: {
    width: 330,
  },
  fundingEligibility: {
    [FUNDING.PAYPAL]: {
      eligible: true,
    },
    [FUNDING.PAYLATER]: {
      eligible: true,
      products: {
        paylater: {
          eligible: true,
          variant: "DE",
        },
      },
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      label: "pay",
    },
  },
  container: {
    width: 320,
  },
  fundingEligibility: {
    [FUNDING.PAYPAL]: {
      eligible: true,
    },
    [FUNDING.PAYLATER]: {
      eligible: true,
      products: {
        paylater: {
          eligible: true,
          variant: "DE",
        },
      },
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      label: "pay",
    },
  },
  container: {
    width: 300,
  },
  fundingEligibility: {
    [FUNDING.PAYPAL]: {
      eligible: true,
    },
    [FUNDING.PAYLATER]: {
      eligible: true,
      products: {
        paylater: {
          eligible: true,
          variant: "DE",
        },
      },
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      label: "pay",
    },
  },
  container: {
    width: 290,
  },
  fundingEligibility: {
    [FUNDING.PAYPAL]: {
      eligible: true,
    },
    [FUNDING.PAYLATER]: {
      eligible: true,
      products: {
        paylater: {
          eligible: true,
          variant: "DE",
        },
      },
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      label: "pay",
    },
  },
  container: {
    width: 300,
  },
  fundingEligibility: {
    [FUNDING.PAYPAL]: {
      eligible: true,
    },
    [FUNDING.PAYLATER]: {
      eligible: true,
      products: {
        paylater: {
          eligible: true,
          variant: "IT",
        },
      },
    },
  },
});

buttonConfigs.push({
  button: {
    style: {
      layout: "horizontal",
      label: "pay",
    },
  },
  container: {
    width: 300,
  },
  fundingEligibility: {
    [FUNDING.PAYPAL]: {
      eligible: true,
    },
    [FUNDING.PAYLATER]: {
      eligible: true,
      products: {
        paylater: {
          eligible: true,
          variant: "ES",
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 240,
  },
  button: {
    fundingSource: "paypal",
  },
  wallet: {
    paypal: {
      instruments: [
        {
          label: "foo2@bar2.com",
          oneClick: true,
          tokenID: "123456",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc1234",
          vendor: "visa",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 300,
  },
  button: {
    fundingSource: "paypal",
    style: {
      menuPlacement: "above",
    },
  },
  wallet: {
    paypal: {
      instruments: [
        {
          label: "foo2@bar2.com",
          oneClick: true,
          tokenID: "123456",
        },
      ],
    },
    card: {
      instruments: [
        {
          type: "card",
          label: "Visa x-1234",
          tokenID: "abc1234",
          vendor: "visa",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
    card: {
      eligible: true,
      vendors: {
        visa: {
          eligible: true,
        },
        mastercard: {
          eligible: true,
        },
        amex: {
          eligible: true,
        },
      },
    },
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          accessToken: null,
          instrumentID: "abc12345",
          label: "••1234",
          logoUrl: null,
          oneClick: true,
          planID: null,
          secondaryInstruments: [
            {
              instrumentID: "BALANCEUSD",
              label: "PayPal Balance",
              type: "BALANCE",
            },
          ],
          tokenID: null,
          type: "card",
          vendor: "VISA",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
  },
  button: {
    showPayLabel: false,
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          accessToken: null,
          instrumentID: "abc12345",
          label: "••1234",
          logoUrl: null,
          oneClick: true,
          planID: null,
          secondaryInstruments: [
            {
              instrumentID: "BALANCEUSD",
              label: "PayPal Balance",
              type: "BALANCE",
            },
          ],
          tokenID: null,
          type: "bank",
          vendor: "BANK OF AMERICA",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
  },
  button: {
    showPayLabel: false,
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          accessToken: null,
          instrumentID: "abc12345",
          label: "••1234",
          logoUrl: null,
          oneClick: true,
          planID: null,
          secondaryInstruments: null,
          tokenID: null,
          type: "bank",
          vendor: "BANK OF AMERICA",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
  },
  button: {
    showPayLabel: false,
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          accessToken: null,
          instrumentID: "abc12345",
          label: "••1234",
          logoUrl: null,
          oneClick: true,
          planID: null,
          secondaryInstruments: null,
          tokenID: null,
          type: "card",
          vendor: "VISA",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
  },
  button: {
    showPayLabel: false,
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          accessToken: null,
          instrumentID: "BALANCEUSD",
          label: "BALANCE",
          logoUrl: null,
          oneClick: true,
          planID: null,
          secondaryInstruments: null,
          tokenID: null,
          type: "balance",
          vendor: "BALANCE",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
  },
  button: {
    showPayLabel: false,
  },
});

buttonConfigs.push({
  diffThreshold: 1000,
  container: {
    width: 350,
  },
  wallet: {
    paypal: {
      instruments: [
        {
          accessToken: null,
          instrumentID: "123",
          label: "BALANCE",
          logoUrl: null,
          oneClick: true,
          planID: null,
          secondaryInstruments: null,
          tokenID: null,
          type: "balance",
          vendor: "BALANCE",
        },
      ],
    },
  },
  fundingEligibility: {
    paypal: {
      eligible: true,
    },
  },
  button: {
    customerId: "123",
  },
});
