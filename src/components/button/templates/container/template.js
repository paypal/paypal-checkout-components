/* @flow */

type ContainerTemplateOptions = {
    id : string,
    props : Object,
    CLASS : Object,
    dimensions : {
        width : number,
        height : number
    }
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

export function containerTemplate({ id, props, CLASS, dimensions } : ContainerTemplateOptions) : string {

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

    return `

        <style>
            #${id} {

            }

            #${id} .paypal-button-container {
                font-size: 0;
                width: 100%;
                min-width: ${ minWidth };
                max-width: ${ maxWidth };
                display: inline-block;
            }

            #${id} .paypal-button-parent {
                display: inline-block;
            }

            #${id} .paypal-button-parent iframe {
                max-width: 100%;
                min-width: 100%;
                max-height: 100%;
                min-height: 100%;
            }

            #${id} .paypal-button-parent,
            #${id} .paypal-button-parent-size-tiny,
            #${id} .paypal-button-parent-size-small {
                width:  ${ (fundingIcons ? sizesWithFunding : sizes).small.width };
                height: ${ (fundingIcons ? sizesWithFunding : sizes).small.height };
            }

            #${id} .paypal-button-parent-size-medium {
                width:  ${ (fundingIcons ? sizesWithFunding : sizes).medium.width };
                height: ${ (fundingIcons ? sizesWithFunding : sizes).medium.height };
            }

            #${id} .paypal-button-parent-size-large {
                width:  ${ (fundingIcons ? sizesWithFunding : sizes).large.width };
                height: ${ (fundingIcons ? sizesWithFunding : sizes).large.height };
            }

            #${id} .paypal-button-parent-size-responsive {
                max-width: 100%;
                min-width: 100%;
                height: ${ initialHeight || sizes.small.height }
            }
        </style>

        <div class="paypal-button-container">
            <div class="paypal-button-parent paypal-button-parent-label-${ label } paypal-button-parent-size-${ size } ${ CLASS.ELEMENT }"></div>
        </div>
    `;
}
