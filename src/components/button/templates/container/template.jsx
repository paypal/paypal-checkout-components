/* @flow */
/* @jsx jsxDom */

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

const SIZE = {
    SMALL:      'small',
    MEDIUM:     'medium',
    LARGE:      'large',
    RESPONSIVE: 'responsive'
};

const MIN_WIDTH = 100;
const MAX_WIDTH = 500;

const BUTTON_SIZE = {
    [ SIZE.SMALL ]: {
        width:  '148px',
        height: '28px'
    },
    [ SIZE.MEDIUM ]: {
        width:  '230px',
        height: '34px'
    },
    [ SIZE.LARGE ]: {
        width:  '380px',
        height: '44px'
    }
};

const BUTTON_SIZE_WITH_TAGLINE = {
    [ SIZE.SMALL ]: {
        width:  BUTTON_SIZE[SIZE.SMALL].width,
        height: '42px'
    },
    [ SIZE.MEDIUM ]: {
        width:  BUTTON_SIZE[SIZE.MEDIUM].width,
        height: '48px'
    },
    [ SIZE.LARGE ]: {
        width:  BUTTON_SIZE[SIZE.LARGE].width,
        height: '60px'
    }
};

const BUTTON_SIZE_WITH_FUNDINGICONS = {
    [ SIZE.SMALL ]: {
        width:  BUTTON_SIZE[SIZE.SMALL].width,
        height: '65px'
    },
    [ SIZE.MEDIUM ]: {
        width:  BUTTON_SIZE[SIZE.MEDIUM].width,
        height: '75px'
    },
    [ SIZE.LARGE ]: {
        width:  BUTTON_SIZE[SIZE.LARGE].width,
        height: '85px'
    }
};

const RESPONSIVE_RANGES = {
    small:  [ 100, 200 ],
    medium: [ 200, 300 ],
    large:  [ 300, 500 ]
};

function determineResponsiveSize(containerWidth = 0) : string {

    if (containerWidth < MIN_WIDTH) {
        return SIZE.SMALL;
    }

    if (containerWidth >= MAX_WIDTH) {
        return SIZE.LARGE;
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
        sizes = BUTTON_SIZE_WITH_FUNDINGICONS;
    } else if (tagline) {
        sizes = BUTTON_SIZE_WITH_TAGLINE;
    } else {
        sizes = BUTTON_SIZE;
    }

    let responsiveSize = determineResponsiveSize(containerWidth);

    return {
        ...sizes,
        responsive: {
            width: '100%',
            height: sizes[responsiveSize].height
        }
    };
}

export function containerTemplate({ id, props, CLASS, on, container, tag, context, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let style = props.style || {};

    let {
        label        = 'checkout',
        size         = 'small',
        fundingicons = false,
        tagline      = true
    } = style;

    let sizes = getSizes({
        containerWidth: container.offsetWidth,
        fundingicons,
        tagline
    });

    if (size === SIZE.RESPONSIVE) {
        on('resize', () => {
            let newSizes = getSizes({
                containerWidth: container.offsetWidth,
                fundingicons,
                tagline
            });

            outlet.style.height = newSizes.responsive.height;
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

                    #${ id }.paypal-button-size-responsive {
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
                        min-height: ${ sizes.small.height };
                        max-height: ${ sizes.large.height };
                    }

                    #${ id }.paypal-button-size-tiny > .${ CLASS.OUTLET },
                    #${ id }.paypal-button-size-small > .${ CLASS.OUTLET } {
                        width:  ${ sizes.small.width };
                        height: ${ sizes.small.height };
                    }

                    #${ id }.paypal-button-size-medium > .${ CLASS.OUTLET } {
                        width:  ${ sizes.medium.width };
                        height: ${ sizes.medium.height };
                    }

                    #${ id }.paypal-button-size-large > .${ CLASS.OUTLET } {
                        width:  ${ sizes.large.width };
                        height: ${ sizes.large.height };
                    }

                    #${ id }.paypal-button-size-responsive > .${ CLASS.OUTLET } {
                        width:  ${ sizes.responsive.width };
                        height: ${ sizes.responsive.height };
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-width: 100%;
                        max-width: 100%;
                        width: ${ sizes.small.width };
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
