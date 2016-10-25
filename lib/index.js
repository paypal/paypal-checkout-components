import BUTTON_CONTENT from './buttonContent';
import _ from 'underscore';
import Bluebird from 'bluebird';
import Handlebars from 'handlebars';
import fs from 'fs';
import config from './buttonConfig';
import { getValidSize, getValidColor, getValidLabel, getValidLocale, getValidShape } from './validations';

let readFile = Bluebird.promisify(fs.readFile);


function getLogo(size, color, locale) {

    let checkoutStr = BUTTON_CONTENT[locale]['checkout']; // eslint-disable-line dot-notation
    let theme = color === 'blue' ? config.themes.blue : config.themes.general;


    checkoutStr = checkoutStr.split('$');

    let checkout = [];

    checkoutStr.forEach(function (val) {
        if (val === 'wordmark') {
            checkout.push(theme);
        } else if (val) {
            checkout.push(`<span>${val}</span>`);
        }
    });

    checkoutStr = checkout.join('');
    return size && size === 'tiny' ? theme : checkoutStr;
}

// exporting for testing purposes
export function getButtonConfig(req) {
    let size,
        color,
        shape,
        label,
        locale,
        buttonStyles;

    try {
        buttonStyles = req.query && req.query.buttonStyle && JSON.parse(req.query.buttonStyle);
    } catch (e) {
        // eslint-disable-line no-empty
    }

    let lc = req.query && req.query['locale.x'];


    size = getValidSize(buttonStyles && buttonStyles.size);
    color = getValidColor(buttonStyles && buttonStyles.color);
    shape = getValidShape(buttonStyles && buttonStyles.shape);
    label = getValidLabel(buttonStyles && buttonStyles.label);
    locale = getValidLocale(lc);

    let logo = getLogo(size, color, locale);
    let checkoutTagStr = BUTTON_CONTENT[locale]['checkout_tag']; // eslint-disable-line dot-notation

    return {
        buttonConfig: {
            size: size,
            color: color,
            shape: shape,
            label: label,
            locale: locale,
            logo: logo,
            checkout_tag: checkoutTagStr
        }
    };


}

export default async function renderer(path) {

    let template = await readFile(path, { encoding: 'utf8' });
    template = Handlebars.compile(template);

    return (ctx, req) => {

        _.extend(ctx, getButtonConfig(req));
        return template(ctx, req);
    };
}
