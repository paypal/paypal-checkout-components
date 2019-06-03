/* @flow */

import { prefix } from 'beaver-logger/client';

import { config } from '../config';
import { ENV } from '../constants';
import { getElements } from '../lib';

import { normalizeLocale } from './common';
import { LOG_PREFIX } from './constants';

const { info, warn } = prefix(LOG_PREFIX);

export function normalizeOptions(options : Object) {

    // Normalize environment

    if (options.environment) {

        if (options.environment === 'live') {
            options.environment = ENV.PRODUCTION;
        }

        if (!config.paypalUrls[options.environment]) {
            warn('invalid_env', { badenv: options.environment });
            options.environment = config.env;
        }
    }

    // If we're passed a single button in options.button, turn it into an array

    if (options.button && !Array.isArray(options.button)) {
        info(`options_button_single_button_passed`);

        options.button = [ options.button ];
    }

    // If we're passed an array of elements in options.buttons, switch it over to options.button

    if (options.buttons && getElements(options.buttons).length) {
        info(`options_buttons_with_elements_passed`);

        options.button = options.buttons;
        delete options.buttons;
    }

    // If we're passed an empty options.button array, clear the value

    if (options.button && options.button.length === 0) {
        info(`options_button_empty`);

        delete options.button;
    }

    // If we're passed options.button and options.container, concat both under button

    if (options.button && options.container) {
        info(`options_button_and_container_passed`, { button: options.button, container: options.container });

        options.button = options.button.concat(options.container);
        delete options.container;
    }

    // Normalize button selectors to elements

    if (options.button) {
        const button = getElements(options.button);

        if (button.length) {
            options.button = button;

        } else {
            warn(`options_button_element_not_found`, { element: JSON.stringify(options.button) });
            delete options.button;
        }
    }

    // Normalize options.button to options.buttons

    if (options.button) {

        options.buttons = options.button.map(button => {
            return {
                button,
                click:     options.click,
                condition: options.condition
            };
        });

        delete options.click;
        delete options.condition;
        delete options.button;
    }

    // Normalize array of buttons

    else if (options.buttons && Array.isArray(options.buttons)) {

        const buttons = [];

        options.buttons.forEach(button => {

            if (!button) {
                return;
            }

            if (button.container && button.container !== options.container) {
                warn(`mismatched_container_and_button_passed`, { options: options.container, button: button.container });
            }

            getElements(button.container || button.button).forEach(element => {
                buttons.push({

                    [ button.container ? 'container' : 'button' ]: element,

                    click:     button.click     || options.click,
                    condition: button.condition || options.condition,
                    type:      button.type      || options.type,
                    locale:    button.locale    || options.locale,
                    color:     button.color     || options.color,
                    shape:     button.shape     || options.shape,
                    size:      button.size      || options.size
                });
            });
        });

        delete options.buttons;
        delete options.click;
        delete options.condition;
        delete options.button;
        delete options.type;
        delete options.locale;
        delete options.color;
        delete options.shape;
        delete options.size;

        if (buttons.length) {
            options.buttons = buttons;
        }
    }

    // Otherwise normalize container into array of buttons

    else if (options.container && !Array.isArray(options.buttons)) {

        const buttons = [];

        getElements(options.container).forEach((container, i) => {
            buttons.push({
                container,
                click:     options.click,
                condition: options.condition,
                type:      Array.isArray(options.type)   ? options.type[i]   : options.type,
                locale:    Array.isArray(options.locale) ? options.locale[i] : options.locale,
                color:     Array.isArray(options.color)  ? options.color[i]  : options.color,
                shape:     Array.isArray(options.shape)  ? options.shape[i]  : options.shape,
                size:      Array.isArray(options.size)   ? options.size[i]   : options.size
            });
        });

        delete options.container;
        delete options.buttons;
        delete options.click;
        delete options.condition;
        delete options.button;
        delete options.type;
        delete options.locale;
        delete options.color;
        delete options.shape;
        delete options.size;

        if (buttons.length) {
            options.buttons = buttons;
        }
    }

    if (!options.buttons) {
        options.buttons = [];
    }
}

export function setupConfig(options : Object) {

    if (options.environment && config.paypalUrls[options.environment]) {
        config.env = options.environment;
    }

    if (options.locale) {
        config.locale = normalizeLocale(options.locale);
        config.customCountry = true;
    }
}
