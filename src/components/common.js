
import { config } from '../config';

export function validateProps(props) {

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

    if (props.paymentDetails && (!props.clientID || !props.clientID[config.env])) {
        throw new Error(`Must specify clientID for ${config.env} along with paymentDetails`);
    }

    if (props.billingDetails && (!props.clientID || !props.clientID[config.env])) {
        throw new Error(`Must specify clientID for ${config.env} along with billingDetails`);
    }

    if (!props.onPaymentAuthorize && !props.onPaymentComplete) {
        throw new Error(`Must specify either onPaymentAuthorize or onPaymentComplete callback - neither passed`);
    }

    if (props.onPaymentAuthorize && props.onPaymentComplete) {
        throw new Error(`Must specify either onPaymentAuthorize or onPaymentComplete callback - both passed`);
    }

    /*

    if (props.payNow || props.onPaymentComplete) {
        throw new Error(`Can not use payNow or onPaymentComplete: these features are not currently implemented. Please use onPaymentAuthorize and execute the payment using the REST api`);
    }

    */

    if (props.onPaymentComplete && !props.payNow) {
        throw new Error(`Must specify payNow as true in order to use onPaymentComplete callback`);
    }

    if (props.onPaymentAuthorize && props.payNow) {
        throw new Error(`Can not specify payNow as true along with onPaymentAuthorize callback`);
    }
}
