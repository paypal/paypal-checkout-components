/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

function getComponentScript() : () => void {

    /* istanbul ignore next */
    return () => {

        const STYLE = {
            BLOCK:        'block',
            INLINE_BLOCK: 'inline-block',
            NONE:         'none',
            VISIBLE:      'visible',
            HIDDEN:       'hidden'
        };

        const SELECTOR = {
            IMG:      'img',
            OPTIONAL: '[optional]'
        };

        function getElements(selector, parent) : $ReadOnlyArray<HTMLElement> {
            parent = parent || document;
            return Array.prototype.slice.call(parent.querySelectorAll(selector));
        }

        function showElement(el : HTMLElement, displayType : string = STYLE.INLINE_BLOCK) {
            el.style.display = displayType;
        }

        function hideElement(el : HTMLElement) {
            el.style.display = STYLE.NONE;
        }

        function makeElementVisible(el : HTMLElement) {
            el.style.visibility = STYLE.VISIBLE;
        }

        function makeElementInvisible(el : HTMLElement) {
            el.style.visibility = STYLE.HIDDEN;
        }

        function hasDimensions(el : HTMLElement) : boolean {
            const rect = el.getBoundingClientRect();
            return Boolean(rect.height && rect.width);
        }

        function isHidden(el : HTMLElement) : boolean {
            const computedStyle = window.getComputedStyle(el);
            return (!computedStyle || computedStyle.display === STYLE.NONE);
        }

        function displayedElementsHaveDimensions(elements : $ReadOnlyArray<HTMLElement>) : boolean {
            return elements.every(el => {
                return hasDimensions(el) || isHidden(el);
            });
        }

        function onDisplay(elements, method) {
            if (displayedElementsHaveDimensions(elements)) {
                method();
                return;
            }

            const interval = setInterval(() => {
                if (displayedElementsHaveDimensions(elements)) {
                    clearInterval(interval);
                    method();
                }
            }, 5);
        }

        function pxToInt(val : string | number) : number {
            if (typeof val === 'number') {
                return val;
            }
            const match = val.match(/^([0-9]+)px$/);
            if (!match) {
                throw new Error(`Could not match css value from ${  val }`);
            }
            return parseInt(match[1], 10);
        }

        function unique<T>(arr : $ReadOnlyArray<T>) : $ReadOnlyArray<T> {
            const result = [];

            for (const el of arr) {
                if (result.indexOf(el) === -1) {
                    result.push(el);
                }
            }

            return result;
        }

        function isOverflowing(el : HTMLElement) : boolean {

            if (!el.offsetWidth || !el.offsetHeight) {
                return false;
            }

            if (el.offsetWidth < el.scrollWidth || el.offsetHeight < el.scrollHeight) {
                return true;
            }

            const parent = el.parentNode;

            if (!parent) {
                return false;
            }

            let { top: elementTop, bottom: elementBottom, left: elementLeft, right: elementRight } = el.getBoundingClientRect();
            // $FlowFixMe
            const { top: containerTop, bottom: containerBottom, left: containerLeft, right: containerRight } = parent.getBoundingClientRect();
            const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
            
            const { paddingTop: elementPaddingTop, paddingLeft: elementPaddingLeft, paddingRight: elementPaddingRight, paddingBottom: elementPaddingBottom } = window.getComputedStyle(el);
            elementTop += pxToInt(elementPaddingTop);
            elementLeft += pxToInt(elementPaddingLeft);
            elementRight += pxToInt(elementPaddingRight);
            elementBottom += pxToInt(elementPaddingBottom);

            if (elementTop < containerTop || elementLeft < containerLeft || elementRight > containerRight || elementBottom > containerBottom) {
                return true;
            }

            if (elementTop < 0 || elementTop < 0 || elementRight > windowWidth || elementBottom > windowHeight) {
                return true;
            }

            return false;
        }

        const allImages = getElements(SELECTOR.IMG);
        const optionals = getElements(SELECTOR.OPTIONAL);
        const optionalParents = unique(optionals.map(optional => optional.parentElement).filter(Boolean));

        function toggleOptionals() {
            optionalParents.forEach(optionalParent => {
                const parentChildren = Array.prototype.slice.call(optionalParent.children);
                const optionalChildren = getElements(SELECTOR.OPTIONAL, optionalParent);

                parentChildren.forEach(el => showElement(el));

                if (parentChildren.some(isOverflowing)) {
                    optionalChildren.forEach(hideElement);
                    optionalChildren.forEach(makeElementInvisible);
                } else {
                    optionalChildren.forEach(makeElementVisible);
                }
            });
        }

        toggleOptionals();

        onDisplay(allImages, () => {
            allImages.forEach(makeElementVisible);
            toggleOptionals();

            document.addEventListener('DOMContentLoaded', toggleOptionals);
            window.addEventListener('load', toggleOptionals);
            window.addEventListener('resize', toggleOptionals);
        });
    };
}

type ScriptProps = {|
    nonce : ?string
|};

export function Script({ nonce } : ScriptProps) : ElementNode {
    return (
        <script nonce={ nonce } innerHTML={ `(${ getComponentScript().toString() })()` } />
    );
}
