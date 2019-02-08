/* @flow */
/** @jsx node */

import { COUNTRY } from '@paypal/sdk-constants/src';
import { node, Fragment } from 'jsx-pragmatic/src';
import { CreditLogo, LOGO_COLOR, PPLogo, PayPalLogo } from '@paypal/sdk-logos/src';

import { getCheckoutUrl } from '../../config';
import { BUTTON_LABEL, BUTTON_COLOR } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, DEFAULT_LABEL_CONFIG, type FundingSourceConfig } from '../common';

export function getCreditConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,
    
        url: getCheckoutUrl,
    
        defaultLabel: BUTTON_LABEL.CREDIT,
    
        labels: {
            [BUTTON_LABEL.CREDIT]: {
                ...DEFAULT_LABEL_CONFIG,
    
                Label: ({ locale, logoColor }) => {
                    if (locale.country === COUNTRY.DE) {
                        return <CreditLogo logoColor={ logoColor } locale={ locale } />;
                    }
    
                    return (
                        <Fragment>
                            <PPLogo logoColor={ logoColor } /> <PayPalLogo logoColor={ logoColor } /> <CreditLogo logoColor={ logoColor } locale={ locale } />
                        </Fragment>
                    );
                },
    
                colors: [
                    BUTTON_COLOR.DARKBLUE
                ],
    
                logoColors: {
                    [ BUTTON_COLOR.DARKBLUE ]: LOGO_COLOR.WHITE
                },
    
                secondaryColors: {
                    [BUTTON_COLOR.GOLD]:   BUTTON_COLOR.DARKBLUE,
                    [BUTTON_COLOR.BLUE]:   BUTTON_COLOR.DARKBLUE,
                    [BUTTON_COLOR.SILVER]: BUTTON_COLOR.DARKBLUE
                },
    
                defaultColor: BUTTON_COLOR.DARKBLUE
            }
        }
    };
}
