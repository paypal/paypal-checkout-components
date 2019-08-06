/* @flow */

import { prefix } from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config } from '../config';
import { FPTI, BUTTON_COLOR, BUTTON_SHAPE, BUTTON_SIZE, BUTTON_LABEL } from '../constants';
import { loadScript, memoize, isElementVisible, stringifyError } from '../lib';

import { LOG_PREFIX } from './constants';
import { normalizeLocale } from './common';

const { info, debug, error } = prefix(LOG_PREFIX);

const loadButtonJS = memoize(() : ZalgoPromise<void> => {

    debug(`buttonjs_load`);

    return loadScript(config.buttonJSUrl).catch(err => {
        info(`buttonjs_load_error_retry`, { error: stringifyError(err) });
        return loadScript(config.buttonJSUrl);
    }).then(result => {
        debug(`buttonjs_load_success`);
        return result;
    }).catch(err => {
        error(`buttonjs_load_error`, { error: stringifyError(err) });
        throw err;
    });
});

function renderButton(id, { container, locale, type, color, shape, size }) : ZalgoPromise<HTMLElement> {

    return loadButtonJS().then(() => {

        if (locale) {
            const { country, lang } = normalizeLocale(locale);
            locale = `${ lang }_${ country }`;
        }

        locale = locale || `${ config.locale.lang }_${ config.locale.country }`;
        color  = color  || BUTTON_COLOR.GOLD;
        shape  = shape  || BUTTON_SHAPE.PILL;
        size   = size   || BUTTON_SIZE.SMALL;
        type   = type   || BUTTON_LABEL.CHECKOUT;

        debug(`render_button_lc_${ locale }`);
        debug(`render_button_color_${ color }`);
        debug(`render_button_shape_${ shape }`);
        debug(`render_button_size_${ size }`);
        debug(`render_button_label_${ type }`);

        const el = window.paypal.button.create(id, { lc: locale, color, shape, size }, { type: 'button', label: type }).el;
        container.appendChild(el);

        try {
            info(`in_page_button_${ isElementVisible(el) ? 'visible' : 'not_visible' }`);

        } catch (err) {
            // pass
        }

        return el.childNodes[0];
    });
}

// eslint-disable-next-line flowtype/no-mutable-array
export function renderButtons(id : string, buttons : Array<Object>) : ZalgoPromise<Array<Object>> {

    return ZalgoPromise.map(buttons, button => {
        return ZalgoPromise.try(() => {

            if (button.container) {
                return renderButton(id, button);
            } else {
                return button.button;
            }

        }).then(element => {

            let container;
            let type;
            const condition = button.condition;
            const click     = button.click;

            if (button.container) {
                container = button.container;
                type      = FPTI.BUTTON_TYPE.HTML;
            } else {
                container = button.button;
                type      = FPTI.BUTTON_TYPE.CUSTOM;
            }

            return { container, element, type, condition, click };
        });
    });
}

export function getHijackTargetElement(button : HTMLElement | HTMLButtonElement) : ?HTMLElement {

    // $FlowFixMe
    const form = button.form;

    if (form) {
        debug(`target_element_button_form`);
        return form;
    }

    const tagName = button.tagName && button.tagName.toLowerCase();

    if (tagName === 'a') {
        debug(`target_element_link`);
        return button;
    }

    const parentElement = button.parentElement;
    const parentTagName = parentElement && parentElement.tagName && parentElement.tagName.toLowerCase();

    if ((tagName === 'img' || tagName === 'button') && parentTagName === 'a') {
        debug(`target_element_parent_link`);
        // $FlowFixMe
        return parentElement;
    }

    const grandparentElement = parentElement && parentElement.parentElement;
    const grandparentTagName = grandparentElement && grandparentElement.tagName && grandparentElement.tagName.toLowerCase();

    if (tagName === 'button' && grandparentTagName === 'a') {
        debug(`target_element_grandparent_link`);
        // $FlowFixMe
        return button.parentElement && button.parentElement.parentElement;
    }
}
