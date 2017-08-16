
import { componentTemplate } from 'paypal-checkout/src/components/button/templates/component/index';
import '../config/helper';

function strToBoolean(val) {

    if (val === 'true') {
        return true;
    }

    if (val === 'false') {
        return false;
    }
}

module.exports = (req, res) => {

    let style = {
        size:         req.query['style.size'],
        color:        req.query['style.color'],
        shape:        req.query['style.shape'],
        label:        req.query['style.label'],
        dual:         Boolean(req.cookies.pwv),
        fundingicons: strToBoolean(req.query['style.fundingicons']),
        branding:     strToBoolean(req.query['style.branding']),
        tagline:      strToBoolean(req.query['style.tagline'])
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
