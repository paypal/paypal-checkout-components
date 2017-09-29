/* @flow */
/* eslint max-lines: 0 */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer, getElement } from '../common';

describe(`paypal button component validate`, () => {

    beforeEach(() => {
        createTestContainer();
    });

    afterEach(() => {
        destroyTestContainer();
    });

    it('should render a button into a container, then disable the button, then click on the button, then complete the payment', (done) => {

        let input = document.createElement('input');
        input.type = 'checkbox';

        getElement('#testContainer').appendChild(input);

        let clicks = 0;

        window.paypal.Button.render({

            test: {
                onRender(actions) {
                    actions.click();

                    input.addEventListener('change', () => {
                        setTimeout(() => {
                            actions.click();
                        }, 200);
                    });
                }
            },

            payment() : string | ZalgoPromise<string> {
                return generateECToken();
            },

            validate(actions) {
                actions.disable();

                input.addEventListener('change', () => {
                    if (input.checked) {
                        actions.enable();
                    } else {
                        actions.disable();
                    }
                });
            },

            onClick() {
                clicks += 1;

                if (clicks === 1) {

                    if (input.checked) {
                        throw new Error('Expected checkbox to be unchecked');
                    }

                    input.click();

                } else if (clicks === 2) {

                    if (!input.checked) {
                        throw new Error('Expected checkbox to be checked');
                    }
                }
            },

            onAuthorize() : void {

                if (clicks !== 2) {
                    throw new Error('Expected onClick to have been called twice');
                }

                return done();
            },

            onCancel() : void {
                return done(new Error('Expected onCancel to not be called'));
            }

        }, '#testContainer');
    });
});
