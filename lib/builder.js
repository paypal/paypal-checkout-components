import BUTTON_CONTENT from './buttonContent.json';
import config from './buttonConfig';
import { getValidSize, getValidColor, getValidLabel, getValidLocale, getValidShape } from './validations';


/*  function getLogo pulls up a wordmark in the form
 * of an image for the PayPal checkout or credit
 * button. For the checkout button, the format is
 * wordmark + 'checkout'. For credit button, the
 * format is wordmark.
 */

function getLogo(label, size, color, locale) {

    let labelStr,
        theme,
        labelArr = [];

    labelStr = BUTTON_CONTENT[locale][label];

    if (label === 'credit') {
        theme = config.themes.blue_credit;
    }else if (label === 'pay') {
        theme = color === 'blue' ? config.themes.transparent_horizontal : config.themes.blue_horizontal;
    }else {
        theme = color === 'blue' ? config.themes.blue_checkout : config.themes.general;
    }

    labelStr = labelStr.split('$');

    labelStr.forEach(function (val) {
        if (val === 'wordmark') {
            labelArr.push(theme);
        } else if (val) {
            labelArr.push(`<span class="text">${val}</span>`);
        }
    });

    return labelArr.join('');
}

/* function getButtonConfig returns the actual
 * configurations of the button based of the
 * parameters passed. Also, makes a call to function
 * getLogo to get the logo depending on the label:
 * checkout or credit.
 */

export function getButtonConfig(req) {
    let size,
        color,
        shape,
        label,
        locale,
        buttonStyles;


    buttonStyles = {
        size: req.query['style.size'],
        label: req.query['style.label'],
        shape: req.query['style.shape']
    };

    buttonStyles.color = buttonStyles.label === 'credit' ? 'creditblue' : req.query['style.color'];

    let lc = req.query && req.query['locale.x'];


    size = getValidSize(buttonStyles && buttonStyles.size);
    color = getValidColor(buttonStyles && buttonStyles.color);
    shape = getValidShape(buttonStyles && buttonStyles.shape);
    label = getValidLabel(buttonStyles && buttonStyles.label);
    locale = getValidLocale(lc);

    let logo = getLogo(label, size, color, locale);

    let labelTag = label.concat('_tag');
    let labelTagStr = BUTTON_CONTENT[locale][labelTag];

    return {
        buttonConfig: {
            size: size,
            color: color,
            shape: shape,
            label: label,
            locale: locale,
            logo: logo,
            label_tag: labelTagStr
        }
    };
}
