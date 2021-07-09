/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';
import { type LocaleType } from '@paypal/sdk-constants/src';

import { type ButtonStyle } from './props';
import { componentStyle } from './styles';

type StyleProps = {|
    style : ButtonStyle,
    nonce : string,
    locale : LocaleType
|};

export function Style({ style, nonce, locale } : StyleProps) : ElementNode {

    const { height } = style;
    const css = componentStyle({ height, locale });

    return (
        <style nonce={ nonce } innerHTML={ css } />
    );
}
