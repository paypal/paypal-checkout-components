/* @flow */
/** @jsx jsxDom */

import { BUTTON_SIZE, BUTTON_LAYOUT, ATTRIBUTE } from '../../constants';
import { getButtonConfig, BUTTON_STYLE } from '../config';
import { normalizeProps } from '../props';
import { values } from '../../lib/util';

type ContainerTemplateOptions = {
    id : string,
    props : Object,
    CLASS : Object,
    container : HTMLElement,
    tag : string,
    context : string,
    outlet : HTMLElement,
    jsxDom : Function,
    on : Function
};

export function containerTemplate({ id, props, CLASS, tag, context, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    const { size, label, layout, height: buttonHeight } = normalizeProps(props);

    let minimumSize = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'minimumVerticalSize' : 'minimumSize');
    let maximumSize = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'maximumVerticalSize' : 'maximumSize');

    if (buttonHeight) {
        const possibleSizes = values(BUTTON_SIZE).filter(possibleSize => {
            return BUTTON_STYLE[possibleSize] && buttonHeight &&
                BUTTON_STYLE[possibleSize].minHeight <= buttonHeight && BUTTON_STYLE[possibleSize].maxHeight >= buttonHeight;
        });

        possibleSizes.sort((sizeA : string, sizeB : string) : number => {
            return BUTTON_STYLE[sizeA].defaultWidth - BUTTON_STYLE[sizeB].defaultWidth;
        });

        minimumSize = possibleSizes[0];
        maximumSize = possibleSizes[possibleSizes.length - 1];
    }

    const { defaultWidth, defaultHeight } = BUTTON_STYLE[size] || BUTTON_STYLE[BUTTON_SIZE.SMALL];

    setTimeout(() => {
        outlet.style.transition = 'all 0.5s ease-in-out 0.3s';
    }, 3000);

    return (
        <div
            id={ id }
            class={ `${ tag } ${ tag }-context-${ context } ${ tag }-label-${ label } ${ tag }-size-${ size } ${ tag }-layout-${ layout }` }
            { ...({ [ATTRIBUTE.SMART_BUTTON_VERSION]: __PAYPAL_CHECKOUT__.__MINOR_VERSION__ }) }
        >
            <style>
                {`
                    #${ id } {
                        font-size: 0;
                        width: 100%;
                        overflow: hidden;
                        min-width: ${ BUTTON_STYLE[minimumSize].minWidth }px;
                    }

                    #${ id }.${ tag }-size-${ BUTTON_SIZE.RESPONSIVE } {
                        text-align: center;
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        display: inline-block;
                        min-width: ${ BUTTON_STYLE[minimumSize].minWidth }px;
                        max-width: ${ BUTTON_STYLE[maximumSize].maxWidth }px;
                        position: relative;
                    }

                    #${ id }.${ tag }-layout-${ BUTTON_LAYOUT.VERTICAL } > .${ CLASS.OUTLET } {
                        min-width: ${ BUTTON_STYLE[minimumSize].minWidth }px;
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        width:  ${ defaultWidth }px;
                        height: ${ defaultHeight }px;
                    }

                     #${ id }.${ tag }-size-${ BUTTON_SIZE.RESPONSIVE } > .${ CLASS.OUTLET } {
                        width: 100%;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-width: 100%;
                        max-width: 100%;
                        width: ${ BUTTON_STYLE[minimumSize].minWidth }px;
                        height: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.COMPONENT_FRAME } {
                        z-index: 100;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.PRERENDER_FRAME } {
                        transition: opacity .2s linear;
                        z-index: 200;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.VISIBLE } {
                        opacity: 1;
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe.${ CLASS.INVISIBLE } {
                        opacity: 0;
                        pointer-events: none;
                    }
                `}
            </style>
            {outlet}
        </div>
    );
}
