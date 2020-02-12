/* @flow */

import { max, perc } from 'belter/src';

import { WALLET_SIZE_STYLE } from '../config';
import { CLASS } from '../constants';

export function walletResponsiveStyle({ height } : { height? : ?number }) : string {
    
    return Object.keys(WALLET_SIZE_STYLE).map(size => {
        
        const style = WALLET_SIZE_STYLE[size];
        const walletHeight = height || style.defaultHeight;
        
        return `

            @media only screen and (min-width: ${ style.minWidth }px) {
                .${ CLASS.WALLET_ITEM }  {
                    min-width: ${ style.minWidth }px;
                    max-width: ${ style.maxWidth }px;
                    font-size: ${ max(perc(walletHeight, 32), 10) }px;
                    white-space: nowrap;
                }
                .${ CLASS.WALLET_FI_ICON_CONTAINER } {
                    display: inline-block;
                    border: solid #0c67ff;
                    width:  10%;
                    height: ${ walletHeight }px;
                    vertical-align: top;
                    text-align: center;
                }
                .${ CLASS.WALLET_FI_ICON } {
                    max-height:100%;
                }

                .${ CLASS.WALLET_FI_DESCRIPTION_CONTAINER } {
                    width: 90%;
                    height: ${ walletHeight }px;
                    border: solid #0c67ff;
                    display: inline-block;
                    vertical-align: top;
                }

                .${ CLASS.WALLET_FI_NAME } {
                    font-size: .95em;
                    height: 50%;
                }
                .${ CLASS.WALLET_FI_DETAILS } {
                    height: 50%;
                    color: #6c7378;
                    font-size: .80em;
                }
            }
        `;
        
    }).join('\n');
}


