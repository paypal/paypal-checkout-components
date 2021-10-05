/* @flow */
/** @jsx node */

import { inlineMemoize, destroyElement, type EventEmitterType } from 'belter/src';
import { create, EVENT, type ZoidComponent } from 'zoid/src';
import { node, dom, type ChildType } from 'jsx-pragmatic/src';
import { getLogger, getPayPalDomainRegex, getPayPalDomain, getCSPNonce, getSDKMeta, getDebug, getEnv, getSessionID, getLocale, getClientID, getCorrelationID, getBuyerCountry } from '@paypal/sdk-client/src';
import { SpinnerPage } from '@paypal/common-components/src';

const CLASS = {
    VISIBLE:         'visible',
    INVISIBLE:       'invisible',
    COMPONENT_FRAME: 'component-frame',
    PRERENDER_FRAME: 'prerender-frame'
};

type QRCodeProps = {|
    qrPath : string,
    cspNonce : ?string
|};

export type QRCodeComponent = ZoidComponent<QRCodeProps>;

export function getQRCodeComponent() : QRCodeComponent {
    return inlineMemoize(getQRCodeComponent, () => {
        return create({
            tag:        'paypal-qr-modal',
            url:        ({ props }) => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__QRCODE__ }?${ props.qrPath }`,
            domain:     getPayPalDomainRegex(),
            dimensions: {
                width:  '100%',
                height: '100%'
            },
            logger:            getLogger(),
            prerenderTemplate: ({ doc, props, close }) => {
                const style = `
                #close {
                    position: absolute;
                    right: 16px;
                    top: 16px;
                    width: 16px;
                    height: 0;
                    opacity: 0.6;
                    z-index: 10;
                    padding: 0;
                    border: none;
                    cursor: pointer;
                }
                #close:hover {
                    opacity: 1;
                }
                #close:before, #close:after {
                    position: absolute;
                    left: 8px;
                    content: ' ';
                    height: 20px;
                    width: 2px;
                    background-color: #FFF;
                }
                #close:before {
                    transform: rotate(45deg);
                }
                #close:after {
                    transform: rotate(-45deg);
                }  
                `;
                return (
                    // $FlowFixMe - Types on the SpinnerPage are not using children as part of props
                    <SpinnerPage
                        nonce={ props.cspNonce }
                    >
                        <style innerHTML={ style } />

                        <button id="close" aria-label="close" role="button" type="button" onClick={ close } />
                    </SpinnerPage>
                    
                ).render(dom({ doc }));
            },

            containerTemplate: ({ frame, prerenderFrame, props, doc, uid, event }) => {
                if (!frame || !prerenderFrame) {
                    return;
                }

                const { cspNonce } = props;

                return (
                    <QRCodeContainer
                        uid={ uid }
                        cspNonce={ cspNonce }
                        event={ event }
                        frame={ frame }
                        prerenderFrame={ prerenderFrame }
                    />
                    
                ).render(dom({ doc }));
            },
            autoResize: {
                width:  true,
                height: true
            },
            attributes: {
                iframe: {
                    scrolling: 'no'
                }
            },
            props: {
                onEscapePath: {
                    type:     'function',
                    required: true
                },
                onSubmitFeedback: {
                    type:       'function',
                    required:   false
                },
                qrPath: {
                    type:       'string',
                    queryParam: true,
                    required:   true
                },
                cspNonce: {
                    type:       'string',
                    queryParam: false,
                    required:   false,
                    value:      getCSPNonce
                },
                debug: {
                    type:       'boolean',
                    value:      getDebug,
                    queryParam: true
                },
                state: {
                    type:       'string',
                    queryParam: false,
                    required:   false
                },
                errorText: {
                    type:       'string',
                    queryParam: false,
                    required:   false
                },
                sdkMeta: {
                    type:        'string',
                    queryParam:  true,
                    sendToChild: false,
                    value:       getSDKMeta
                },
                env: {
                    type:        'string',
                    queryParam:  true,
                    required:    false,
                    value:       getEnv
                },
                sessionID: {
                    type:        'string',
                    queryParam:  true,
                    required:    false,
                    value:       getSessionID
                },
                locale: {
                    type:        'object',
                    queryParam:  true,
                    required:    false,
                    value:       getLocale
                },
                clientID: {
                    type:         'string',
                    queryParam:   true,
                    required:     false,
                    value:        getClientID
                },
                sdkCorrelationID: {
                    type:       'string',
                    required:   false,
                    value:      getCorrelationID,
                    queryParam: true
                },
                buyerCountry: {
                    type:       'string',
                    queryParam: true,
                    required:   false,
                    value:      getBuyerCountry
                }
            }
        });
    });
}


export function QRCodeContainer({
    uid,
    frame,
    prerenderFrame,
    event,
    cspNonce
} : {|
    uid : string,
    frame : ?HTMLIFrameElement,
    prerenderFrame : ?HTMLIFrameElement,
    event : EventEmitterType,
    cspNonce? : ?string
|}) : ?ChildType {
    if (!frame || !prerenderFrame) {
        throw new Error(`Expected frame and prerenderframe`);
    }

    frame.classList.add(CLASS.COMPONENT_FRAME);
    prerenderFrame.classList.add(CLASS.PRERENDER_FRAME);

    frame.classList.add(CLASS.INVISIBLE);
    prerenderFrame.classList.add(CLASS.VISIBLE);

    event.on(EVENT.RENDERED, () => {
        prerenderFrame.classList.remove(CLASS.VISIBLE);
        prerenderFrame.classList.add(CLASS.INVISIBLE);

        frame.classList.remove(CLASS.INVISIBLE);
        frame.classList.add(CLASS.VISIBLE);

        // Close is now controlled by QRCard on smart-payment-buttons
        const closeButton = document.querySelector('#close');
        if (closeButton) {
            closeButton.remove();
        }

        setTimeout(() => {
            destroyElement(prerenderFrame);
        }, 1000);
    });

    return (
        <div id={ uid }>
            <style
                nonce={ cspNonce }
                innerHTML={ `
            * {
                box-sizing: border-box;
            }

            #${ uid } {
                display: flex;
                position: fixed;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 20000;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.4); 
            }
            #${ uid } iframe {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
            }
            #${ uid } iframe.invisible {
                display: none;
            }
            #qrModal {
                background: #2F3033;
                box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
                border-radius: 16px;                        
                width: 720px;
                height: 612px;  
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
            }
            #close {
                position: absolute;
                right: 16px;
                top: 16px;
                width: 16px;
                height: 16px;
                opacity: 0.6;
                z-index: 10;
            }
            #close:hover {
                opacity: 1;
            }
            #close:before, #close:after {
                position: absolute;
                left: 8px;
                content: ' ';
                height: 20px;
                width: 2px;
                background-color: #FFF;
            }
            #close:before {
                transform: rotate(45deg);
            }
            #close:after {
                transform: rotate(-45deg);
            }        
            ` } />
            <div id="qrModal">
                <node el={ prerenderFrame } />
                <node el={ frame } />
            </div>
                        
        </div>
    );
}
