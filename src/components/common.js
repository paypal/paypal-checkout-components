
import { config } from '../config';

function all(...collection) {
    return collection.filter(Boolean).length === collection.length;
}

function none(...collection) {
    return collection.filter(Boolean).length === 0;
}

function one(...collection) {
    return collection.filter(Boolean).length === 1;
}

function allOrNone(...collection) {
    return all(...collection) || none(...collection);
}

export function validateProps(props) {

    if (props.env && !config.paypalUrls[props.env]) {
        throw new Error(`Invalid env: ${props.env}`);
    }

    let env = props.env || config.env;

    let isPayment  = props.paymentID || props.paymentToken || props.paymentDetails;
    let isBilling  = props.billingToken || props.billingDetails;
    let isStandard = props.buttonID;

    let enabled = [ isPayment, isBilling, isStandard ].filter(Boolean);

    if (!one(isPayment, isBilling, isStandard)) {
        throw new Error(`Must specify one type of transaction: paymentToken, billingToken, or buttonID`);
    }

    if (isPayment && !one(props.paymentID, props.paymentToken, props.paymentDetails)) {
        throw new Error(`Must specify one type of payment: paymentID, paymentToken, or paymentDetails`);
    }

    if (isBilling && !one(props.billingToken, props.billingDetails)) {
        throw new Error(`Must specify one type of billing: billingToken, or billingDetails`);
    }

    if (props.paymentDetails) {

        if (!props.clientID || !props.clientID[env]) {
            throw new Error(`Must specify clientID for ${env} along with paymentDetails`);
        }

        if (props.commit && props.paymentDetails.intent && props.paymentDetails.intent !== 'sale') {
            throw new Error(`Can not commit when paymentDetails.intent is ${props.paymentDetails.intent}`);
        }
    }

    if (props.billingDetails) {

        if (!props.clientID || !props.clientID[env]) {
            throw new Error(`Must specify clientID for ${env} along with billingDetails`);
        }
    }

    if (!one(props.onPaymentAuthorize, props.onPaymentComplete)) {
        throw new Error(`Must specify one of onPaymentAuthorize or onPaymentComplete callback`);
    }

    if (!allOrNone(props.onPaymentComplete, props.commit)) {
        throw new Error(`Must specify commit with onPaymentComplete callback`);
    }

    if (props.buttonID && !props.commit) {
        throw new Error(`Must specify commit as true in order to use buttonID callback`);
    }
}
