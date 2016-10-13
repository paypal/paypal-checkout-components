
import { config } from '../config';

export function validateProps(props) {

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    /*

    if (props.payment && props.billingAgreement) {
        throw new Error(`Must specify either payment or billingAgreement`);
    }

    if (!props.payment && !props.billingAgreement) {
        throw new Error(`Must specify either payment or billingAgreement`);
    }

    */

    if (props.billingAgreement && props.commit) {
        throw new Error(`Can not commit for billing transactions`);
    }

    /*

    if (!props.onAuthorize) {
        throw new Error(`Must specify onAuthorize callback`);
    }

    */
}
