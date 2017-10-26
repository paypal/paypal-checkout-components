/* @flow */
/* eslint max-lines: 0 */

import { ZalgoPromise } from 'zalgo-promise/src';

import { createTestContainer, destroyTestContainer, IPHONE6_USER_AGENT } from '../common';

describe(`paypal button component remembered funding`, () => {

    beforeEach(() => {
        createTestContainer();
        window.navigator.mockUserAgent = IPHONE6_USER_AGENT;
    });

    afterEach(() => {
        destroyTestContainer();
        window.location.hash = '';
    });

    it('should not call onRememberUser for a non-remembered user', (done) => {

        let onRememberUserCalled = false;

        window.paypal.Button.render({

            test: {
                onRender() {
                    if (onRememberUserCalled) {
                        throw new Error(`Expected onRememberUser to not be called`);
                    }

                    done();
                }
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });

    it('should call onRememberUser for a remembered user', (done) => {

        let onRememberUserCalled = false;

        window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.PAYPAL,
                onRender() {
                    if (!onRememberUserCalled) {
                        throw new Error(`Expected onRememberUser to be called`);
                    }

                    done();
                }
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });

    it('should not call onRememberUser on paypal button for remembered venmo user', (done) => {

        let onRememberUserCalled = false;

        window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.VENMO,
                onRender() {
                    if (onRememberUserCalled) {
                        throw new Error(`Expected onRememberUser to not be called`);
                    }

                    done();
                }
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });

    it('should not call onRememberUser on venmo button for remembered paypal user', (done) => {

        let onRememberUserCalled = false;

        window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.PAYPAL,
                onRender() {
                    if (onRememberUserCalled) {
                        throw new Error(`Expected onRememberUser to not be called`);
                    }

                    done();
                }
            },

            style: {
                label: 'venmo'
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });

    it('should call onRememberUser instantly on second render for a paypal user', () => {

        let onRememberUserCalled = false;

        return window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.PAYPAL
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            }

        }, '#testContainer').then(() => {

            if (onRememberUserCalled) {
                throw new Error(`Expected onRememberUser to not be called`);
            }

            let onRememberUserCalled2 = false;

            return window.paypal.Button.render({

                test: {
                    action:     'remember',
                    remembered: window.paypal.FUNDING.PAYPAL
                },

                onRememberUser() {
                    onRememberUserCalled2 = true;
                },

                payment() : string | ZalgoPromise<string> {
                    throw new Error('Expected payment to not be called');
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(() => {

                if (!onRememberUserCalled2) {
                    throw new Error(`Expected onRememberUser to be called`);
                }
            });
        });
    });

    it('should call onRememberUser instantly on second render for a venmo user', () => {

        let onRememberUserCalled = false;

        return window.paypal.Button.render({

            style: {
                label: 'venmo'
            },

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.VENMO
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            }

        }, '#testContainer').then(() => {

            if (onRememberUserCalled) {
                throw new Error(`Expected onRememberUser to not be called`);
            }

            let onRememberUserCalled2 = false;

            return window.paypal.Button.render({

                style: {
                    label: 'venmo'
                },

                test: {
                    action:     'remember',
                    remembered: window.paypal.FUNDING.VENMO
                },

                onRememberUser() {
                    onRememberUserCalled2 = true;
                },

                payment() : string | ZalgoPromise<string> {
                    throw new Error('Expected payment to not be called');
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(() => {

                if (!onRememberUserCalled2) {
                    throw new Error(`Expected onRememberUser to be called`);
                }
            });
        });
    });

    it('should not call onRememberUser on second render for a venmo user after rendering a paypal button', () => {

        let onRememberUserCalled = false;

        return window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.PAYPAL
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            }

        }, '#testContainer').then(() => {

            if (onRememberUserCalled) {
                throw new Error(`Expected onRememberUser to not be called`);
            }

            let onRememberUserCalled2 = false;

            return window.paypal.Button.render({

                test: {
                    action:     'remember',
                    remembered: window.paypal.FUNDING.VENMO
                },

                style: {
                    label: 'venmo'
                },

                onRememberUser() {
                    onRememberUserCalled2 = true;
                },

                payment() : string | ZalgoPromise<string> {
                    throw new Error('Expected payment to not be called');
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(() => {

                if (onRememberUserCalled2) {
                    throw new Error(`Expected onRememberUser to not be called`);
                }
            });
        });
    });

    it('should not call onRememberUser on second render for a paypal user after rendering a venmo button', () => {

        let onRememberUserCalled = false;

        return window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.VENMO
            },

            style: {
                label: 'venmo'
            },

            onRememberUser() {
                onRememberUserCalled = true;
            },

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            }

        }, '#testContainer').then(() => {

            if (onRememberUserCalled) {
                throw new Error(`Expected onRememberUser to not be called`);
            }

            let onRememberUserCalled2 = false;

            return window.paypal.Button.render({

                test: {
                    action:     'remember',
                    remembered: window.paypal.FUNDING.PAYPAL
                },

                onRememberUser() {
                    onRememberUserCalled2 = true;
                },

                payment() : string | ZalgoPromise<string> {
                    throw new Error('Expected payment to not be called');
                },

                onAuthorize() {
                    throw new Error('Expected onAuthorize to not be called');
                },

                onCancel() {
                    throw new Error('Expected onCancel to not be called');
                }

            }, '#testContainer').then(() => {

                if (onRememberUserCalled2) {
                    throw new Error(`Expected onRememberUser to not be called`);
                }
            });
        });
    });

    it('should only show venmo button in vertical layout after venmo has been remembered', (done) => {

        window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: window.paypal.FUNDING.VENMO,
                onRender({ fundingSources }) {

                    if (fundingSources.indexOf(window.paypal.FUNDING.VENMO) !== -1) {
                        throw new Error(`Expected venmo button to be present in first render, got ${ fundingSources.join(', ') }`);
                    }

                    window.paypal.Button.render({

                        test: {
                            onRender({ fundingSources: fundingSources2 }) {

                                if (fundingSources2.indexOf(window.paypal.FUNDING.VENMO) === -1) {
                                    throw new Error(`Expected venmo button to be present in second render, got ${ fundingSources2.join(', ') }`);
                                }

                                done();
                            }
                        },

                        style: {
                            layout: 'vertical'
                        },

                        locale: 'en_US',

                        payment() : string | ZalgoPromise<string> {
                            throw new Error('Expected payment to not be called');
                        },

                        onAuthorize() {
                            throw new Error('Expected onAuthorize to not be called');
                        },

                        onCancel() {
                            throw new Error('Expected onCancel to not be called');
                        }
                    });
                }
            },

            style: {
                layout: 'vertical'
            },

            locale: 'en_US',

            payment() : string | ZalgoPromise<string> {
                throw new Error('Expected payment to not be called');
            },

            onAuthorize() {
                throw new Error('Expected onAuthorize to not be called');
            },

            onCancel() {
                throw new Error('Expected onCancel to not be called');
            },

            onError: done

        }, '#testContainer');
    });
});
