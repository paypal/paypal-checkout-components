/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants';

import { setupButton } from '../../src';

import { createButtonHTML, getMockCheckoutInstance } from './mocks';

describe('funding source cases', () => {

    it('should render a button, click the button, and render checkout with paypal funding source', () => {
    
        let selectedFundingSource = '';
    
        window.paypal.Checkout = {
            renderTo: (win, { fundingSource }) => {
                selectedFundingSource = fundingSource;
                return ZalgoPromise.resolve(getMockCheckoutInstance());
            }
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        window.document.querySelector(`.paypal-button[data-funding-source="${ FUNDING.PAYPAL }"]`).click();
    
        if (selectedFundingSource !== FUNDING.PAYPAL) {
            throw new Error(`Expected fundingSource to be ${ FUNDING.PAYPAL }, got ${ selectedFundingSource }`);
        }
    });
    
    it('should render a button, click the button, and render checkout with venmo funding source', () => {
    
        let selectedFundingSource = '';
    
        window.paypal.Checkout = {
            renderTo: (win, { fundingSource }) => {
                selectedFundingSource = fundingSource;
                return ZalgoPromise.resolve(getMockCheckoutInstance());
            }
        };
    
        window.document.body.innerHTML = createButtonHTML([ FUNDING.VENMO ]);
    
        setupButton();
    
        window.document.querySelector(`.paypal-button[data-funding-source="${ FUNDING.VENMO }"]`).click();
    
        if (selectedFundingSource !== FUNDING.VENMO) {
            throw new Error(`Expected fundingSource to be ${ FUNDING.VENMO }, got ${ selectedFundingSource }`);
        }
    });
});
