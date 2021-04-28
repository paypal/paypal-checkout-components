/* @flow */
/** @jsx node */

// import { h, render, Fragment, Node } from 'preact';
//import { getBody } from '../util';
import {writeElementToWindow, memoize, inlineMemoize, destroyElement,toCSS, iframe } from 'belter/src';
import { create, EVENT, type ZoidComponent } from 'zoid/src';
import { node, dom } from 'jsx-pragmatic/src';
import {assertSameDomain} from 'cross-domain-utils/src';
import { getLogger, getPayPalDomainRegex, getSDKMeta, getPayPalDomain,getCSPNonce } from '@paypal/sdk-client/src';
// import { getLogger, getLocale, getClientID, getEnv, getIntent, getCommit, getVault, getDisableFunding, getDisableCard,
//     getMerchantID, getPayPalDomainRegex, getCurrency, getSDKMeta, getCSPNonce, getBuyerCountry, getClientAccessToken, getPlatform,
//     getPartnerAttributionID, getCorrelationID, getEnableThreeDomainSecure, getDebug, getComponents, getStageHost, getAPIStageHost, getPayPalDomain,
//     getUserIDToken, getClientMetadataID, getAmount, getEnableFunding, getStorageID, getUserExperienceFlow } from '@paypal/sdk-client/src';
// import { getModalComponent } from '@paypal/checkout-components/src/zoid/modal';\
// import {Modal} from '@paypal/checkout-components';
// import { QRCode } from './node-qrcode';
import { Overlay, SpinnerPage } from '@paypal/common-components/src';

// import type {ZoidComponentInstance, ZoidComponent} from '../../types';


// import type { CrossDomainWindowType, SameDomainWindowType } from 'cross-domain-utils/src';
// import { fragment } from 'typed-graphqlify';


const CLASS = {
    VISIBLE:   'visible',
    INVISIBLE: 'invisible'
};
// import {VenmoLogo} from '@paypal/sdk-logos';

type QRCodeProps = {
    qrPath : string,
    cspNonce : ?string,
    // window: SameDomainWindowType | ?CrossDomainWindowType,
    // targetElement : any,
    
};

export type QRCodeComponent = ZoidComponent<QRCodeProps>;

export function getQRCodeComponent() : QRCodeComponent {
//    return inlineMemoize(getQRCodeComponent, ()=>{

    return create({
        tag: 'paypal-qr-modal',
        url: ({ props }) => `${ getPayPalDomain() }${ __PAYPAL_CHECKOUT__.__URI__.__QRCODE__ }?${props.qrPath}`,
        domain: getPayPalDomainRegex(),
        dimensions: {
            width:  '100%',
            height: '100%'
        },
        logger: getLogger(),
        prerenderTemplate: () => {
            return null;
        },
        // prerenderTemplate: ({ doc, props }) => {
        //     return (
        //         <SpinnerPage
        //             nonce={ props.cspNonce }
        //         />
        //     ).render(dom({ doc }));
        // },

        containerTemplate: ({close,focus, frame, prerenderFrame, props, doc, uid, event }) => {
            if (!frame || !prerenderFrame) {
                return;
            }

            // event.on(EVENT.RENDERED, () => {
            //     var span = document.createElement('span');
            //     span.innerText = 'EVENT.RENDERED';
            //     document.body.appendChild(span);
            //     console.log('----');
            //     console.log('rendered');                
            // });

            // prerenderFrame.classList.add(CLASS.VISIBLE);
            // frame.classList.add(CLASS.INVISIBLE);
            
            event.on(EVENT.RENDER, () => {
                console.log('EVENT.RENDER');
                // debugger;
                // prerenderFrame.classList.add(CLASS.INVISIBLE);
                // // prerenderFrame.classList.remove(CLASS.VISIBLE);
                // alert('yooo');
                // 

                // // frame.classList.remove(CLASS.INVISIBLE);
                // // frame.classList.add(CLASS.VISIBLE);

                // setTimeout(() => {
                //     destroyElement(prerenderFrame);
                // }, 1);
            });
            

            
            // const onRenderFiredFrame = () => {
            //     console.log('zoid el.onLoad fired');                
            //     prerenderFrame.classList.add(CLASS.INVISIBLE);
            // }
            const { cspNonce,qrPath } = props;
 
            // #${ uid } > iframe.${ CLASS.INVISIBLE } {
            //     opacity: 0;
            // }
            // #${ uid } > iframe.${ CLASS.VISIBLE } {
            //     opacity: 1;
            // }

            // #${ uid } {
            //     display: flex;
            //     position: fixed;
            //     width: 100%;
            //     height: 100%;
            //     top: 0;
            //     left: 0;
            //     z-index: 200000;
            //     align-items: center;
            //     justify-content: center;
            // }
            // #${ uid } > iframe {
            //     display: inline-block;
            //     position: absolute;
            //         z-index: 20000;
            //     width: 100%;
            //     height: 100%;
            //     top: 0;
            //     left: 0;
            //     transition: opacity .2s ease-in-out;
            // }


            return (
                <div id={ uid }>
                    <style
                        nonce={ cspNonce }
                        innerHTML={ `
                        #${ uid } {
                            display: flex;
                            position: fixed;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            z-index: 200000;
                            align-items: center;
                            justify-content: center;
                        }
                        #${ uid } > iframe {
                            display: inline-block;
                            position: absolute;
                                z-index: 20000;
                            width: 100%;
                            height: 100%;
                            top: 0;
                            left: 0;
                            transition: opacity .2s ease-in-out;
                        }
                        `
                         } />
                        
                    <node el={ prerenderFrame }/>
                    <node el={ frame } />              
                </div>
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
            qrPath: {
                type:       'string',
                queryParam: true,
                required:   true,
            },
            cspNonce: {
                type:       'string',
                queryParam: false,
                required:   false,
            },
            // uid: {
            //     type:       'string',
            //     queryParam: true,
            //     required:   false
            // },
            // removePrerenderFrame: {
            //     type:       'function',
            //     queryParam: false,
            //     required:   true,
            //     value:      ()=>{destroyElement(this.prerenderFrame);}
            // }
        }
    });
}




    // });

/*
export function renderQRModal({ windowqrPath, cspNonce} : QRmodalProps) : ZoidComponentInstance {

    qrCode({ qrPath, cspNonce });

    qrCode.hide();
    qrCode.renderTo(window.xprops.getParent(), `document.body`);

    return qrCode;
}
*/



// export function preRenderQRModal({ props, components } : {| props : ButtonProps, components : Components |}) {
//     const { clientID, uid: containerUID } = props;
//     const { Menu } = components;

//     if (!clientID) {
//         return;
//     }
    
//     renderButtonSmartMenu({ containerUID, clientID, Menu });
// }




// { 
//     cspNonce, 
//     // window,
//     targetElement,
//     qrPath,
// } : QRmodalProps) : () => ZoidComponent = memoize(() => {

/*
    const qrPathString = qrPath || 'abce';
    // const logo = () => VenmoLogo
    // console.log('fired');
    // console.log(QRCodeDataURL());
    

    const content = ( <Fragment> 
        <style nonce={ cspNonce }> { style } </style>
        <div id="qr-modal">
            <div>
                <img src={QRCodeDataURL} alt="QR Code" />
                <h1>Venmo</h1>
            </div>
            <div id="instructions">To scan QT code, Open your Venmo App</div>
        </div> 
    </Fragment>);

    return render( content, targetElement )
*/

    /*
    const Page = () =>{

        return render(
            <Modal>
                <h1>QR CODE</h1>
                <p>
                    {`qrPath: ${qrPathString}`}
                </p>
            </Modal>
        )
    }
    */
        
/*
        return render (
        <Fragment>
        <style nonce={ cspNonce }>
            {`
                * {
                    box-sizing: border-box;
                }

                html, body {
                    background-color: pink !important;
                }

                body {
                    padding: 5px 20px;
                    display: inline-block;
                    width: 100%;
                }
            `}
        </style>
        <h1>QR CODE</h1>
        <p>
            {`qrPath: ${qrPathString}`}
        </p>
        </Fragment>
        
    )};
    // debugger;
    if (window){
        writeElementToWindow(assertSameDomain(window), Page());
    } else {
        //noo window :( 
    }
*/

// export function generateQRpage({cspNonce}){}

///=====

/*
                event.on(EVENT.RENDERED, () => {
                    debugger;
                    console.log('event.rendered')
                });
                event.on(EVENT.RENDER, () => {
                    debugger;
                    console.log('event.render')
                });

                return (
                    <Overlay
                        context={ 'iframe' }
                        focus= { focus }
                        close={ close }
                        event={ event }
                        frame={ frame }
                        prerenderFrame={ prerenderFrame }
                        autoResize={ true }
                        
                    />
                ).render(dom({ doc }));
*/                
/*
        <div id={ uid } onRender={ onRenderFired }>
            <style
                nonce={ cspNonce }
                innerHTML={ `

                                #${ uid } {
                                    display: flex;
                                    position: fixed;
                                    width: 100%;
                                    height: 100%;
                                    top: 0;
                                    left: 0;
                                    z-index: 200000;
                                    align-items: center;
                                    justify-content: center;
                                    background-color: blue;
                                    background-color: rgba(0, 0, 0, 0.4);
                                    font-family: sans-serif;
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
*/

/*
                // prerenderFrame.classList.add(CLASS.VISIBLE);
                // frame.classList.add(CLASS.INVISIBLE);
                // event.on(EVENT.RENDERED, () => {
                //     prerenderFrame.classList.remove(CLASS.VISIBLE);
                //     prerenderFrame.classList.add(CLASS.INVISIBLE);
    
                //     frame.classList.remove(CLASS.INVISIBLE);
                //     frame.classList.add(CLASS.VISIBLE);
    
                //     setTimeout(() => {
                //         destroyElement(prerenderFrame);
                //     }, 1);
                // });
                // const setupResize = (div) => {
                //     event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
                //         if (typeof newWidth === 'number') {
                //             div.style.width = toCSS(newWidth);
                //         }

                //         if (typeof newHeight === 'number') {
                //             div.style.height = toCSS(newHeight);
                //         }
                //     });
                // };


                // const qrPathString = qrPath || 'abce';

                const style = `
                    #qr-modal {
                        border: 1px solid #888C94;
                        border-radius: 8px;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                    }
                    #qr-modal h1 {
                        color: #0074DE;
                        text-align: center
                    }
                    #qr-modal > div {
                        padding: 24px;
                    }
                    #instructions {        
                        background-color: #F5F5F5;
                        align-self: flex-end;
                        width: 100%;
                        z-index: -1;
                    }
                `;

                let QRCodeDataURL;
                QRCode.toDataURL(qrPath, 
                    {
                        color: {
                            dark:"#0074DE",
                            light:"#FFFFFF"
                        } 
                    },
                    function(err,url) {
                    // console.log(url);
                        QRCodeDataURL = url; 
                    }
                );
                
                const onRenderFired = () => console.log('onRender fired');
                

                return (                    
                    <div id={ uid } onRender={ onRenderFired }>
                        <style
                            nonce={ cspNonce }
                            innerHTML={ style } 
                        />
                        <div id="qr-modal">
                            <div>
                                <img src={QRCodeDataURL} alt="QR Code" />
                                <h1>Venmo</h1>
                            </div>
                            <div id="instructions">To scan QT code, Open your Venmo App</div>
                        </div>                        
                    </div>
                ).render(dom({ doc }));
*/

//-----


    
                // prerenderFrame.classList.add(CLASS.VISIBLE);
                // frame.classList.add(CLASS.INVISIBLE);
/*    
                event.on(EVENT.RENDERED, () => {
                    alert('fired');
                    prerenderFrame.classList.remove(CLASS.VISIBLE);
                    prerenderFrame.classList.add(CLASS.INVISIBLE);
    
                    frame.classList.remove(CLASS.INVISIBLE);
                    frame.classList.add(CLASS.VISIBLE);
    
                    setTimeout(() => {
                        destroyElement(prerenderFrame);
                    }, 1);
                });
*/
/*
                const setupEvents = (div) => {
                    // prerenderFrame.classList.add(CLASS.VISIBLE);
                    // frame.classList.add(CLASS.VISIBLE);

                    // prerenderFrame.classList.remove(CLASS.VISIBLE);
                    // prerenderFrame.classList.add(CLASS.INVISIBLE);

                    event.on(EVENT.RESIZE, ({ width: newWidth, height: newHeight }) => {
                        alert('fired');
                        if (typeof newWidth === 'number') {
                            div.style.width = toCSS(newWidth);
                        }

                        if (typeof newHeight === 'number') {
                            div.style.height = toCSS(newHeight);
                        }
                    });

                    // event.on(EVENT.RENDERED, () => {
                    //     prerenderFrame.classList.remove(CLASS.VISIBLE);
                    //     prerenderFrame.classList.add(CLASS.INVISIBLE);
        
                    //     frame.classList.remove(CLASS.INVISIBLE);
                    //     frame.classList.add(CLASS.VISIBLE);
        
                    //     setTimeout(() => {
                    //         destroyElement(prerenderFrame);
                    //     }, 1);
                    // });

               };
*/               
//  onRender={ ()=>setupEvents }