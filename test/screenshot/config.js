/* @flow */

import { getButtonConfig } from '../../src/components/button/templates/component/config';
import { BUTTON_LABEL, BUTTON_SIZE } from '../../src/components/button/constants';

/*

const LOCALES = [
    'en_US', 'en_GB', 'fr_FR', 'de_DE', 'zh_C2', 'es_MX', 'es_ES', 'pt_BR'
];

*/

const RESPONSIVE_WIDTHS = [ 92, 144, 212, /* 345, */ 460, 670 ];

export let buttonConfigs = [];

buttonConfigs.push({
    button: {}
});

for (let label of Object.keys(BUTTON_LABEL)) {
    label = BUTTON_LABEL[label];

    if (getButtonConfig(label, 'allowPrimary')) {
        buttonConfigs.push({
            button: {
                style: {
                    label
                }
            }
        });

        for (let size of getButtonConfig(label, 'sizes')) {

            if (size === BUTTON_SIZE.RESPONSIVE) {
                for (let width of RESPONSIVE_WIDTHS) {
                    buttonConfigs.push({
                        container: {
                            width
                        },
                        button: {
                            style: {
                                label,
                                size
                            }
                        }
                    });
                }
            } else {
                buttonConfigs.push({
                    button: {
                        style: {
                            label,
                            size
                        }
                    }
                });
            }
        }

        for (let color of getButtonConfig(label, 'colors')) {
            buttonConfigs.push({
                button: {
                    style: {
                        label,
                        color
                    }
                }
            });
        }

        for (let shape of getButtonConfig(label, 'shapes')) {
            buttonConfigs.push({
                button: {
                    style: {
                        label,
                        shape
                    }
                }
            });
        }

        /*

        for (let locale of LOCALES) {
            buttonConfigs.push({
                button: {
                    style: {
                        label,
                        locale
                    }
                }
            });
        }

        */

        if (getButtonConfig(label, 'allowFundingIcons')) {
            buttonConfigs.push({
                button: {
                    style: {
                        label,
                        fundingicons: true
                    }
                }
            });
        }

        if (getButtonConfig(label, 'allowUnbranded')) {
            buttonConfigs.push({
                button: {
                    style: {
                        label,
                        branding: true
                    }
                }
            });
        }

        buttonConfigs.push({
            button: {
                style: {
                    label,
                    tagline: false
                }
            }
        });
    }
}
