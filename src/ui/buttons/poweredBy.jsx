/* @flow */
/** @jsx node */

import { node, type ChildType } from 'jsx-pragmatic/src';
import { type LocaleType } from '@paypal/sdk-constants/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';

import { CLASS } from '../../constants';
import { Text } from '../text';

import { buttonContent } from './content';


const POWERED_BY_PAYPAL_STYLE = `
    .${ CLASS.POWERED_BY } {
        text-align: center;
        margin: 10px auto;
        height: 14px;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 11px;
        font-weight: normal;
        font-style: italic;
        font-stretch: normal;
        color: #7b8388;
        position: relative;
        margin-right: 3px;
        bottom: 3px;
    }
    
    .${ CLASS.POWERED_BY } > .${ CLASS.TEXT },
    .${ CLASS.POWERED_BY } > .${ LOGO_CLASS.LOGO } {
        display: inline-block;
        vertical-align: middle;
        height: 16px;
        line-height: 16px;
        font-size: 11px;
    }
`;

type PoweredByPayPalProps = {|
    locale : LocaleType
|};

export function PoweredByPayPal({ locale: { lang } } : PoweredByPayPalProps) : ChildType {
    const { PoweredBy } = buttonContent[lang];

    return (
        <div class={ CLASS.POWERED_BY }>
            <style innerHTML={ POWERED_BY_PAYPAL_STYLE } />
            { __WEB__
                ? <Text />
                : <PoweredBy logoColor={ LOGO_COLOR.BLUE } />}
        </div>
    );
}
