/* @flow */
import { FUNDING } from '@paypal/sdk-constants';

import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT } from '../../src/constants';

const SUPPORTED_FUNDING_SOURCES : $ReadOnlyArray<$Values<typeof FUNDING>> = [
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
    FUNDING.ZIMPLER,
    FUNDING.WECHATPAY,
    FUNDING.PAYU,
    FUNDING.VERKKOPANKKI,
    FUNDING.TRUSTLY,
    FUNDING.OXXO,
    FUNDING.BOLETO,
    FUNDING.MAXIMA,
    FUNDING.CARD
];

const RESPONSIVE_WIDTHS = [ 144, 222, 465, 670 ];

type ButtonConfig = {|
    only? : boolean,
    diffThreshold? : number,
    filename? : string,
    userAgent? : string,
    container? : {|
        width : number
    |},
    fundingEligibility? : Object,
    wallet? : Object,
    rememberedFunding? : $ReadOnlyArray<string>,
    button? : {|
        locale? : string,
        fundingSource? : string,
        style? : {|
            color? : string,
            size? : string,
            shape? : string,
            label? : string,
            period? : number,
            layout? : string,
            height? : number,
            tagline? : boolean
        |},
        content? : {| [string] : string |}
    |}
|};

export const buttonConfigs : Array<ButtonConfig> = [];

buttonConfigs.push({
    // $FlowFixMe
    button: {}
});

export const CHROME_USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.117 Safari/537.36';
export const IPHONE6_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1';

for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
    const userAgent = (fundingSource === FUNDING.VENMO)
        ? IPHONE6_USER_AGENT
        : CHROME_USER_AGENT;

    buttonConfigs.push({
        userAgent,
        button: {
            fundingSource
        },
        fundingEligibility: {
            [ fundingSource ]: {
                eligible: true,
                products: {
                    payIn4: {
                        eligible: true
                    }
                }
            }
        }
    });
}

for (const label of [ BUTTON_LABEL.PAY, BUTTON_LABEL.BUYNOW, BUTTON_LABEL.CHECKOUT, BUTTON_LABEL.SUBSCRIBE ]) {
    buttonConfigs.push({
        button: {
            style: {
                label
            }
        }
    });
}

for (const fundingSource of SUPPORTED_FUNDING_SOURCES) {
    buttonConfigs.push({
        fundingEligibility: {
            paypal: {
                eligible: true
            },
            [ fundingSource ]: {
                eligible: true,
                products: {
                    payIn4: {
                        eligible: true
                    }
                },
                vendors:  fundingSource === FUNDING.CARD
                    ? {
                        visa: {
                            eligible: true
                        },
                        amex: {
                            eligible: true
                        },
                        mastercard: {
                            eligible: true
                        }
                    }
                    : null
            }
        },
        rememberedFunding: fundingSource === FUNDING.VENMO
            ? [ fundingSource ]
            : [],
        // $FlowFixMe
        button:            {}
    });
}

for (const width of RESPONSIVE_WIDTHS) {
    buttonConfigs.push({
        container: {
            width
        },
        // $FlowFixMe
        button: {}
    });
}

for (const color of [ BUTTON_COLOR.GOLD, BUTTON_COLOR.BLUE, BUTTON_COLOR.SILVER, BUTTON_COLOR.BLACK, BUTTON_COLOR.WHITE ]) {
    buttonConfigs.push({
        button: {
            style: {
                color
            }
        }
    });
}

for (const shape of [ BUTTON_SHAPE.RECT, BUTTON_SHAPE.PILL ]) {
    buttonConfigs.push({
        button: {
            style: {
                shape
            }
        }
    });

    buttonConfigs.push({
        button: {
            style: {
                shape,
                height: 45
            }
        }
    });
}

for (const layout of [ BUTTON_LAYOUT.VERTICAL, BUTTON_LAYOUT.HORIZONTAL ]) {
    buttonConfigs.push({
        button: {
            style: {
                layout
            }
        }
    });
}

buttonConfigs.push({
    button: {
        style: {
            layout:  'horizontal',
            tagline: false
        }
    }
});

buttonConfigs.push({
    button: {
        style: {
            layout:  'horizontal'
        }
    },
    container: {
        width: 300
    },
    userAgent:          IPHONE6_USER_AGENT,
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        venmo: {
            eligible: true
        }
    }
});

buttonConfigs.push({
    button: {
        style: {
            layout:  'horizontal'
        }
    },
    container: {
        width: 300
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        credit: {
            eligible: true
        }
    }
});

buttonConfigs.push({
    button: {
        style: {
            layout:  'horizontal'
        }
    },
    container: {
        width: 300
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        paylater: {
            eligible: true,
            products: {
                payIn4: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    button: {
        style: {
            layout:  'horizontal'
        }
    },
    container: {
        width: 300
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        itau: {
            eligible: true
        }
    }
});

buttonConfigs.push({
    container: {
        width: 340
    },
    button: {
        style: {
            height: 44
        }
    }
});

buttonConfigs.push({
    container: {
        width: 550
    },
    button: {
        style: {
            height: 55
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    button: {
        fundingSource: 'paypal'
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    label:    'foo@bar.com',
                    oneClick: true,
                    tokenID:  '12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    button: {
        fundingSource: 'card'
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    label:    'foo@bar.com',
                    oneClick: true,
                    tokenID:  '12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    label:    'foo@bar.com',
                    oneClick: true,
                    tokenID:  '12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    button: {
        fundingSource: 'paypal'
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    type:         'card',
                    label:        '••1234',
                    oneClick:     true,
                    instrumentID: 'abc12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    button: {
        fundingSource: 'card'
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    type:         'bank',
                    label:        '••7331',
                    oneClick:     false,
                    instrumentID: 'xyz12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    type:         'credit',
                    label:        'foo@bar.com',
                    oneClick:     false,
                    instrumentID: 'abc12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    type:         'balance',
                    label:        'foo@bar.com',
                    oneClick:     true,
                    instrumentID: 'ttt4345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    wallet: {
        credit: {
            instruments: [
                {
                    type:         'credit',
                    label:        'foo@bar.com',
                    oneClick:     true,
                    instrumentID: 'abc12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        credit: {
            eligible: true
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    wallet: {
        paypal: {
            instruments: [
                {
                    type:         'card',
                    label:        '••1234',
                    oneClick:     true,
                    instrumentID: 'abc12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible: true
                },
                mastercard: {
                    eligible: true
                },
                amex: {
                    eligible: true
                }
            }
        }
    },
    button: {
        style: {
            layout:  'horizontal',
            tagline: false
        }
    }
});

buttonConfigs.push({
    diffThreshold: 1000,
    container:     {
        width: 350
    },
    wallet: {
        credit: {
            instruments: [
                {
                    type:         'credit',
                    label:        'foo@bar.com',
                    oneClick:     true,
                    instrumentID: 'abc12345'
                }
            ]
        },
        card: {
            instruments: [
                {
                    type:    'card',
                    label:   'Visa x-1234',
                    tokenID: 'abc123',
                    vendor:  'visa'
                },
                {
                    type:    'card',
                    label:   'Mastercard x-1234',
                    tokenID: 'xyz123',
                    vendor:  'mastercard'
                }
            ]
        }
    },
    fundingEligibility: {
        paypal: {
            eligible: true
        },
        credit: {
            eligible: true
        }
    },
    button: {
        style: {
            layout:  'horizontal',
            tagline: false
        }
    }
});
