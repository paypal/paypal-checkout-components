/* @flow */

export function getComponentScript() : () => void {

    /* istanbul ignore next */
    return () => {
        const ATTRIBUTE = {
            OPTIONAL: 'optional'
        };
    
        const CLASS = {
            HIDDEN:    'hidden',
            DOM_READY: 'dom-ready'
        };
    
        const SELECTOR = {
            ALL:      '*',
            OPTIONAL: `[${ ATTRIBUTE.OPTIONAL }]`
        };
    
        const TAG = {
            STYLE: 'style'
        };
    
        function once(handler : Function) : Function {
            let called = false;
            return (...args) => {
                if (!called) {
                    called = true;
                    handler(...args);
                }
            };
        }
    
        function debounce(handler : Function, time : number = 50) : Function {
            let timeout;
            return (...args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    handler(...args);
                }, time);
            };
        }
    
        // eslint-disable-next-line flowtype/no-mutable-array
        function toArray<T>(item) : Array<T> {
            return Array.prototype.slice.call(item);
        }
    
        function getElements(selector, parent) : $ReadOnlyArray<HTMLElement> {
            parent = parent || document;
            return toArray(parent.querySelectorAll(selector)).filter(el => {
                return el.tagName.toLowerCase() !== TAG.STYLE;
            });
        }
    
        function getParent(element : HTMLElement) : HTMLElement {
            // $FlowFixMe
            return element.parentElement;
        }
    
        function showElement(el : HTMLElement) {
            el.classList.remove(CLASS.HIDDEN);
        }
    
        function hideElement(el : HTMLElement) {
            el.classList.add(CLASS.HIDDEN);
        }
    
        function sum(arr : $ReadOnlyArray<number>) : number {
            let result = 0;
            for (const item of arr) {
                result += item;
            }
            return result;
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
    
        function getAllChildren(element : HTMLElement) : $ReadOnlyArray<HTMLElement> {
            return getElements(SELECTOR.ALL, element);
        }
    
        function getOptionalIndex(element : HTMLElement) : number {
            return parseInt(element.getAttribute(ATTRIBUTE.OPTIONAL) || 0, 10);
        }
    
        function getElementsTotalWidth(elements : $ReadOnlyArray<HTMLElement>) : number {
            return sum(elements.map(child => child.offsetWidth));
        }
    
        function getOptionalParents() : $ReadOnlyArray<HTMLElement> {
            const optional = [ ...getElements(SELECTOR.OPTIONAL), ...getElements('.{ CLASS.FUNDINGICONS } .{ CLASS.CARD }'), ...getElements('.{ CLASS.BUTTON }-label-credit .{ CLASS.BUTTON }-logo-paypal') ];
            return unique(optional.map(getParent).filter(Boolean));
        }
    
        function getOptionalChildren(parent : HTMLElement) : $ReadOnlyArray<HTMLElement> {
            return toArray(getElements(SELECTOR.OPTIONAL, parent)).sort((first, second) => {
                return getOptionalIndex(first) - getOptionalIndex(second);
            });
        }
        
        const children = getOptionalParents().map(optionalParent => {
            const allChildren = getAllChildren(optionalParent);
            const optionalChildren = getOptionalChildren(optionalParent);
        
            return {
                optionalParent,
                allChildren,
                optionalChildren
            };
        });
        
        function toggleOptionals() {
            for (const { optionalParent, allChildren, optionalChildren } of children) {
                const parentWidth = optionalParent.offsetWidth;
                let usedWidth = getElementsTotalWidth(allChildren) - getElementsTotalWidth(optionalChildren);
        
                for (const optionalChild of optionalChildren) {
                    usedWidth += optionalChild.offsetWidth;
            
                    if (usedWidth > parentWidth) {
                        hideElement(optionalChild);
                    } else {
                        showElement(optionalChild);
                    }
                }
            }
        }

        function setupTabOutlineEvent() {
            const buttonsContainer = document.getElementsByClassName('{ CLASS.CONTAINER }')[0];
            const tabKeyCode = 9;

            function handleMouseDownOnce() {
                buttonsContainer.classList.remove('{ CLASS.SHOULD_FOCUS }');

                window.removeEventListener('mousedown', handleMouseDownOnce);
                window.addEventListener('keydown', handleFirstTab); // eslint-disable-line no-use-before-define
            }

            function handleFirstTab(e) {
                if (e.keyCode === tabKeyCode) {
                    buttonsContainer.classList.add('{ CLASS.SHOULD_FOCUS }');

                    window.removeEventListener('keydown', handleFirstTab);
                    window.addEventListener('mousedown', handleMouseDownOnce);
                }
            }

            buttonsContainer.classList.add('{ CLASS.SHOULD_FOCUS }');
            window.addEventListener('keydown', handleFirstTab);
        }
    
        const setDomReady = once(debounce(() => {
            window.addEventListener('resize', toggleOptionals);
            if (document.body) {
                document.body.classList.add(CLASS.DOM_READY);
            }
        }));
    
        const load = () => {
            toggleOptionals();
            setDomReady();
        };

        toggleOptionals();
        setupTabOutlineEvent();

        document.addEventListener('DOMContentLoaded', load);
        window.addEventListener('load', load);
        window.addEventListener('resize', load);
    };
}
