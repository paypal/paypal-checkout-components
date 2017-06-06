
import { componentTemplate } from 'paypal-checkout/src/components/button/templates/component/index';
import '../config/helper';
module.exports = (req, res) => {

    let style = {
        size: req.query['style.size'],
        color: req.query['style.color'],
        shape: req.query['style.shape'],
        label: req.query['style.label'],
        fundingicons: req.query['style.fundingicons'] === 'true',
        branding: req.query['style.branding'] === 'true'
    };

    let buttonHTML = componentTemplate({
        props: {
            locale: req.query['locale.x'] || 'en_US',
            style: style
        }
    });

    return {
        style: style,
        buttonHTML: buttonHTML
    };
};
