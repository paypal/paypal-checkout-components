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

    it('isFundingRemembered should return false by default for paypal', () => {
        
        const source = window.paypal.FUNDING.PAYPAL;
        const expected = false;

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return false by default for venmo', () => {

        const source = window.paypal.FUNDING.VENMO;
        const expected = false;

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return true for paypal when funding is remembered', () => {

        const source = window.paypal.FUNDING.PAYPAL;
        const expected = true;
        
        window.localStorage.setItem('rememberedFunding', JSON.stringify([ source ]));

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return true for venmo when funding is remembered', () => {

        const source = window.paypal.FUNDING.VENMO;
        const expected = true;

        window.localStorage.setItem('rememberedFunding', JSON.stringify([ source ]));

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return false for paypal when venmo is remembered user', () => {

        const source = window.paypal.FUNDING.PAYPAL;
        const expected = false;

        window.localStorage.setItem('rememberedFunding', JSON.stringify([ window.paypal.FUNDING.VENMO ]));

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return false for venmo when paypal is remembered user', () => {

        const source = window.paypal.FUNDING.VENMO;
        const expected = false;

        window.localStorage.setItem('rememberedFunding', JSON.stringify([ window.paypal.FUNDING.PAYPAL ]));

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return true for paypal when multiple funding sources are remembered', () => {

        const source = window.paypal.FUNDING.PAYPAL;
        const expected = true;

        window.localStorage.setItem('rememberedFunding', JSON.stringify([ window.paypal.FUNDING.VENMO, window.paypal.FUNDING.PAYPAL ]));

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return true for venmo when multiple funding sources are remembered', () => {

        const source = window.paypal.FUNDING.VENMO;
        const expected = true;

        window.localStorage.setItem('rememberedFunding', JSON.stringify([ window.paypal.FUNDING.VENMO, window.paypal.FUNDING.PAYPAL ]));

        return window.paypal.isFundingRemembered(source).then(result => {
            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }
        });
    });

    it('isFundingRemembered should return true instantly for paypal when funding is remembered and cached', () => {

        const source = window.paypal.FUNDING.PAYPAL;
        const expected = true;

        window.localStorage.setItem('rememberedFunding', JSON.stringify([ source ]));

        let firstThenCalled = false;

        const promise1 =  window.paypal.isFundingRemembered(source).then(result => {
            firstThenCalled = true;

            if (result !== expected) {
                throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
            }

            let secondThenCalled = false;

            const promise2 = window.paypal.isFundingRemembered(source).then(result2 => {
                secondThenCalled = true;

                if (result2 !== expected) {
                    throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
                }
            });

            if (!secondThenCalled) {
                throw new Error(`Expected then to be called immediately`);
            }

            return promise2;
        });

        if (firstThenCalled) {
            throw new Error(`Expected then to not be called immediately`);
        }

        return promise1;
    });

    it('should render a button then get an immediate result for isFundingRemembered', (done) => {
        
        const source = window.paypal.FUNDING.VENMO;
        
        window.paypal.Button.render({

            test: {
                action:     'remember',
                remembered: source,
                onRender:   () => {
                    
                    let thenCalled = false;
                    const expected = true;

                    const promise = window.paypal.isFundingRemembered(source).then(result => {
                        thenCalled = true;

                        if (result !== expected) {
                            throw new Error(`Expected ${ source } to be ${ expected ? 'remembered' : 'not remembered' }`);
                        }
                    });

                    if (!thenCalled) {
                        throw new Error(`Expected then to be called immediately`);
                    }

                    return promise.then(() => done()).catch(done);
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
                    }, '#testContainer');
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
