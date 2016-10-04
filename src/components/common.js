
import { config } from '../config';

export function validateProps(props) {

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    let env = props.env || config.env;

    let isPayment  = props.paymentToken || props.paymentDetails;
    let isBilling  = props.billingToken || props.billingDetails;
    let isStandard = props.buttonID;

    let enabled = [ isPayment, isBilling, isStandard ].filter(Boolean);

    if (enabled.length > 1) {
        throw new Error(`Must specify only one type of payment: paymentToken, billingToken, or buttonID`);
    } else if (enabled.length === 0) {
        throw new Error(`Must specify type of payment: paymentToken, billingToken, or buttonID`);
    }

    if (props.paymentDetails) {

        if (!props.clientID || !props.clientID[env]) {
            throw new Error(`Must specify clientID for ${env} along with paymentDetails`);
        }

        if (props.autoExecute && props.paymentDetails.intent && props.paymentDetails.intent !== 'sale') {
            throw new Error(`Can not autoExecute when paymentDetails.intent is ${props.paymentDetails.intent}`);
        }
    }

    if (props.billingDetails) {

        if (!props.clientID || !props.clientID[env]) {
            throw new Error(`Must specify clientID for ${env} along with billingDetails`);
        }
    }

    if (!props.onPaymentAuthorize && !props.onPaymentComplete) {
        throw new Error(`Must specify either onPaymentAuthorize or onPaymentComplete callback - neither passed`);
    }

    if (props.onPaymentAuthorize && props.onPaymentComplete) {
        throw new Error(`Must specify either onPaymentAuthorize or onPaymentComplete callback - both passed`);
    }

    if (props.onPaymentComplete && !props.autoExecute) {
        throw new Error(`Must specify autoExecute as true in order to use onPaymentComplete callback`);
    }

    if (props.onPaymentAuthorize && props.autoExecute) {
        throw new Error(`Can not specify autoExecute as true along with onPaymentAuthorize callback`);
    }

    if (props.buttonID && !props.autoExecute) {
        throw new Error(`Must specify autoExecute as true in order to use buttonID callback`);
    }
}
