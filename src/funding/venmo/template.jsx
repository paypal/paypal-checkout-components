/* @flow */
/** @jsx node */
import { node, Style, type ChildType } from 'jsx-pragmatic/src';
import { VenmoLogo } from '@paypal/sdk-logos/src';

import { type WalletLabelOptions } from '../common';
import { Text, Space } from '../../ui/text';

import css from './style.scoped.scss';

export function  WalletLabel({ ...props } : WalletLabelOptions) : ChildType {
    const { instrument, logoColor } = props;
    let label;
    const logo =  <VenmoLogo logoColor={ logoColor } />;

    if (instrument && instrument.label) {
        label = instrument.label;
    }
    

    return (
        <Style css={ css }>
            <div class='wallet-label-venmo'>
                <div class='divider'>|</div>
                {
                    logo &&
                        <div class='logo' optional>
                            { logo }
                            <Space />
                        </div>
                }
                {
                    label &&
                    <div class='label'>
                        <Text className={ [ 'limit' ] }>
                            { label }
                        </Text>
                    </div>
                }
            </div>
        </Style>
    );
}
