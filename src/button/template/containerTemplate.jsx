/* @flow */
/* @jsx jsxDom */

import { BUTTON_SIZE, BUTTON_LAYOUT, FUNDING } from '../../constants';
import { getButtonConfig, BUTTON_STYLE, BUTTON_RELATIVE_STYLE } from '../config';
import { normalizeProps } from '../props';
import { values, min, max, perc } from '../../lib/util';
import type { DimensionsType } from '../../types';

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

function determineResponsiveSize({ label, layout, width = 0 }) : string {

    let minimumSize = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'minimumVerticalSize' : 'minimumSize');
    let maximumSize = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'maximumVerticalSize' : 'maximumSize');

    if (width < BUTTON_STYLE[minimumSize].minWidth) {
        return minimumSize;
    }

    if (width >= BUTTON_STYLE[maximumSize].maxWidth) {
        return maximumSize;
    }

    for (let size of Object.keys(BUTTON_STYLE)) {
        let { minWidth, maxWidth } = BUTTON_STYLE[size];

        if (width >= minWidth && width < maxWidth) {
            return size;
        }
    }

    throw new Error(`Unable to calculate responsive size for width: ${ width }`);
}

function getDimensions({ label, size, tagline, fundingicons, layout, number, viewport, height: buttonHeight, cards, sources = [] }) : DimensionsType {

    if (size === BUTTON_SIZE.RESPONSIVE) {
        size = determineResponsiveSize({ label, layout, width: viewport.width, height: buttonHeight });
    }

    let { defaultWidth, defaultHeight, minHeight, maxHeight, allowFunding, allowTagline } = BUTTON_STYLE[size];

    buttonHeight = buttonHeight || min(max(defaultHeight, minHeight), maxHeight);

    let width = defaultWidth;
    let height = buttonHeight;

    if (fundingicons && allowFunding) {
        height += perc(buttonHeight, BUTTON_RELATIVE_STYLE.FUNDINGICONS);
    } else if (tagline && allowTagline) {
        height += perc(buttonHeight, BUTTON_RELATIVE_STYLE.TAGLINE);
    } else if (layout === BUTTON_LAYOUT.VERTICAL) {
        height = (buttonHeight * number) + (perc(buttonHeight, BUTTON_RELATIVE_STYLE.VERTICAL_MARGIN) * (number - 1));
    }

    const isCardFundingAllowed = sources.indexOf(FUNDING.CARD) >= 0;

    if (isCardFundingAllowed && (cards && cards.length > 0) && layout === BUTTON_LAYOUT.VERTICAL) {
        height += BUTTON_STYLE[size].byPayPalHeight;
    }

    return { width, height };
}

// eslint-disable-next-line no-unused-vars
export function containerTemplate({ id, props, CLASS, on, container, tag, context, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let { size, label, fundingicons, tagline, layout, sources, height: buttonHeight, cards } = normalizeProps(props);

    let getContainerDimensions = () => {
        let cont = container;

        while (cont.offsetWidth === 0 && cont.parentElement && cont.parentElement !== cont) {
            cont = cont.parentElement;
        }

        return getDimensions({
            // $FlowFixMe
            viewport: { width: cont.offsetWidth, height: cont.offsetHeight },
            number:   sources.length,
            height:   buttonHeight,
            label,
            size,
            fundingicons,
            tagline,
            layout,
            cards,
            sources
        });
    };

    let { width, height } = getContainerDimensions();

    if (size === BUTTON_SIZE.RESPONSIVE) {
        on('resize', () => {
            outlet.style.height = `${ getContainerDimensions().height }px`;
        });
    }

    let minimumSize = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'minimumVerticalSize' : 'minimumSize');
    let maximumSize = getButtonConfig(label, (layout === BUTTON_LAYOUT.VERTICAL) ? 'maximumVerticalSize' : 'maximumSize');

    if (buttonHeight) {
        let possibleSizes = values(BUTTON_SIZE).filter(possibleSize => {
            return BUTTON_STYLE[possibleSize] && buttonHeight &&
                BUTTON_STYLE[possibleSize].minHeight <= buttonHeight && BUTTON_STYLE[possibleSize].maxHeight >= buttonHeight;
        });

        possibleSizes.sort((sizeA : string, sizeB : string) : number => {
            return BUTTON_STYLE[sizeA].defaultWidth - BUTTON_STYLE[sizeB].defaultWidth;
        });

        minimumSize = possibleSizes[0];
        maximumSize = possibleSizes[possibleSizes.length - 1];
    }

    return (
        <div id={ id } class={ `${ tag } ${ tag }-context-${ context } ${ tag }-label-${ label } ${ tag }-size-${ size } ${ tag }-layout-${ layout }` }>

            <style>
                {`
                    #${ id } {
                        font-size: 0;
                        width: 100%;
                        overflow: hidden;
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
                        width:  ${ width }px;
                        height: ${ height }px;
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
