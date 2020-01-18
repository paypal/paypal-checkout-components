/* @flow */
/** @jsx node */

import { node, dom, type ChildType } from 'jsx-pragmatic/src';
import { FUNDING, CARD } from '@paypal/sdk-constants/src';
import { popup, supportsPopups, writeElementToWindow } from 'belter/src';
import { assertSameDomain, type CrossDomainWindowType } from 'cross-domain-utils/src';
import { SpinnerPage } from '@paypal/common-components/src';

import { DEFAULT_POPUP_SIZE } from '../../config';
import { Buttons } from '../../ui';
import { type ButtonProps } from '../../ui/buttons/props';

type PrerenderedButtonsProps = {|
    nonce : ?string,
    props : ButtonProps,
    onRenderCheckout : ({|
        win? : CrossDomainWindowType,
        fundingSource : $Values<typeof FUNDING>,
        card : ?$Values<typeof CARD>
    |}) => void
|};

export function PrerenderedButtons({ nonce, onRenderCheckout, props } : PrerenderedButtonsProps) : ChildType {

    const handleClick = (event, { fundingSource, card } : {| fundingSource : $Values<typeof FUNDING>, card : ?$Values<typeof CARD> |}) => {
        if (supportsPopups()) {
            const win = assertSameDomain(popup('', {
                width:  DEFAULT_POPUP_SIZE.WIDTH,
                height: DEFAULT_POPUP_SIZE.HEIGHT
            }));

            const doc = window.document;

            const spinner = (
                <SpinnerPage nonce={ nonce } />
            ).render(dom({ doc }));

            writeElementToWindow(win, spinner);

            onRenderCheckout({ win, fundingSource, card });

        } else {
            onRenderCheckout({ fundingSource, card });
        }
    };

    return (
        <html>
            <body>
                <Buttons { ...props } onClick={ handleClick } />
            </body>
        </html>
    );
}
