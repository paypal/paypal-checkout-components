/* @flow */

import paypal from 'src/index';

import { generateECToken, createTestContainer, destroyTestContainer } from '../common';

window.angular.module('app', ['paypal-button']);
window.angular.bootstrap(document.body, ['app']);

for (let flow of [ 'popup', 'lightbox' ]) {

    describe(`paypal button framework drivers on ${flow}`, () => {

        beforeEach(() => {
            createTestContainer();
            paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
        });

        afterEach(() => {
            destroyTestContainer();
            window.location.hash = '';
            paypal.Checkout.contexts.lightbox = false;
        });

        it('should render a button into a container with React and click on the button, then complete the payment', (done) => {

            let Main = window.React.createClass({

                render() : Object {

                    return window.React.createElement(
                        'div',
                        null,
                        window.React.createElement(paypal.Button.react, {

                            onEnter() {
                                this.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                                this.window.document.querySelector('button').click();
                            },

                            payment() : string | SyncPromise<string> {
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
            document.body.appendChild(container);

            window.ReactDOM.render(window.React.createElement(Main, null), container);
        });

        it('should render a button into a container with Angular and click on the button, then complete the payment', done => {

            let injector = window.angular.element(document.body).injector();
            let $compile = injector.get('$compile');
            let $rootScope = injector.get('$rootScope');

            let $scope = $rootScope.$new();

            $scope.opts = {

                onEnter() {
                    this.window.paypal.Checkout.contexts.lightbox = (flow === 'lightbox');
                    this.window.document.querySelector('button').click();
                },

                payment() : string | SyncPromise<string> {
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
                <paypal-button on-enter="opts.onEnter" payment="opts.payment" on-authorize="opts.onAuthorize" on-cancel="opts.onCancel"></test-component>
            `;

            $compile(template)($scope, element => {
                document.body.appendChild(element[0]);
            });
        });
    });

}
