/* @flow */

export let componentScript = `
    function componentScript() {

        function getElements(selector, parent) {
            parent = parent || document;
            return Array.prototype.slice.call(parent.querySelectorAll(selector));
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

        function isHidden(el) {
            return (window.getComputedStyle(el).display === 'none');
        }

        function displayedElementsHaveDimensions(elements) {
            return elements.every(function(el) {
                return hasDimensions(el) || isHidden(el);
            });
        }

        function onDisplay(elements, method) {
            if (displayedElementsHaveDimensions(elements)) {
                method();
                return;
            }

            var interval = setInterval(function() {
                if (displayedElementsHaveDimensions(elements)) {
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
            var p = parent.getBoundingClientRect();

            if (e.top < p.top || e.left < p.left || e.right > p.right || e.bottom > p.bottom) {
                return true;
            }

            if (e.left < 0 || e.top < 0 || (e.left + e.width) > window.innerWidth || (e.top + e.height) > window.innerHeight) {
                return true;
            }

            return false;
        }

        var buttons = getElements('.paypal-button-content');
        var tagline = getElements('.paypal-tagline');

        function toggleTagline() {
            if (tagline.some(isOverflowing)) {
                tagline.forEach(makeElementInvisible);
            } else {
                tagline.forEach(makeElementVisible);
            }
        }

        buttons.forEach(function(button) {

            var images = getElements('.logo', button);
            var text   = getElements('.text', button);

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
        });
    }
`;
