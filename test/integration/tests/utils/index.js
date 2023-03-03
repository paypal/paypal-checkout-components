/* @flow */

import { CURRENCY, FUNDING } from '@paypal/sdk-constants/src';

import { BUTTON_LAYOUT } from '../../../../src/constants';
import { isInlineXOEligible } from '../../../../src/zoid/buttons/util';

/**
 * isInlineXOEligible requirements:
 *
 * buyerCountry => US
 * commit => true
 * currency => USD
 * createBillingAgreement => not set
 * disableFunding => not CARD
 * fundingEligibility => CARD is eligible
 * layout => vertical
 * merchantID => not set
 * vault => false
 *
 */
describe('isInlineXOEligible', () => {
    let props;

    beforeEach(() => {
        props = {
            commit:             true,
            currency:           CURRENCY.USD,
            custom:             { label: 'Checkout', css: {} },
            disableFunding:     [ FUNDING.CREDIT ],
            fundingEligibility: {
                [FUNDING.CARD]: {
                    eligible: true,
                    branded:  false,
                    vendors:  {
                        visa: {
                            eligible: true
                        }
                    }
                }
            },
            layout: BUTTON_LAYOUT.VERTICAL,
            onComplete: () => true,
            vault:  false
        };
    });

    it('should be eligible if satisfies requirements above', () => {
        if (!isInlineXOEligible({ props })) {
            throw new Error(`Expected ${ JSON.stringify(props) } to be eligible.`);
        }
    });

    it('should be ineligible if commit is false', () => {
        props.commit = false;

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected commit=false to be ineligible.`);
        }
    });
   
    it('should be ineligible if currency is not USD', () => {
        props.currency = CURRENCY.CAD;

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected currency=CAD to be ineligible.`);
        }
    });
   
    it('should be ineligible if disableFunding is CARD', () => {
        props.disableFunding = [ FUNDING.CARD ];

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected diableFunding=[CARD] to be ineligible.`);
        }
    });
   
    it('should be ineligible if fundingEligibility is false', () => {
        const card = props.fundingEligibility[FUNDING.CARD];
        if (card) {
            card.eligible = false;
        }

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected fundingEligibility[CARD].eligible = false to be ineligible.`);
        }
    });
   
    it('should be ineligible if layout is horizontal', () => {
        props.layout = BUTTON_LAYOUT.HORIZONTAL;

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected layout=horizontal to be ineligible.`);
        }
    });
   
    it('should be ineligible if custom is not set', () => {
        props.custom = undefined;

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected custom style to be set to be eligible.`);
        }
    });
   
    it('should be ineligible if vault is false', () => {
        props.vault = false;

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected vault=false to be ineligible.`);
        }
    });
   
    it('should be ineligible if merchantID is set', () => {
        props.merchantID = [ 'ABC123' ];

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected merchantID to not be set to be ineligible.`);
        }
    });
   
    it('should be ineligible if onComplete is not set', () => {
        props.onComplete = undefined;

        if (isInlineXOEligible({ props })) {
            throw new Error(`Expected onComplete not be set to be ineligible.`);
        }
    });
});
