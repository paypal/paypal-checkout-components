
try {

    let props = window.paypal.Checkout.props;

    props.style = props.style || { type: 'object', required: false };
    props.fundingSource = props.fundingSource || { type: 'string', required: false };
    
} catch (err) {
    // pass
}