/* @flow */
/** @jsx node */

import { node, type ChildType } from 'jsx-pragmatic/src';
import { type LocaleType } from '@paypal/sdk-constants/src';
import { LOGO_COLOR } from '@paypal/sdk-logos/src';

import { CLASS } from '../../constants';

import { LoadingDots, Text } from '..';

import { buttonContent } from './content';

const POWERED_BY_PAYPAL_STYLE = `
    text-align: center;
    margin: 10px auto;
    height: 14px;
    font-family: PayPal-Sans, HelveticaNeue, sans-serif;
    font-size: 11px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    color: #7b8388;
    position: relative;
    margin-right: 3px;
    bottom: 3px;
`;

type PoweredByPayPalProps = {|
    locale : LocaleType
|};

export function PoweredByPayPal({ locale: { lang } } : PoweredByPayPalProps) : ChildType {
    const { PoweredBy } = buttonContent[lang];

    return (
        <div class={ CLASS.POWERED_BY } style={ POWERED_BY_PAYPAL_STYLE }>
            { __WEB__
                ? <Text><LoadingDots /></Text>
                : <PoweredBy logoColor={ LOGO_COLOR.BLUE } />
            }
        </div>
    );
}
