/* @flow */

export function containerTemplate({ id, props, CLASS } : { id : string, props : Object, CLASS : Object }) : string {

    let style = props.style || {};
    let label = style.label || 'checkout';
    let size = style.size || 'small';

    return `

        <style>
            #${id} {
                min-width: 148px;
                max-width: 500px;
                font-size: 0;
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
                width: 148px;
                height: 42px;
            }

            #${id} .paypal-button-parent-size-medium {
                width: 230px;
                height: 48px;
            }

            #${id} .paypal-button-parent-size-large {
                width: 380px;
                height: 60px;
            }

            #${id} .paypal-button-parent-size-responsive {
                max-width: 100%;
                min-width: 100%;
            }
        </style>

        <div class="paypal-button-parent paypal-button-parent-label-${ label } paypal-button-parent-size-${ size } ${ CLASS.ELEMENT }"></div>
    `;
}
