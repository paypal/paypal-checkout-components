/* @flow */

import { FUNDING } from '@paypal/sdk-constants';

import { BUTTON_LABEL, BUTTON_COLOR, BUTTON_SHAPE, BUTTON_LAYOUT } from '../../src/constants';

const RESPONSIVE_WIDTHS = [ 144, 222, 465, 670 ];

type ButtonConfig = {|
    only? : boolean,
    filename? : string,
    userAgent? : string,
    container? : {
        width : number
    },
    fundingEligibility? : Object,
    rememberedFunding? : $ReadOnlyArray<string>,
    button? : {
        locale? : string,
        style? : {
            color? : string,
            size? : string,
            shape? : string,
            label? : string,
            period? : number
        }
    }
|};

export const buttonConfigs : Array<ButtonConfig> = [];

buttonConfigs.push({
    button: {}
});

for (const label of [ BUTTON_LABEL.PAY, BUTTON_LABEL.BUYNOW, BUTTON_LABEL.CHECKOUT ]) {
    buttonConfigs.push({
        button: {
            style: {
                label
            }
        }
    });
}

for (const fundingSource of Object.values(FUNDING)) {
    buttonConfigs.push({
        fundingEligibility: {
            paypal: {
                eligible: true
            },
            // $FlowFixMe
            [ fundingSource ]: {
                eligible: true,
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
            // $FlowFixMe
            ? [ fundingSource ]
            : [],
        button:            {}
    });
}

for (const width of RESPONSIVE_WIDTHS) {
    buttonConfigs.push({
        container: {
            width
        },
        button: {
            style: {

            }
        }
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
    fundingEligibility: {
        paypal: {
            eligible:           true,
            vaultedInstruments: [
                {
                    id:    'xyz',
                    label: {
                        description: 'foo@bar.com'
                    }
                }
            ]
        },
        card: {
            eligible: true,
            vendors:  {
                visa: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    'abc',
                            label: {
                                description: 'Visa x-1234'
                            }
                        }
                    ]
                },
                mastercard: {
                    eligible:           true,
                    vaultedInstruments: [
                        {
                            id:    'abc',
                            label: {
                                description: 'Mastercard x-1234'
                            }
                        }
                    ]
                },
                amex: {
                    eligible: true
                }
            }
        }
    }
});
