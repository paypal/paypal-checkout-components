/* @flow */

export function componentScript() {

    function getElements(selector) : Array<HTMLElement> {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    /*

    function isShown(el : HTMLElement) : boolean {
        return window.getComputedStyle(el).display !== 'none';
    }

    function showElement(el, displayType) {
        el.style.display = displayType || 'block';
    }

    */

    function hideElement(el : HTMLElement) {
        el.style.display = 'none';
    }

    function makeElementVisible(el : HTMLElement) {
        el.style.visibility = 'visible';
    }

    /*

    function makeElementInvisible(el) {
        el.style.visibility = 'hidden';
    }

    */

    function hasDimensions(el) : boolean {
        let rect = el.getBoundingClientRect();
        return Boolean(rect.height && rect.width);
    }

    function onDisplay(elements, method) {
        if (elements.every(hasDimensions)) {
            method();
            return;
        }

        let interval = setInterval(() => {
            if (elements.every(hasDimensions)) {
                clearInterval(interval);
                method();
                return;
            }
        }, 5);
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

        if (e.left < 0 || e.top < 0 || (e.left + e.width) > window.innerWidth || (e.top + e.height) > window.innerHeight) {
            return true;
        }

        return false;
    }

    let images = getElements('.paypal-button-content .logo');
    let text = getElements('.paypal-button-content .text');
    let tagline = getElements('.paypal-button-tag-content');

    onDisplay(images, () => {

        images.forEach(makeElementVisible);

        if (tagline.some(isOverflowing)) {
            tagline.forEach(hideElement);
        } else {
            tagline.forEach(makeElementVisible);
        }

        if (images.some(isOverflowing) || text.some(isOverflowing)) {
            text.forEach(hideElement);
        } else {
            text.forEach(makeElementVisible);
        }
    });
}
