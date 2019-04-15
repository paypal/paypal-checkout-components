/* @flow */
/** @jsx node */

import { ENV } from '@paypal/sdk-constants/src';
import { node, html, type ElementNode } from 'jsx-pragmatic/src';
import { LOGO_COLOR, LOGO_CLASS } from '@paypal/sdk-logos/src';

import { BUTTON_NUMBER, BUTTON_LABEL, CLASS, BUTTON_COLOR } from '../../constants';
import { type ButtonStyle } from '../props';

import { componentStyle } from './styles';

type StyleProps = {|
    style : ButtonStyle,
    cardNumber? : number,
    nonce : string
|};

export function getCommonClasses({ style, multiple, env } :
    {| style : ButtonStyle, multiple : boolean, env : $Values<typeof ENV> |}) : string {

    const { layout, shape } = style;
    
    return [
        `${ CLASS.LAYOUT }-${ layout }`,
        `${ CLASS.SHAPE }-${ shape }`,
        `${ CLASS.NUMBER }-${ multiple ? BUTTON_NUMBER.MULTIPLE : BUTTON_NUMBER.SINGLE }`,
        `${ CLASS.ENV }-${ env }`
    ].join(' ');
}

export function getButtonClasses({ label, color, logoColor } :
    {| label : $Values<typeof BUTTON_LABEL>, color : $Values<typeof BUTTON_COLOR>, logoColor : $Values<typeof LOGO_COLOR> |}) : string {
    
    return [
        `${ CLASS.LABEL }-${ label }`,
        `${ CLASS.COLOR }-${ color }`,
        `${ LOGO_CLASS.LOGO_COLOR }-${ logoColor }`
    ].join(' ');
}

export function Style({ style, cardNumber, nonce } : StyleProps) : ElementNode {

    const { height } = style;
    const css = componentStyle({ height, cardNumber });

    const styleTag = (
        <style nonce={ nonce } innerHTML={ css } />
    );

    try {
        styleTag.render(html());
        return styleTag;

    } catch (err) {
        return (
            <style nonce={ nonce }>{ css }</style>
        );
    }
}
