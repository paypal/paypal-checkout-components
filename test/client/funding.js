/* @flow */

import { FUNDING } from '@paypal/sdk-constants';
import { wrapPromise } from 'belter/src';

import { promiseNoop } from '../../src/lib';

import { mockSetupButton, createButtonHTML, DEFAULT_FUNDING_ELIGIBILITY, mockFunction, clickButton } from './mocks';

describe('funding source cases', () => {

    it('should render a button, click the button, and render checkout with paypal funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.PAYPAL;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            createButtonHTML();

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility: DEFAULT_FUNDING_ELIGIBILITY });

            await clickButton(fundingSource);
        });
    });
    
    it('should render a button, click the button, and render checkout with venmo funding source', async () => {
        window.navigator.mockUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A356 Safari/604.1';
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.VENMO;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                venmo: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with ideal funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.IDEAL;


            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                ideal: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });


    it('should render a button, click the button, and render checkout with sofort funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.SOFORT;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                sofort: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with p24 funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.P24;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                p24: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with bancontact funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.BANCONTACT;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                bancontact: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with blik funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.BLIK;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                blik: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with eps funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.EPS;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                eps: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with giropay funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.GIROPAY;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                giropay: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with mybank funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.MYBANK;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                mybank: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

    it('should render a button, click the button, and render checkout with trustly funding source', async () => {
        return await wrapPromise(async ({ expect }) => {
            const fundingSource = FUNDING.TRUSTLY;

            mockFunction(window.paypal, 'Checkout', expect('Checkout', ({ args: [ props ] }) => {
                if (props.fundingSource !== fundingSource) {
                    throw new Error(`Expected fundingSource to be ${ fundingSource }, got ${ props.fundingSource }`);
                }

                return {
                    renderTo: promiseNoop
                };
            }));

            const fundingEligibility = {
                trustly: {
                    eligible: true
                }
            };

            createButtonHTML({ fundingEligibility });

            await mockSetupButton({ merchantID: [ 'XYZ12345' ], fundingEligibility });

            await clickButton(fundingSource);
        });
    });

});
