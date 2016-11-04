
import { config } from '../config';
import { loadScript } from '../lib';
import { BUTTON_JS_URL } from './constants';
import { $logger } from './log';
import { getElements, getElement } from './util';

let buttonJS;

function loadButtonJS() {

    if (buttonJS) {
        return buttonJS;
    }

    $logger.debug(`buttonjs_load`);

    buttonJS = loadScript(BUTTON_JS_URL).catch(err => {
        $logger.info(`buttonjs_load_error_retry`, { error: err.stack || err.toString() });
        return loadScript(BUTTON_JS_URL);
    }).then(result => {
        $logger.debug(`buttonjs_load_success`);
        return result;
    }).catch(err => {
        $logger.error(`buttonjs_load_error`, { error: err.stack || err.toString() });
        throw err;
    });

    return buttonJS;
}

function renderButton(id, container, options, label) {

    let lc    = options.locale || `${config.locale.lang}_${config.locale.country}`;
    let color = options.color  || 'gold';
    let shape = options.shape  || 'pill';
    let size  = options.size   || 'small';

    let type = 'button';
    label = label || 'checkout';

    $logger.debug(`render_button_lc_${lc}`);
    $logger.debug(`render_button_color_${color}`);
    $logger.debug(`render_button_shape_${shape}`);
    $logger.debug(`render_button_size_${size}`);
    $logger.debug(`render_button_label_${label}`);

    let buttonDom = window.paypal.button.create(id, { lc, color, shape, size }, { type, label });
    container.appendChild(buttonDom.el);
    return buttonDom.el.childNodes[0];
}

export function renderButtons(id, options) {

    return loadButtonJS().then(() => {

        let buttons = [];

        if (options.buttons instanceof Array) {

            if (options.container) {
                for (let button of options.buttons) {
                    if (button.container && button.container !== options.container) {
                        $logger.warn(`mismatched_container_and_button_passed`, { options: options.container, button: button.container });
                    }
                }
            }

            for (let button of options.buttons) {
                if (button) {

                    button.click     = button.click || options.click;
                    button.condition = button.condition || options.condition;

                    if (button.button) {
                        let buttonEl = getElement(button.button);

                        if (!buttonEl) {
                            return $logger.warn(`button_custom_element_not_found`, { button: button.button });
                        }

                        buttons.push({
                            container: buttonEl,
                            button:    buttonEl,
                            click:     button.click,
                            condition: button.condition
                        });

                    } else if (button.container && button.container.length !== 0) {
                        let buttonContainerElements = getElements(button.container);

                        if (buttonContainerElements.length) {
                            buttonContainerElements.forEach(container => {

                                if (container.tagName && container.tagName.toLowerCase() === 'a') {
                                    $logger.warn(`container_a_tag`);
                                }

                                let buttonEl = renderButton(id, container, button, button.type);

                                buttons.push({
                                    container,
                                    button:    buttonEl,
                                    click:     button.click,
                                    condition: button.condition
                                });
                            });
                        } else {
                            $logger.warn(`button_container_not_found`, { container: JSON.stringify(button.container) });
                        }
                    } else {
                        $logger.warn(`button_container_not_passed`, { button: JSON.stringify(button) });
                    }
                }
            }

        } else if (options.container && options.container.length !== 0) {

            let labels;

            if (typeof options.type === 'string') {
                labels = [options.type];
            } else if (options.type instanceof Array) {
                labels = options.type;
            } else {
                labels = [];
            }

            let containerElements = getElements(options.container);

            if (containerElements.length) {
                containerElements.forEach((container, i) => {

                    if (container.tagName && container.tagName.toLowerCase() === 'a') {
                        $logger.warn(`container_a_tag`);
                    }

                    let buttonEl = renderButton(id, container, options, labels[i]);

                    buttons.push({
                        container,
                        button: buttonEl,
                        click: options.click,
                        condition: options.condition
                    });
                });
            } else {
                $logger.warn(`button_container_not_found`, { container: JSON.stringify(options.container) });
            }
        }

        return buttons;
    });
}
