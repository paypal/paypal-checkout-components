
import { componentTemplate } from 'paypal-checkout/src/components/button/templates/component/index';

module.exports = (req, res) => {
    return {
        buttonHTML: componentTemplate({
            props: {
                locale: req.query['locale.x'] || 'en_US',

                style: {
                    size: req.query['style.size'],
                    color: req.query['style.color'],
                    shape: req.query['style.shape'],
                    label: req.query['style.label']
                }
            }
        })
    };
};
