/* @flow */

import { onClick as onElementClick, destroyElement } from 'belter/src';
import { FUNDING } from '@paypal/sdk-constants/src';
import { ZalgoPromise } from 'zalgo-promise/src';

import type { ContentType } from '../types';
import { renderSmartMenu } from '../menu/interface';
import { CHECKOUT_POPUP_DIMENSIONS, type Payment } from '../payment-flows';
import { deleteVault } from '../api';
import { DATA_ATTRIBUTES, BUYER_INTENT } from '../constants';

import { type ButtonProps } from './props';
import { enableLoadingSpinner, disableLoadingSpinner } from './dom';

const MENU_CHOICE = {
    DELETE_VAULT:            'DELETE_VAULT',
    SELECT_FUNDING_SHIPPING: 'SELECT_FUNDING_SHIPPING',
    CHANGE_ACCOUNT:          'CHANGE_ACCOUNT'
};

const popup = {
    width:  CHECKOUT_POPUP_DIMENSIONS.WIDTH,
    height: CHECKOUT_POPUP_DIMENSIONS.HEIGHT
};

type ButtonDropdownProps = {|
    payment : Payment,
    props : ButtonProps,
    content : ContentType,
    initiatePayment : ({| payment : Payment |}) => ZalgoPromise<void>
|};

let smartMenu;

export function renderButtonDropdown({ props, payment, content, initiatePayment } : ButtonDropdownProps) {
    const { clientID, clientAccessToken } = props;
    const { button, fundingSource, paymentMethodID } = payment;
    const menuToggle = button.querySelector(`[${ DATA_ATTRIBUTES.MENU }]`);

    const buttonParent = button.parentElement;

    if (clientID && buttonParent && menuToggle && paymentMethodID && clientAccessToken) {
        smartMenu = smartMenu || renderSmartMenu({ clientID });

        onElementClick(menuToggle, event => {
            event.preventDefault();
            event.stopPropagation();

            const PAYPAL_CHOICES = [
                {
                    id:    MENU_CHOICE.SELECT_FUNDING_SHIPPING,
                    label: content.chooseCardOrShipping,
                    popup
                },
                {
                    id:    MENU_CHOICE.CHANGE_ACCOUNT,
                    label: content.useDifferentAccount,
                    popup
                } /* ,
                {
                    id:    MENU_CHOICE.DELETE_VAULT,
                    label: content.deleteVaultedAccount
                }
                */
            ];

            const CARD_CHOICES = [
                {
                    id:    MENU_CHOICE.DELETE_VAULT,
                    label: content.deleteVaultedCard
                }
            ];

            const choices = (fundingSource === FUNDING.PAYPAL)
                ? PAYPAL_CHOICES
                : CARD_CHOICES;

            const verticalOffset = button.getBoundingClientRect().bottom;
            const loadingTimeout = setTimeout(() => enableLoadingSpinner(button), 50);

            smartMenu.display({
                choices,
                verticalOffset,
                onChoose: ({ id, win }) => {
                    if (id === MENU_CHOICE.CHANGE_ACCOUNT) {
                        return initiatePayment({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_ACCOUNT } });

                    } else if (id === MENU_CHOICE.DELETE_VAULT) {
                        if (!clientAccessToken || !paymentMethodID) {
                            throw new Error(`Can not delete vault without client access token and payment method id`);
                        }

                        enableLoadingSpinner(button);
                        return deleteVault({ paymentMethodID, clientAccessToken }).then(() => {
                            disableLoadingSpinner(button);
                            destroyElement(button);

                            if (buttonParent.querySelectorAll(`[${ DATA_ATTRIBUTES.PAYMENT_METHOD_ID }]`).length === 0) {
                                const payInstantlyHeader = buttonParent.querySelector('.paypal-vault-header');
                                if (payInstantlyHeader) {
                                    destroyElement(payInstantlyHeader);
                                }
                            }
                        });

                    } else if (id === MENU_CHOICE.SELECT_FUNDING_SHIPPING) {
                        if (!clientAccessToken || !paymentMethodID) {
                            throw new Error(`Can not change funding or shipping without client access token and payment method id`);
                        }
                        
                        return initiatePayment({ payment: { ...payment, win, buyerIntent: BUYER_INTENT.PAY_WITH_DIFFERENT_FUNDING_SHIPPING } });
                    }
                }
            }).then(() => {
                clearTimeout(loadingTimeout);
                disableLoadingSpinner(button);
            });
        });
    }
}
