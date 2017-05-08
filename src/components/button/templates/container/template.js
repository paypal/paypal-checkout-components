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

function getInitialHeight(width) : ?string {
    if (width) {
        if (width < 200) {
            return '42px';
        } else if (width < 300) {
            return '48px';
        } else {
            return '60px';
        }
    }
}

export function containerTemplate({ id, props, CLASS, dimensions } : ContainerTemplateOptions) : string {

    let style = props.style || {};
    let label = style.label || 'checkout';
    let size = style.size || 'small';

    let initialHeight = getInitialHeight(dimensions.width);

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
                width:  ${ sizes.small.width };
                height: ${ sizes.small.height };
            }

            #${id} .paypal-button-parent-size-medium {
                width:  ${ sizes.medium.width };
                height: ${ sizes.medium.height };
            }

            #${id} .paypal-button-parent-size-large {
                width:  ${ sizes.large.width };
                height: ${ sizes.large.height };
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
