
import { config } from '../config';

export function validateProps(props) {

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    let env = props.env || config.env;

    let isCheckout = props.paymentToken || props.paymentDetails;
    let isBilling  = props.billingToken || props.billingDetails;

    if (isCheckout && isBilling) {
        throw new Error(`Can not provide both payment and billing props`);
    }

    if (!isCheckout && !isBilling && !props.submitForm) {
        throw new Error(`Must provide either payment or billing props`);
    }

    if (props.submitForm && (isCheckout || isBilling)) {
        throw new Error(`Can not provide payment or billing token or details when using submitForm`);
    }

    if (props.paymentToken && props.paymentDetails) {
        throw new Error(`Can not provide both paymentToken and paymentDetails`);
    }

    if (props.billingToken && props.billingDetails) {
        throw new Error(`Can not provide both billingToken and billingDetails`);
    }

    if (props.paymentDetails && (!props.clientID || !props.clientID[env])) {
        throw new Error(`Must specify clientID for ${env} along with paymentDetails`);
    }

    if (props.billingDetails && (!props.clientID || !props.clientID[env])) {
        throw new Error(`Must specify clientID for ${env} along with billingDetails`);
    }

    if (!props.onPaymentAuthorize && !props.onPaymentComplete) {
        throw new Error(`Must specify either onPaymentAuthorize or onPaymentComplete callback - neither passed`);
    }

    if (props.onPaymentAuthorize && props.onPaymentComplete) {
        throw new Error(`Must specify either onPaymentAuthorize or onPaymentComplete callback - both passed`);
    }

    /*

    if (props.autoExecute || props.onPaymentComplete) {
        throw new Error(`Can not use autoExecute or onPaymentComplete: these features are not currently implemented. Please use onPaymentAuthorize and execute the payment using the REST api`);
    }

    */

    if (props.onPaymentComplete && !props.autoExecute) {
        throw new Error(`Must specify autoExecute as true in order to use onPaymentComplete callback`);
    }

    if (props.onPaymentAuthorize && props.autoExecute) {
        throw new Error(`Can not specify autoExecute as true along with onPaymentAuthorize callback`);
    }
}
