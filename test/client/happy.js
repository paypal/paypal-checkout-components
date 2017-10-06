
import { setupButton } from '../../public/js/button/button';
import { createButtonHTML } from './mocks';
import { triggerKeyPress } from './util';

describe('happy cases', () => {

    it('should render a button, click the button, and render checkout', () => {
    
        let renderToCalled = false;
    
        window.paypal.Checkout = {
            renderTo() {
                renderToCalled = true;
            }
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        window.document.querySelector('.paypal-button').click();
    
        if (!renderToCalled) {
            throw new Error(`Expected renderTo to be called`);
        }
    });
    
    it('should render a button, press enter on the button, and render checkout', () => {
    
        let renderToCalled = false;
    
        window.paypal.Checkout = {
            renderTo() {
                renderToCalled = true;
            }
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        triggerKeyPress(window.document.querySelector('.paypal-button'), 13);
    
        if (!renderToCalled) {
            throw new Error(`Expected renderTo to be called`);
        }
    });
    
    it('should render a button, click the button, and call onClick', () => {
    
        let onClickCalled = false;
    
        window.xprops.onClick = () => {
            onClickCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        window.document.querySelector('.paypal-button').click();
    
        if (!onClickCalled) {
            throw new Error(`Expected onClick to be called`);
        }
    });
    
    it('should render a button, press enter on the button, and call onClick', () => {
        
        let onClickCalled = false;
    
        window.xprops.onClick = () => {
            onClickCalled = true;
        };
    
        window.document.body.innerHTML = createButtonHTML();
    
        setupButton();
    
        triggerKeyPress(window.document.querySelector('.paypal-button'), 13);
    
        if (!onClickCalled) {
            throw new Error(`Expected onClick to be called`);
        }
    });
});