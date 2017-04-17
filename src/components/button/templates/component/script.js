/* @flow */

export function componentScript() {

    function getElements(selector) : Array<HTMLElement> {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function isVisible(el : HTMLElement) : boolean {
        return el.style.display !== 'none';
    }

    function showElement(el, displayType) {
        el.style.display = displayType || 'block';
    }

    function hideElement(el : HTMLElement) {
        el.style.display = 'none';
    }

    function makeElementVisible(el : HTMLElement) {
        el.style.visibility = '';
    }

    function makeElementInvisible(el) {
        el.style.visibility = 'hidden';
    }

    function isOverflowing(el : HTMLElement) : boolean {

        if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) {
            return true;
        }

        let parent = el.parentNode;

        if (!parent) {
            return false;
        }

        let e = el.getBoundingClientRect();

        // $FlowFixMe
        let p = parent.getBoundingClientRect();

        if (e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom) {
            return true;
        }

        return false;
    }

    function hideIfOverflow(selector : string, displayType : string) {
        getElements(selector).forEach(el => {

            if (isVisible(el)) {
                if (isOverflowing(el)) {
                    return hideElement(el);
                }
                return;
            }

            makeElementInvisible(el);
            setTimeout(() => {
                showElement(el, displayType);

                if (isOverflowing(el)) {
                    hideElement(el);
                } else {
                    makeElementVisible(el);
                }
            }, 1);
        });
    }

    function hideOverflowElements() {
        hideIfOverflow('.paypal-button-tag-content', 'block');
        hideIfOverflow('.paypal-button-content .text', 'inline-block');

        getElements('.paypal-button-content img').forEach(img => {
            if (isOverflowing(img)) {
                getElements('.paypal-button-content .text').forEach(el => {
                    hideElement(el);
                });
            }
        });
    }

    hideOverflowElements();

    window.addEventListener('resize', hideOverflowElements);
    window.addEventListener('load', hideOverflowElements);
    document.addEventListener('DOMContentLoaded', hideOverflowElements);
}
