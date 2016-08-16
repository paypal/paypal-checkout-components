
import { config } from '../config';
import { loadScript } from '../lib';
import { BUTTON_JS_URL } from './constants';
import { logDebug, logError } from './log';

let buttonJS;

function loadButtonJS() {

    if (buttonJS) {
        return buttonJS;
    }

    logDebug(`buttonjs_load`);

    buttonJS = loadScript(BUTTON_JS_URL);

    return buttonJS.then(result => {
        logDebug(`buttonjs_load_success`);
        return result;
    }).catch(err => {
        logError(`buttonjs_load_error`, { error: err.stack || err.toString() });
        throw err;
    });
}

function renderButton(id, container, options) {

    let buttonDom = window.paypal.button.create(id, {
        lc:    options.locale || `${config.locale.lang}_${config.locale.country}`,
        color: options.color  || 'gold',
        shape: options.shape  || 'pill',
        size:  options.size   || 'small'
    }, {
        label: 'checkout',
        type: 'button'
    });

    document.getElementById(container).appendChild(buttonDom.el);

    return buttonDom.el.childNodes[0];
}

export function renderButtons(id, options) {

    return loadButtonJS().then(() => {

        let buttons = [];

        if (options.container) {

            if (options.container instanceof Array) {
                options.container.forEach(container => {
                    buttons.push({
                        el: renderButton(id, container, options),
                        options
                    });
                });

            } else {
                buttons.push({
                    el: renderButton(id, options.container, options),
                    options
                });
            }
        }

        if (options.buttons instanceof Array) {

            options.buttons.forEach(button => {
                buttons.push({
                    el: renderButton(id, button.container, button),
                    options: button
                });
            });
        }

        return buttons;
    });
}
