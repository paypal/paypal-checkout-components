/* @flow */
/** @jsx node */

/*
    Alternative jsx-pragmatic/src/component/style.jsx 
    that forces the use of a nonce prop
*/

import { Fragment, node, type ChildType, type NullableChildrenType } from 'jsx-pragmatic/src/node';

type StyleProps = {|
    css : string | {| _getCss : () => string |},
    nonce? : ?string,
    children? : ?NullableChildrenType
|};

export function NoncedStyleElement({ css, nonce, children } : StyleProps) : ChildType {
    return (
        <Fragment>
            <style innerHTML={ typeof css === 'string' ? css : css._getCss() } nonce={ nonce } />
            { children }
        </Fragment>
    );
}

export const ATTRIBUTE = {
    BUTTON:            ('data-button' : 'data-button'),
    FUNDING_SOURCE:    ('data-funding-source' : 'data-funding-source'),
    PAYMENT_METHOD_ID: ('data-payment-method-id' : 'data-payment-method-id'),
    INSTRUMENT_ID:     ('data-instrument-id' : 'data-instrument-id'),
    INSTRUMENT_TYPE:   ('data-instrument-type' : 'data-instrument-type'),
    VERSION:           ('data-paypal-smart-button-version' : 'data-paypal-smart-button-version'),
    CARD:              ('data-card' : 'data-card'),
    MENU:              ('data-menu' : 'data-menu'),
    OPTIONAL:          ('optional' : 'optional'),
    PAY_NOW:           ('data-pay-now' : 'data-pay-now')
};

export const DEFAULT = ('default' : 'default');
