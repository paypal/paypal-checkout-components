/* @flow */

import { ZalgoPromise } from 'zalgo-promise/src';

import { generateECToken, createTestContainer, destroyTestContainer } from '../common';

window.angular.module('app', [ 'paypal-button' ]);
window.angular.bootstrap(document.body, [ 'app' ]);

for (let flow of [ 'popup', 'iframe' ]) {

    describe(`paypal button framework drivers on ${ flow }`, () => {

        beforeEach(() => {
            createTestContainer();
            window.paypal.Checkout.contexts.iframe = (flow === 'iframe');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            window.paypal.Checkout.contexts.iframe = false;
        });

        it('should render a button into a container with React and click on the button, then complete the payment', (done) => {

            let Main = window.React.createClass({

                render() : Object {

                    window.__test__ = { flow, action: 'checkout' };

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(window.paypal.Button.react, {

                            payment() : string | ZalgoPromise<string> {
                                return generateECToken();
                            },

                            onAuthorize() : void {
                                return done();
                            },

                            onCancel() : void {
                                return done(new Error('Expected onCancel to not be called'));
                            }
                        })
                    );
                }
            });

            let container = document.createElement('div');

            if (!document.body) {
                throw new Error('Could not find document body');
            }

            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with React with a promise in payment and click on the button, then complete the payment', (done) => {

            let Main = window.React.createClass({

                render() : Object {

                    window.__test__ = { flow, action: 'checkout' };

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(window.paypal.Button.react, {

                            payment() : string | ZalgoPromise<string> {
                                return ZalgoPromise.try(() => {
                                    return generateECToken();
                                });
                            },

                            onAuthorize() : void {
                                return done();
                            },

                            onCancel() : void {
                                return done(new Error('Expected onCancel to not be called'));
                            }
                        })
                    );
                }
            });

            let container = document.createElement('div');

            if (!document.body) {
                throw new Error('Could not find document body');
            }

            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with React with a non-zalgo promise in payment and click on the button, then complete the payment', (done) => {

            let Main = window.React.createClass({

                render() : Object {

                    window.__test__ = { flow, action: 'checkout' };

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(window.paypal.Button.react, {

                            payment() : string | ZalgoPromise<string> {
                                // $FlowFixMe
                                return {
                                    then(successHandler) {
                                        successHandler(generateECToken());
                                    }
                                };
                            },

                            onAuthorize() : void {
                                return done();
                            },

                            onCancel() : void {
                                return done(new Error('Expected onCancel to not be called'));
                            }
                        })
                    );
                }
            });

            let container = document.createElement('div');

            if (!document.body) {
                throw new Error('Could not find document body');
            }

            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with Angular and click on the button, then complete the payment', done => {

            let injector = window.angular.element(document.body).injector();
            let $compile = injector.get('$compile');
            let $rootScope = injector.get('$rootScope');

            let $scope = $rootScope.$new();

            window.__test__ = { flow, action: 'checkout' };

            $scope.opts = {

                payment() : string | ZalgoPromise<string> {
                    return generateECToken();
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }
            };

            let template = `
                <paypal-button on-render="opts.onRender" payment="opts.payment" on-authorize="opts.onAuthorize" on-cancel="opts.onCancel"></test-component>
            `;

            $compile(template)($scope, element => {

                if (!document.body) {
                    throw new Error('Could not find document body');
                }

                document.body.appendChild(element[0]);
            });
        });

        it('should render a button into a container with Angular with a promise in payment and click on the button, then complete the payment', done => {

            let injector = window.angular.element(document.body).injector();
            let $compile = injector.get('$compile');
            let $rootScope = injector.get('$rootScope');

            let $scope = $rootScope.$new();

            window.__test__ = { flow, action: 'checkout' };

            $scope.opts = {

                payment() : string | ZalgoPromise<string> {
                    return ZalgoPromise.try(() => {
                        return generateECToken();
                    });
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }
            };

            let template = `
                <paypal-button on-render="opts.onRender" payment="opts.payment" on-authorize="opts.onAuthorize" on-cancel="opts.onCancel"></test-component>
            `;

            $compile(template)($scope, element => {

                if (!document.body) {
                    throw new Error('Could not find document body');
                }

                document.body.appendChild(element[0]);
            });
        });

        it('should render a button into a container with Angular with a non-zalgo promise in payment and click on the button, then complete the payment', done => {

            let injector = window.angular.element(document.body).injector();
            let $compile = injector.get('$compile');
            let $rootScope = injector.get('$rootScope');

            let $scope = $rootScope.$new();

            window.__test__ = { flow, action: 'checkout' };

            $scope.opts = {

                payment() : string | ZalgoPromise<string> {
                    // $FlowFixMe
                    return {
                        then(successHandler) {
                            successHandler(generateECToken());
                        }
                    };
                },

                onAuthorize() : void {
                    return done();
                },

                onCancel() : void {
                    return done(new Error('Expected onCancel to not be called'));
                }
            };

            let template = `
                <paypal-button on-render="opts.onRender" payment="opts.payment" on-authorize="opts.onAuthorize" on-cancel="opts.onCancel"></test-component>
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
