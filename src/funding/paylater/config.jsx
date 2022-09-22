/* @flow */
/** @jsx node */

import { FundingEligibilityType, getLogger, getLocale, getSessionID} from '@paypal/sdk-client/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { node, Style } from '@krakenjs/jsx-pragmatic/src';
import { PPLogo, LOGO_COLOR } from '@paypal/sdk-logos/src';

import { BUTTON_COLOR, BUTTON_LAYOUT, DEFAULT } from '../../constants';
import { DEFAULT_FUNDING_CONFIG, type FundingSourceConfig } from '../common';
import { Text, Space } from '../../ui/text';

import css from './style.scoped.scss';

const SECOND_BTN_EXP = {
    EXPERIMENTATION_EXPERIENCE: '106065',
    TREATMENT_ID:'127591',
    CONTROL_ID:'127590',
    REASON: 'SECOND BUTTON EXPERIMENT CALLED: Trmt_FEATURE_2ND_BUTTON_PI4',
}

function getLabelText(fundingEligibility : FundingEligibilityType) : ?string {
    const { paylater } = fundingEligibility;

    let labelText;

    if (
        paylater?.products?.paylater?.eligible &&
        paylater?.products?.paylater?.variant === 'DE'
    ) {
        labelText = 'Später Bezahlen';
    }

    if (
        paylater?.products?.payIn3?.eligible &&
        paylater?.products?.payIn3?.variant === 'ES'
    ) {
        labelText = 'Paga en 3 plazos';
    }

    if (
        paylater?.products?.payIn3?.eligible &&
        paylater?.products?.payIn3?.variant === 'IT'
    ) {
        labelText = 'Paga in 3 rate';
    }

    if (paylater?.products?.payIn4?.eligible) {
        labelText = 'Pay in 4';
    }

    if (
        paylater?.products?.payIn4?.eligible &&
        paylater?.products?.payIn4?.variant === 'FR'
    ) {
        labelText = '4X PayPal';
    }

    if(getLocale().includes("US")) {
        const payload = {
            state_name: "elmo_check",
            transition_name: "process_elmo_check",
            experimentation_experience: SECOND_BTN_EXP.EXPERIMENTATION_EXPERIENCE,
            experimentation_treatment: paylater?.products?.payIn4?.reasons.includes(SECOND_BTN_EXP.REASON) ? SECOND_BTN_EXP.TREATMENT_ID : SECOND_BTN_EXP.CONTROL_ID,
            context_id: getSessionID(),
            context_type: "button_session_id"
        }
    
        getLogger().info("Second Button Experiment Received", payload)
    }

    return labelText;
}

export function getPaylaterConfig() : FundingSourceConfig {
    return {
        ...DEFAULT_FUNDING_CONFIG,

        layouts: [
            BUTTON_LAYOUT.HORIZONTAL,
            BUTTON_LAYOUT.VERTICAL
        ],

        eligible: ({ experiment, fundingSource }) => {
            if (
                experiment
                && experiment.disablePaylater
                && !fundingSource  // Exclude standalone buttons
            ) {
                return false;
            }
            return true;
        },

        Label: ({ logo }) => logo,

        Logo: ({ logoColor, nonce, fundingEligibility }) => {
            return (
                <Style css={ css } nonce={ nonce }>
                    <PPLogo logoColor={ logoColor } />
                    <Space />
                    <Text>{ getLabelText(fundingEligibility) || 'Pay Later' }</Text>
                </Style>
            );
        },
    
        colors: [
            BUTTON_COLOR.WHITE,
            BUTTON_COLOR.BLACK,
            BUTTON_COLOR.GOLD,
            BUTTON_COLOR.BLUE,
            BUTTON_COLOR.SILVER
        ],

        secondaryColors: {
            [ DEFAULT ]:             BUTTON_COLOR.WHITE,
            [ BUTTON_COLOR.GOLD ]:   BUTTON_COLOR.GOLD,
            [ BUTTON_COLOR.BLUE ]:   BUTTON_COLOR.BLUE,
            [ BUTTON_COLOR.SILVER ]: BUTTON_COLOR.SILVER,
            [ BUTTON_COLOR.BLACK ]:  BUTTON_COLOR.BLACK,
            [ BUTTON_COLOR.WHITE ]:  BUTTON_COLOR.WHITE
        },

        logoColors: {
            [BUTTON_COLOR.GOLD]:   LOGO_COLOR.BLUE,
            [BUTTON_COLOR.SILVER]: LOGO_COLOR.BLUE,
            [BUTTON_COLOR.BLUE]:   LOGO_COLOR.WHITE,
            [BUTTON_COLOR.BLACK]:  LOGO_COLOR.WHITE,
            [BUTTON_COLOR.WHITE]:  LOGO_COLOR.BLUE
        },
        
        labelText: ({ fundingEligibility }) => {
            return (fundingEligibility && getLabelText(fundingEligibility)) || `${ FUNDING.PAYPAL } ${ FUNDING.PAYLATER }`;
        }
    };
}
