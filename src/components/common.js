/* @flow */

import { config } from '../config';

export function validateProps(props : Object, required : boolean = true) {

    if (!required) {
        return;
    }

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    if (!props.payment) {
        throw new Error(`Must specify payment method`);
    }

    if (!props.onAuthorize) {
        throw new Error(`Must specify onAuthorize callback`);
    }
    
    if (props.style && props.style.size) {
        if (config.buttonSizes.indexOf(props.style.size) === -1) {
            throw new Error(`Invalid button size: ${props.style.size}`);
        }
    }

    // Prop Validations for the credit button

    // Tiny size for credit button is not supported
    if (props.style.label && props.style.size) {
        if (props.style.label === 'credit' && props.style.size === 'tiny') {
            throw new Error(`Invalid credit button size: ${props.style.size}`);
        }
    }

    // Custom colors for credit buttons are not supported
    if (props.style.label && props.style.color) {
        if (props.style.label === 'credit' && props.style.color) {
            throw new Error(`Custom colors for credit button are not supported`);
        }
    }

    let env = props.env || config.env;

    if (props.client) {
        let clientID = props.client[env];

        if (!clientID) {
            throw new Error(`Client ID not found for env: ${env}`);
        }

        if (clientID.match(/^(.)\1+$/)) {
            throw new Error(`Invalid client ID: ${clientID}`);
        }
    }
}
