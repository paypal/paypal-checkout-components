/* @flow */

import { ZalgoPromise } from '@krakenjs/zalgo-promise/src';
import { once } from '@krakenjs/belter/src';

import { generateOrderID, createTestContainer, destroyTestContainer, WEBVIEW_USER_AGENT } from '../common';

window.angular.module('app', [ window.paypal.Buttons.driver('angular', window.angular).name ]);
window.angular.bootstrap(document.body, [ 'app' ]);

for (const flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button framework drivers on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();

            if (flow === 'iframe') {
                window.navigator.mockUserAgent = WEBVIEW_USER_AGENT;
            }
        });

        afterEach(() => {
            destroyTestContainer();
        });

        it('should render a button into a container with React and click on the button, then complete the checkout', (done) => {
            done = once(done);

            const PayPalButton = window.paypal.Buttons.driver('react', {
                React:    window.React,
                ReactDOM: window.ReactDOM
            });

            const Main = window.React.createClass({

                render() : Object {

                    window.__test__ = { flow, action: 'checkout' };

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(PayPalButton, {

                            createOrder() : string | ZalgoPromise<string> {
                                return ZalgoPromise.resolve(generateOrderID());
                            },

                            onApprove() : void {
                                return done();
                            },

                            onCancel() : void {
                                return done(new Error('Expected onCancel to not be called'));
                            }
                        })
                    );
                }
            });

            const container = document.createElement('div');

            if (!document.body) {
                throw new Error('Could not find document body');
            }

            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with React with a promise in createOrder and click on the button, then complete the checkout', (done) => {
            done = once(done);

            const PayPalButton = window.paypal.Buttons.driver('react', {
                React:    window.React,
                ReactDOM: window.ReactDOM
            });

            const Main = window.React.createClass({

                render() : Object {

                    window.__test__ = { flow, action: 'checkout' };

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(PayPalButton, {

                            createOrder() : string | ZalgoPromise<string> {
                                return ZalgoPromise.try(() => {
                                    return ZalgoPromise.resolve(generateOrderID());
                                });
                            },

                            onApprove() : void {
                                return done();
                            },

                            onCancel() : void {
                                return done(new Error('Expected onCancel to not be called'));
                            }
                        })
                    );
                }
            });

            const container = document.createElement('div');

            if (!document.body) {
                throw new Error('Could not find document body');
            }

            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with React with a non-zalgo promise in createOrder and click on the button, then complete the checkout', (done) => {
            done = once(done);

            const PayPalButton = window.paypal.Buttons.driver('react', {
                React:    window.React,
                ReactDOM: window.ReactDOM
            });

            const Main = window.React.createClass({

                render() : Object {

                    window.__test__ = { flow, action: 'checkout' };

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(PayPalButton, {

                            createOrder() : string | ZalgoPromise<string> {
                                // $FlowFixMe
                                return {
                                    then(successHandler) {
                                        successHandler(generateOrderID());
                                    }
                                };
                            },

                            onApprove() : void {
                                return done();
                            },

                            onCancel() : void {
                                return done(new Error('Expected onCancel to not be called'));
                            }
                        })
                    );
                }
            });

            const container = document.createElement('div');

            if (!document.body) {
                throw new Error('Could not find document body');
            }

            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with Angular and click on the button, then complete the checkout', done => {

            const injector = window.angular.element(document.body).injector();
            const $compile = injector.get('$compile');
            const $rootScope = injector.get('$rootScope');

            const $scope = $rootScope.$new();

            window.__test__ = { flow, action: 'checkout' };

            $scope.opts = {

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.resolve(generateOrderID());
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }
            };

            const template = `
                <paypal-buttons props="opts"></paypal-button>
            `;

            $compile(template)($scope, element => {

                if (!document.body) {
                    throw new Error('Could not find document body');
                }

                document.body.appendChild(element[0]);
            });
        });

        it('should render a button into a container with Angular with a promise in createOrder and click on the button, then complete the checkout', done => {

            const injector = window.angular.element(document.body).injector();
            const $compile = injector.get('$compile');
            const $rootScope = injector.get('$rootScope');

            const $scope = $rootScope.$new();

            window.__test__ = { flow, action: 'checkout' };

            $scope.opts = {

                createOrder() : string | ZalgoPromise<string> {
                    return ZalgoPromise.try(() => {
                        return ZalgoPromise.resolve(generateOrderID());
                    });
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }
            };

            const template = `
                <paypal-buttons props="opts"></test-component>
            `;

            $compile(template)($scope, element => {

                if (!document.body) {
                    throw new Error('Could not find document body');
                }

                document.body.appendChild(element[0]);
            });
        });

        it('should render a button into a container with Angular with a non-zalgo promise in createOrder and click on the button, then complete the checkout', done => {

            const injector = window.angular.element(document.body).injector();
            const $compile = injector.get('$compile');
            const $rootScope = injector.get('$rootScope');

            const $scope = $rootScope.$new();

            window.__test__ = { flow, action: 'checkout' };

            $scope.opts = {

                createOrder() : string | ZalgoPromise<string> {
                    // $FlowFixMe
                    return {
                        then(successHandler) {
                            successHandler(generateOrderID());
                        }
                    };
                },

                onApprove() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }
            };

            const template = `
                <paypal-buttons props="opts"></test-component>
            `;

            $compile(template)($scope, element => {

                if (!document.body) {
                    throw new Error('Could not find document body');
                }

                document.body.appendChild(element[0]);
            });
        });
    });

}
