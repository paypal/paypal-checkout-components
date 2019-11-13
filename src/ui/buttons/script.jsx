/* @flow */
/** @jsx node */

import { node, type ElementNode } from 'jsx-pragmatic/src';

function getComponentScript() : () => void {

    /* istanbul ignore next */
    return () => {

        const ATTRIBUTE = {
            OPTIONAL: 'optional'
        };

        const STYLE = {
            BLOCK:        'block',
            INLINE_BLOCK: 'inline-block',
            NONE:         'none',
            VISIBLE:      'visible',
            HIDDEN:       'hidden'
        };

        const SELECTOR = {
            ALL:      '*',
            IMG:      'img',
            OPTIONAL: `[${ ATTRIBUTE.OPTIONAL }]`
        };

        // eslint-disable-next-line flowtype/no-mutable-array
        function toArray<T>(item) : Array<T> {
            return Array.prototype.slice.call(item);
        }

        function getElements(selector, parent) : $ReadOnlyArray<HTMLElement> {
            parent = parent || document;
            return toArray(parent.querySelectorAll(selector));
        }

        function showElement(el : HTMLElement) {
            el.style.display = '';
        }

        function hideElement(el : HTMLElement) {
            el.style.display = STYLE.NONE;
        }

        function makeElementVisible(el : HTMLElement) {
            el.style.visibility = '';
        }

        function makeElementInvisible(el : HTMLElement) {
            el.style.visibility = STYLE.HIDDEN;
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

        const optionalParents = unique(getElements(SELECTOR.OPTIONAL).map(optional => optional.parentElement).filter(Boolean));

        const children = optionalParents.map(optionalParent => {
            const allChildren = getElements(SELECTOR.ALL, optionalParent);

            const optionalChildren = toArray(getElements(SELECTOR.OPTIONAL, optionalParent)).sort((first, second) => {
                return parseInt(second.getAttribute(ATTRIBUTE.OPTIONAL) || 0, 10) - parseInt(first.getAttribute(ATTRIBUTE.OPTIONAL) || 0, 10);
            });

            return {
                allChildren,
                optionalChildren
            };
        });

        function toggleOptionals() {
            for (const { allChildren, optionalChildren } of children) {
                optionalChildren.forEach(showElement);

                for (const optionalChild of optionalChildren) {
                    if (allChildren.some(isOverflowing)) {
                        hideElement(optionalChild);
                        makeElementInvisible(optionalChild);
                    } else {
                        makeElementVisible(optionalChild);
                    }
                }
            }
        }

        toggleOptionals();

        document.addEventListener('DOMContentLoaded', toggleOptionals);
        window.addEventListener('load', toggleOptionals);
        window.addEventListener('resize', toggleOptionals);
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
