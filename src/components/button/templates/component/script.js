/* @flow */

export let componentScript = `
    function componentScript() {

        function getElements(selector) {
            return Array.prototype.slice.call(document.querySelectorAll(selector));
        }

        function showElement(el, displayType) {
            el.style.display = displayType || 'block';
        }

        function hideElement(el) {
            el.style.display = 'none';
        }

        function makeElementVisible(el) {
            el.style.visibility = 'visible';
        }

        function makeElementInvisible(el) {
            el.style.visibility = 'hidden';
        }

        function hasDimensions(el) {
            var rect = el.getBoundingClientRect();
            return Boolean(rect.height && rect.width);
        }

        function onDisplay(elements, method) {
            if (elements.every(hasDimensions)) {
                method();
                return;
            }

            var interval = setInterval(function() {
                if (elements.every(hasDimensions)) {
                    clearInterval(interval);
                    method();
                    return;
                }
            }, 5);
        }

        function isOverflowing(el) {

            if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) {
                return true;
            }

            var parent = el.parentNode;

            if (!parent) {
                return false;
            }

            var e = el.getBoundingClientRect();

            // $FlowFixMe
            var p = parent.getBoundingClientRect();

            if (e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom) {
                return true;
            }

            if (e.left < 0 || e.top < 0 || (e.left + e.width) > window.innerWidth || (e.top + e.height) > window.innerHeight) {
                return true;
            }

            return false;
        }

        var images = getElements('.paypal-button-content .logo');
        var text = getElements('.paypal-button-content .text');
        var tagline = getElements('.paypal-button-tag-content');

        function toggleTagline() {
            if (tagline.some(isOverflowing)) {
                tagline.forEach(makeElementInvisible);
            } else {
                tagline.forEach(makeElementVisible);
            }
        }

        function showText() {
            text.forEach(function(el) { showElement(el, 'inline-block') });
        }

        function toggleText() {
            if (images.some(isOverflowing) || text.some(isOverflowing)) {
                text.forEach(hideElement);
            } else {
                text.forEach(makeElementVisible);
            }
        }

        onDisplay(images, function() {
            images.forEach(makeElementVisible);
            toggleTagline();
            toggleText();

            window.addEventListener('resize', function() {
                toggleTagline();
                showText();
                toggleText();
            });
        });
    }
`;
