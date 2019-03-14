/* @flow */
/* eslint require-await: off, max-lines: off, max-nested-callbacks: off */

import { wrapPromise } from 'belter/src';
import { ZalgoPromise } from 'zalgo-promise/src';
import { FUNDING } from '@paypal/sdk-constants/src';

import { setupButton } from '../../src';

import { createButtonHTML } from './mocks';

describe('prerender cases', () => {

    it('should prerender a button, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';
            const payerID = 'YYYYYYYYYY';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            };

            window.xprops.createOrder = expect('createOrder', async () => {
                return orderID;
            });

            window.xprops.onApprove = expect('onApprove', async (data) => {
                if (data.orderID !== orderID) {
                    throw new Error(`Expected orderID to be ${ orderID }, got ${ data.orderID }`);
                }

                if (data.payerID !== payerID) {
                    throw new Error(`Expected payerID to be ${ payerID }, got ${ data.payerID }`);
                }
            });

            window.paypal.Checkout = expect('Checkout', (props) => {
                if (props.window !== win) {
                    throw new Error(`Expected window prop to be passed`);
                }

                return {
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(id => {
                            if (id !== orderID) {
                                throw new Error(`Expected orderID to be ${ orderID }, got ${ id }`);
                            }

                            return props.onApprove({ orderID, payerID }, {});

                        }).then(() => {
                            return props.onClose();
                        });
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});
        });
    });

    it('should render a button, enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            };

            window.xprops.onInit = (data, actions) => {
                return actions.enable();
            };

            window.xprops.onClick = expect('onClick');

            window.xprops.createOrder = expect('createOrder', () => orderID);

            window.paypal.Checkout = expect('Checkout', (props) => {
                if (props.window !== win) {
                    throw new Error(`Expected window prop to be passed`);
                }

                return {
                    close:    avoid('close'),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(expect('createOrderThen'));
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});
        });
    });

    it('should render a button, disable the button, click, and not call Checkout or createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const win = {
                close: expect('close')
            };

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            };

            window.xprops.onInit = (data, actions) => {
                return actions.disable();
            };

            window.xprops.onClick = expect('onClick');

            window.xprops.createOrder = avoid('createOrder');
            window.xprops.onApprove = avoid('onApprove');
            window.paypal.Checkout = (props) => {
                if (props.window !== win) {
                    throw new Error(`Expected window prop to be passed`);
                }

                return {
                    renderTo: avoid('renderTo')
                };
            };

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});
        });
    });

    it('should render a button, disable the button, re-enable the button, click, and call createOrder or onApprove', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            };

            window.xprops.onInit = (data, actions) => {
                return actions.disable().then(() => {
                    return ZalgoPromise.delay(50);
                }).then(() => {
                    return actions.enable();
                });
            };

            window.xprops.onClick = expect('onClick');

            window.xprops.createOrder = expect('createOrder', () => orderID);

            window.paypal.Checkout = expect('Checkout', (props) => {
                if (props.window !== win) {
                    throw new Error(`Expected window prop to be passed`);
                }

                return {
                    close:    avoid('close'),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(expect('createOrderThen')).then(() => {
                            return props.onClose();
                        });
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});
        });
    });

    it('should render a button, and resolve in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const orderID = 'XXXXXXXXXX';

            const win = {
                close: avoid('close')
            };

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            };

            window.xprops.onClick = expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.resolve());
            });

            window.xprops.createOrder = expect('createOrder', () => orderID);
            window.xprops.onApprove = avoid('onApprove');

            window.paypal.Checkout = expect('Checkout', (props) => {
                if (props.window !== win) {
                    throw new Error(`Expected window prop to be passed`);
                }

                return {
                    close:    avoid('close'),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(expect('createOrderThen')).then(() => {
                            return props.onClose();
                        });
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});
        });
    });

    it('should render a button, and reject in onClick', async () => {
        return await wrapPromise(async ({ expect, avoid }) => {

            const win = {
                close: expect('close')
            };

            window.xprops.getPrerenderDetails = () => {
                return ZalgoPromise.try(() => {
                    return {
                        win,
                        fundingSource: FUNDING.PAYPAL
                    };
                });
            };

            window.xprops.onClick = expect('onClick', (data, actions) => {
                return ZalgoPromise.delay(50).then(() => actions.reject());
            });

            window.xprops.createOrder = avoid('createOrder');
            window.xprops.onApprove = avoid('onApprove');

            window.paypal.Checkout = expect('Checkout', (props) => {
                if (props.window !== win) {
                    throw new Error(`Expected window prop to be passed`);
                }

                return {
                    close:    expect('close', () => {
                        return props.window.close();
                    }),
                    renderTo: expect('renderTo', async () => {
                        return props.createOrder().then(avoid('createOrderThen'))
                            .timeout(50).catch(expect('timeout'));
                    })
                };
            });

            window.document.body.innerHTML = createButtonHTML();
            await setupButton({});
        });
    });
});
