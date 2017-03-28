
export let containerTemplate = (ctx = {}) => `

    <style>
        .paypal-button-parent {
            font-size: 0;
        }
        
        .paypal-button-parent.paypal-button-parent-label-checkout {
            min-width: 80px;
        }
        
        .paypal-button-parent.paypal-button-parent-label-credit {
            min-width: 148px;
        }
    </style>

    <div class="paypal-button-parent paypal-button-parent-label-${ ctx.props.style && ctx.props.style.label || 'checkout' } ${ ctx.CLASS.ELEMENT }"></div>
    
`;
