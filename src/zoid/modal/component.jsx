/* @flow */
/** @jsx node */
/* eslint max-lines: 0 */

import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain } from '@paypal/sdk-client/src';
import { create, EVENT, type ZoidComponent } from 'zoid/src';
import { inlineMemoize, destroyElement, toCSS } from 'belter/src';
import { node, dom } from 'jsx-pragmatic/src';

import { type ModalProps } from './props';

const CLASS = {
    VISIBLE:   'visible',
    INVISIBLE: 'invisible'
};

export type ModalComponent = ZoidComponent<ModalProps>;

export function getModalComponent() : ModalComponent {
    return inlineMemoize(getModalComponent, () => {
        return create({
            tag:    'paypal-modal',
            url:    () => `${ getPayPalDomain() }${ window.__CHECKOUT_URI__ || __PAYPAL_CHECKOUT__.__URI__.__MODAL__ }`,
            domain: getPayPalDomainRegex(),

            dimensions: {
                width:  '100%',
                height: '100%'
            },

            logger: getLogger(),

            containerTemplate: ({ frame, prerenderFrame, props, doc, uid, event }) => {
                if (!frame || !prerenderFrame) {
                    return;
                }

                const { cspNonce } = props;

                prerenderFrame.classList.add(CLASS.VISIBLE);
                frame.classList.add(CLASS.INVISIBLE);
    
                event.on(EVENT.RENDERED, () => {
                    prerenderFrame.classList.remove(CLASS.VISIBLE);
                    prerenderFrame.classList.add(CLASS.INVISIBLE);
    
                    frame.classList.remove(CLASS.INVISIBLE);
                    frame.classList.add(CLASS.VISIBLE);
    
                    setTimeout(() => {
                        destroyElement(prerenderFrame);
                    }, 1);
                });

                const setupResize = (div) => {
                    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
                        if (typeof newWidth === 'number') {
                            div.style.width = toCSS(newWidth);
                        }

                        if (typeof newHeight === 'number') {
                            div.style.height = toCSS(newHeight);
                        }
                    });
                };

                return (
                    <div id={ uid } onRender={ setupResize }>
                        <style
                            nonce={ cspNonce }
                            innerHTML={ `
                                #${ uid } {
                                    display: block;
                                    position: fixed;
                                    width: 100%;
                                    height: 100%;
                                    top: 0;
                                    left: 0;
                                    z-index: 200000;
                                }

                                #${ uid } > iframe {
                                    display: inline-block;
                                    position: absolute;
                                    width: 100%;
                                    height: 100%;
                                    top: 0;
                                    left: 0;
                                    transition: opacity .2s ease-in-out;
                                }
                                #${ uid } > iframe.${ CLASS.INVISIBLE } {
                                    opacity: 0;
                                }
                                #${ uid } > iframe.${ CLASS.VISIBLE } {
                                    opacity: 1;
                                }
                            ` } />
                        <node el={ frame } />
                        <node el={ prerenderFrame } />
                    </div>
                ).render(dom({ doc }));
            },

            prerenderTemplate: () => {
                return null;
            },

            attributes: {
                iframe: {
                    scrolling: 'no'
                }
            },

            props: {
                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       getSDKMeta
                },
                
                clientID: {
                    type:       'string',
                    queryParam: true
                },
                
                orderID: {
                    type:       'string',
                    queryParam: true
                },

                customerID: {
                    type:       'string',
                    queryParam: true
                }
            }
        });
    });
}
