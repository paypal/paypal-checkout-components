/* @flow */

export function getComponentScript() : () => void {

    /* istanbul ignore next */
    return () => {

        function getElements(selector, parent) : Array<HTMLElement> {
            parent = parent || document;
            return Array.prototype.slice.call(parent.querySelectorAll(selector));
        }

        function showElement(el : HTMLElement, displayType : ?string) {
            el.style.display = displayType || 'block';
        }

        function hideElement(el : HTMLElement) {
            el.style.display = 'none';
        }

        function makeElementVisible(el : HTMLElement) {
            el.style.visibility = 'visible';
        }

        function makeElementInvisible(el : HTMLElement) {
            el.style.visibility = 'hidden';
        }

        function hasDimensions(el : HTMLElement) : boolean {
            let rect = el.getBoundingClientRect();
            return Boolean(rect.height && rect.width);
        }

        function isHidden(el : HTMLElement) : boolean {
            let computedStyle = window.getComputedStyle(el);
            return (!computedStyle || computedStyle.display === 'none');
        }

        function displayedElementsHaveDimensions(elements : Array<HTMLElement>) : boolean {
            return elements.every(el => {
                return hasDimensions(el) || isHidden(el);
            });
        }

        function onDisplay(elements, method) {
            if (displayedElementsHaveDimensions(elements)) {
                method();
                return;
            }

            let interval = setInterval(() => {
                if (displayedElementsHaveDimensions(elements)) {
                    clearInterval(interval);
                    method();
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

        let buttons = getElements('.{ CLASS.BUTTON }');
        let tagline = getElements('.{ CLASS.TAGLINE }');

        function toggleTagline() {
            if (tagline.some(isOverflowing)) {
                tagline.forEach(makeElementInvisible);
            } else {
                tagline.forEach(makeElementVisible);
            }
        }

        buttons.forEach(button => {

            let images = getElements('.{ CLASS.LOGO }', button);
            let text   = getElements('.{ CLASS.TEXT }', button);

            function showText() {
                text.forEach(el => showElement(el, 'inline-block'));
            }

            function toggleText() {
                if (images.some(isOverflowing) || text.some(isOverflowing)) {
                    text.forEach(hideElement);
                } else {
                    text.forEach(makeElementVisible);
                }
            }

            onDisplay(images, () => {
                images.forEach(makeElementVisible);
                toggleTagline();
                toggleText();

                window.addEventListener('resize', () => {
                    toggleTagline();
                    showText();
                    toggleText();
                });
            });
        });

        /* eslint-disable flowtype/require-return-type, unicorn/catch-error-name */

        try {
            let val = window.setupButton;
            // $FlowFixMe
            Object.defineProperty(window, 'setupButton', {
                // $FlowFixMe
                get() {
                    return val;
                },
                set(value) {
                    val = function () {

                        try {

                            if (window.paypal && window.paypal.Promise) {
                                let resolve = window.paypal.Promise.prototype.resolve;
                                window.paypal.Promise.prototype.resolve = function res(obj) {
                                    try {
                                        if (obj && obj.responseHeaders) {
                                            obj.headers = obj.responseHeaders;
                                        }
                                    } catch (err2) {
                                        // pass
                                    }

                                    return resolve.apply(this, arguments);
                                };
                            }

                            if (window.paypal && window.paypal.Checkout && window.paypal.Checkout.props) {
                                let props = window.paypal.Checkout.props;

                                props.style = props.style || { type: 'object', required: false };
                                props.fundingSource = props.fundingSource || { type: 'string', required: false };
                            }

                        } catch (err3) {
                            // pass
                        }

                        return value.apply(this, arguments);
                    };
                }
            });

        } catch (err) {
            // pass
        }

        /* eslint-enable flowtype/require-return-type, unicorn/catch-error-name */
    };
}
