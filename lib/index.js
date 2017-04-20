
import Bluebird from 'bluebird';
import Handlebars from 'handlebars';
import fs from 'fs';
import { componentTemplate } from 'paypal-checkout/src/components/button/templates/component/index';

let readFile = Bluebird.promisify(fs.readFile);

module.exports = async function renderer(path) {

    let template = await readFile(path, { encoding: 'utf8' });
    template = Handlebars.compile(template);

    return (ctx, req) => {

        ctx.button = componentTemplate({
            props: {
                locale: req.query['locale.x'] || 'en_US',

                style: {
                    size: req.query['style.size'],
                    color: req.query['style.color'],
                    shape: req.query['style.shape'],
                    label: req.query['style.label']
                }
            }
        });

        return template(ctx, req);
    };
};
