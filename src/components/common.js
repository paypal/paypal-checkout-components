
import { config } from '../config';

export function validateProps(props) {

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    if (props.payment && props.billingAgreement) {
        throw new Error(`Must specify either payment or billingAgreement`);
    }

    if (!props.payment && !props.billingAgreement) {
        throw new Error(`Must specify either payment or billingAgreement`);
    }

    if (props.billingAgreement && props.commit) {
        throw new Error(`Can not commit for billing transactions`);
    }

    if (!props.onAuthorize) {
        throw new Error(`Must specify onAuthorize callback`);
    }
    
    if (props.style && props.style.size) {
        if (config.buttonSizes.indexOf(props.style.size) === -1) {
            throw new Error(`Invalid button size: ${props.style.size}`);
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

export function urlWillRedirectPage(url) {

    if (url.indexOf('#') === -1) {
        return true;
    }

    if (url.startsWith('#')) {
        return false;
    }

    if (url.split('#')[0] === window.location.href.split('#')[0]) {
        return false;
    }

    return true;
}
