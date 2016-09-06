
import { config } from '../config';

export function validateProps(props) {

    let isCheckout = props.paymentToken || props.paymentDetails;
    let isBilling  = props.billingToken || props.billingDetails;

    if (isCheckout && isBilling) {
        throw new Error(`Can not provide both payment and billing props`);
    }

    if (!isCheckout && !isBilling) {
        throw new Error(`Must provide either payment or billing props`);
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

    if (props.onPaymentComplete && !props.payNow) {
        throw new Error(`Must specify payNow in order to use onPaymentComplete callback`);
    }

    if (props.onPaymentAuthorize && props.payNow) {
        throw new Error(`Can not specify payNow along with onPaymentAuthorize callback`);
    }
}
