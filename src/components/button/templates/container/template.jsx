/* @flow */
/* @jsx jsxDom */

type ContainerTemplateOptions = {
    id : string,
    props : Object,
    CLASS : Object,
    dimensions : {
        width : number,
        height : number
    },
    tag : string,
    context : string,
    outlet : HTMLElement,
    jsxDom : Function
};

function getInitialHeight(width, fundingIcons = false) : ?string {
    if (width) {
        if (fundingIcons) {
            if (width < 200) {
                return '65px';
            } else if (width < 300) {
                return '75px';
            } else {
                return '85px';
            }
        } else {
            if (width < 200) {
                return '42px';
            } else if (width < 300) {
                return '48px';
            } else {
                return '60px';
            }
        }
    }
}

export function containerTemplate({ id, props, CLASS, dimensions, tag, context, outlet, jsxDom } : ContainerTemplateOptions) : HTMLElement {

    let style = props.style || {};
    let label = style.label || 'checkout';
    let size = style.size || 'small';
    let fundingIcons = props.style.fundingicons || false;

    let sizes = fundingIcons

        ? {
            small: {
                width: '148px',
                height: '65px'
            },
            medium: {
                width: '230px',
                height: '75px'
            },
            large: {
                width: '380px',
                height: '85px'
            }
        }

        : {
            small: {
                width: '148px',
                height: '42px'
            },
            medium: {
                width: '230px',
                height: '48px'
            },
            large: {
                width: '380px',
                height: '60px'
            }
        };

    let defaultSize = sizes.small;

    let minWidth = sizes.small.width;
    let maxWidth = '500px';

    let initialHeight = getInitialHeight(dimensions.width, fundingIcons) || sizes.small.height;

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
                        min-width: ${ minWidth };
                        max-width: ${ maxWidth };
                    }

                    #${ id },
                    #${ id } > .${ CLASS.OUTLET },
                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-height: ${ sizes.small.height };
                        max-height: ${ sizes.large.height };
                    }

                    #${ id } > .${ CLASS.OUTLET } {
                        width:  ${ defaultSize.width };
                        height: ${ defaultSize.height };
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
                        width: 100%;
                        height: ${ initialHeight }
                    }

                    #${ id } > .${ CLASS.OUTLET } > iframe {
                        min-width: 100%;
                        max-width: 100%;
                        width: ${ defaultSize.width };
                        height: 100%;
                    }
                `}
            </style>

            { outlet }
        </div>
    );
}
