/* @flow */

import * as logger from 'beaver-logger/client';
import { ZalgoPromise } from 'zalgo-promise/src';

import { config, FPTI } from '../config';
import { loadScript, memoize, isElementVisible, getThrottle, checkpoint, stringifyError } from '../lib';
import { LOG_PREFIX } from './constants';
import { normalizeLocale } from './common';

let $logger = logger.prefix(LOG_PREFIX);

let loadButtonJS = memoize(() : ZalgoPromise<void> => {

    $logger.debug(`buttonjs_load`);

    return loadScript(config.buttonJSUrl).catch(err => {
        $logger.info(`buttonjs_load_error_retry`, { error: stringifyError(err) });
        return loadScript(config.buttonJSUrl);
    }).then(result => {
        $logger.debug(`buttonjs_load_success`);
        return result;
    }).catch(err => {
        $logger.error(`buttonjs_load_error`, { error: stringifyError(err) });
        throw err;
    });
});

function renderButton(id, { container, locale, type, color, shape, size }) : ZalgoPromise<HTMLElement> {

    return loadButtonJS().then(() => {

        checkpoint('render_html_button', { version: true });

        $logger.track({
            [ FPTI.KEY.STATE ]: FPTI.STATE.LOAD,
            [ FPTI.KEY.TRANSITION ]: FPTI.TRANSITION.BUTTON_RENDER,
            [ FPTI.KEY.BUTTON_TYPE ]: FPTI.BUTTON_TYPE.HTML
        });

        $logger.flush();

        if (locale) {
            let { country, lang } = normalizeLocale(locale);
            locale = `${lang}_${country}`;
        }

        locale = locale || `${config.locale.lang}_${config.locale.country}`;
        color  = color  || 'gold';
        shape  = shape  || 'pill';
        size   = size   || 'small';
        type   = type   || 'checkout';

        $logger.debug(`render_button_lc_${locale}`);
        $logger.debug(`render_button_color_${color}`);
        $logger.debug(`render_button_shape_${shape}`);
        $logger.debug(`render_button_size_${size}`);
        $logger.debug(`render_button_label_${type}`);

        let el = window.paypal.button.create(id, { lc: locale, color, shape, size }, { type: 'button', label: type }).el;
        container.appendChild(el);

        try {
            $logger.info(`in_page_button_${ isElementVisible(el) ? 'visible' : 'not_visible' }`);

        } catch (err) {
            // pass
        }

        let tagContent = el.querySelector('.paypal-button-tag-content');

        if (isElementVisible(el) && tagContent && tagContent.innerText &&
            tagContent.innerText.trim() && tagContent.innerText.trim() === 'The safer, easier way to pay') {

            let throttle = getThrottle('tag_content_v6', 5000);

            if (throttle.isEnabled()) {
                tagContent.textContent = '';
            }

            throttle.logStart();

            el.addEventListener('click', () => {
                throttle.logComplete();
            });
        }

        return el.childNodes[0];
    });
}

export function renderButtons(id : string, buttons : Array<Object>) : ZalgoPromise<Array<Object>> {

    return ZalgoPromise.all(buttons.map(button => {
        return ZalgoPromise.try(() => {

            if (button.container) {
                return renderButton(id, button);
            } else {
                return button.button;
            }

        }).then(element => {

            let container;
            let type;
            let condition = button.condition;
            let click     = button.click;

            if (button.container) {
                container = button.container;
                type      = FPTI.BUTTON_TYPE.HTML;
            } else {
                container = button.button;
                type      = FPTI.BUTTON_TYPE.CUSTOM;
            }

            return { container, element, type, condition, click };
        });
    }));
}

export function getHijackTargetElement(button : HTMLElement | HTMLButtonElement) : ?Element {

    // $FlowFixMe
    let form = button.form;

    if (form) {
        $logger.debug(`target_element_button_form`);
        return form;
    }

    let tagName = button.tagName && button.tagName.toLowerCase();

    if (tagName === 'a') {
        $logger.debug(`target_element_link`);
        return button;
    }

    let parentElement = button.parentElement;
    let parentTagName = parentElement && parentElement.tagName && parentElement.tagName.toLowerCase();

    if ((tagName === 'img' || tagName === 'button') && parentTagName === 'a') {
        $logger.debug(`target_element_parent_link`);
        return parentElement;
    }

    let grandparentElement = parentElement && parentElement.parentElement;
    let grandparentTagName = grandparentElement && grandparentElement.tagName && grandparentElement.tagName.toLowerCase();

    if (tagName === 'button' && grandparentTagName === 'a') {
        $logger.debug(`target_element_grandparent_link`);
        return button.parentElement && button.parentElement.parentElement;
    }
}
