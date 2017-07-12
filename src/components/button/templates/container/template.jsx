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

    let initialHeight = getInitialHeight(dimensions.width, fundingIcons);

    let sizes = {
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

    let sizesWithFunding = {
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
    };

    let minWidth = sizes.small.width;
    let maxWidth = '500px';

    return (
        <div id={ id } class={ `${ tag } ${ tag }-context-${ context }` }>

            <style>
                {`
                    #${ id } {
                        font-size: 0;
                        width: 100%;
                        text-align: center;
                    }

                    #${ id } .paypal-button-parent {
                        min-height: 42px;
                        display: inline-block;
                        min-width: ${ minWidth };
                        max-width: ${ maxWidth };
                        width: 100%;
                    }

                    #${ id } .paypal-button-parent .${ CLASS.OUTLET } {
                        display: inline-block;
                        width: 100%;
                    }

                    #${ id } .paypal-button-parent iframe {
                        max-width: 100%;
                        min-width: 100%;
                        max-height: 100%;
                        min-height: 100%;
                    }

                    #${ id } .paypal-button-parent .${ CLASS.OUTLET },
                    #${ id } .paypal-button-parent-size-tiny .${ CLASS.OUTLET },
                    #${ id } .paypal-button-parent-size-small .${ CLASS.OUTLET } {
                        width:  ${ (fundingIcons ? sizesWithFunding : sizes).small.width };
                        height: ${ (fundingIcons ? sizesWithFunding : sizes).small.height };
                    }

                    #${ id } .paypal-button-parent-size-medium .${ CLASS.OUTLET } {
                        width:  ${ (fundingIcons ? sizesWithFunding : sizes).medium.width };
                        height: ${ (fundingIcons ? sizesWithFunding : sizes).medium.height };
                    }

                    #${ id } .paypal-button-parent-size-large .${ CLASS.OUTLET } {
                        width:  ${ (fundingIcons ? sizesWithFunding : sizes).large.width };
                        height: ${ (fundingIcons ? sizesWithFunding : sizes).large.height };
                    }

                    #${ id } .paypal-button-parent-size-responsive .${ CLASS.OUTLET } {
                        max-width: 100%;
                        min-width: 100%;
                        height: ${ initialHeight || sizes.small.height }
                    }
                `}
            </style>

            <div class={ `paypal-button-parent paypal-button-parent-label-${ label } paypal-button-parent-size-${ size }` }>
                { outlet }
            </div>
        </div>
    );
}
