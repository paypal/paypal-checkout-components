/* @flow */
/* @jsx jsxDom */

import { BUTTON_SIZE, BUTTON_LABEL } from '../../constants';

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

const MIN_WIDTH = 100;
const MAX_WIDTH = 500;

const BUTTON_SIZES = {
    [ BUTTON_SIZE.SMALL ]: {
        width:  '148px',
        height: '28px'
    },
    [ BUTTON_SIZE.MEDIUM ]: {
        width:  '230px',
        height: '34px'
    },
    [ BUTTON_SIZE.LARGE ]: {
        width:  '380px',
        height: '44px'
    }
};

const BUTTON_SIZES_WITH_TAGLINE = {
    [ BUTTON_SIZE.SMALL ]: {
        width:  BUTTON_SIZES[BUTTON_SIZE.SMALL].width,
        height: '42px'
    },
    [ BUTTON_SIZE.MEDIUM ]: {
        width:  BUTTON_SIZES[BUTTON_SIZE.MEDIUM].width,
        height: '48px'
    },
    [ BUTTON_SIZE.LARGE ]: {
        width:  BUTTON_SIZES[BUTTON_SIZE.LARGE].width,
        height: '60px'
    }
};

const BUTTON_SIZES_WITH_FUNDINGICONS = {
    [ BUTTON_SIZE.SMALL ]: {
        width:  BUTTON_SIZES[BUTTON_SIZE.SMALL].width,
        height: '65px'
    },
    [ BUTTON_SIZE.MEDIUM ]: {
        width:  BUTTON_SIZES[BUTTON_SIZE.MEDIUM].width,
        height: '75px'
    },
    [ BUTTON_SIZE.LARGE ]: {
        width:  BUTTON_SIZES[BUTTON_SIZE.LARGE].width,
        height: '85px'
    }
};

const RESPONSIVE_RANGES = {
    [ BUTTON_SIZE.SMALL ]:  [ 100, 200 ],
    [ BUTTON_SIZE.MEDIUM ]: [ 200, 300 ],
    [ BUTTON_SIZE.LARGE ]:  [ 300, 500 ]
};

function determineResponsiveSize(containerWidth = 0) : string {

    if (containerWidth < MIN_WIDTH) {
        return BUTTON_SIZE.SMALL;
    }

    if (containerWidth >= MAX_WIDTH) {
        return BUTTON_SIZE.LARGE;
    }

    for (let size of Object.keys(RESPONSIVE_RANGES)) {
        let [ min, max ] = RESPONSIVE_RANGES[size];

        if (containerWidth >= min && containerWidth < max) {
            return size;
        }
    }

    throw new Error(`Unable to calculate responsive size for width: ${ containerWidth }`);
}

function getSizes({ containerWidth, tagline, fundingicons }) : { [string] : { width : string, height : string } } {

    let sizes;

    if (fundingicons) {
        sizes = BUTTON_SIZES_WITH_FUNDINGICONS;
    } else if (tagline) {
        sizes = BUTTON_SIZES_WITH_TAGLINE;
    } else {
        sizes = BUTTON_SIZES;
    }

    let responsiveSize = determineResponsiveSize(containerWidth);

    return {
        ...sizes,
        [ BUTTON_SIZE.RESPONSIVE ]: {
            width: '100%',
            height: sizes[responsiveSize].height
        }
    };
}

export function containerTemplate({ id, props, CLASS, on, container, tag, context, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let style = props.style || {};

    let {
        label        = BUTTON_LABEL.CHECKOUT,
        size         = BUTTON_SIZE.SMALL,
        fundingicons = false,
        tagline      = true
    } = style;

    let sizes = getSizes({
        containerWidth: container.offsetWidth,
        fundingicons,
        tagline
    });

    if (size === BUTTON_SIZE.RESPONSIVE) {
        on('resize', () => {
            let newSizes = getSizes({
                containerWidth: container.offsetWidth,
                fundingicons,
                tagline
            });

            outlet.style.height = newSizes[BUTTON_SIZE.RESPONSIVE].height;
        });
    }

    return (
        <div id={ id } class={ `${ tag } ${ tag }-context-${ context } ${ tag }-label-${ label } ${ tag }-size-${ size }` }>

            <style>
                {`
                    #${ id } {
                        font-size: 0;
                        width: 100%;
                    }

                    #${ id }.paypal-button-size-${ BUTTON_SIZE.RESPONSIVE } {
                        text-align: center;
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        display: inline-block;
                        min-width: ${ MIN_WIDTH }px;
                        max-width: ${ MAX_WIDTH }px;
                        position: relative;
                    }

                    #${ id },
                    #${ id } > .${ CLASS.OUTLET },
                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-height: ${ sizes[BUTTON_SIZE.SMALL].height };
                        max-height: ${ sizes[BUTTON_SIZE.LARGE].height };
                    }

                    #${ id }.paypal-button-size-${ BUTTON_SIZE.SMALL } > .${ CLASS.OUTLET } {
                        width:  ${ sizes[BUTTON_SIZE.SMALL].width };
                        height: ${ sizes[BUTTON_SIZE.SMALL].height };
                    }

                    #${ id }.paypal-button-size-${ BUTTON_SIZE.MEDIUM } > .${ CLASS.OUTLET } {
                        width:  ${ sizes[BUTTON_SIZE.MEDIUM].width };
                        height: ${ sizes[BUTTON_SIZE.MEDIUM].height };
                    }

                    #${ id }.paypal-button-size-${ BUTTON_SIZE.LARGE } > .${ CLASS.OUTLET } {
                        width:  ${ sizes[BUTTON_SIZE.LARGE].width };
                        height: ${ sizes[BUTTON_SIZE.LARGE].height };
                    }

                    #${ id }.paypal-button-size-${ BUTTON_SIZE.RESPONSIVE } > .${ CLASS.OUTLET } {
                        width:  ${ sizes[BUTTON_SIZE.RESPONSIVE].width };
                        height: ${ sizes[BUTTON_SIZE.RESPONSIVE].height };
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-width: 100%;
                        max-width: 100%;
                        width: ${ sizes[BUTTON_SIZE.SMALL].width };
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

            { outlet }
        </div>
    );
}
