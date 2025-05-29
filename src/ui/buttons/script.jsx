/* @flow */
/** @jsx node */

import { node, type ElementNode } from "@krakenjs/jsx-pragmatic/src";

export function getComponentScript(): () => void {
  /* istanbul ignore next */
  return () => {
    const ATTRIBUTE = {
      OPTIONAL: "optional",
    };

    const CLASS = {
      HIDDEN: "hidden",
      DOM_READY: "dom-ready",
    };

    const SELECTOR = {
      OPTIONAL: `[${ATTRIBUTE.OPTIONAL}]`,
    };

    const TAG = {
      STYLE: "style",
    };

    function once(handler: Function): Function {
      let called = false;
      return (...args) => {
        if (!called) {
          called = true;
          handler(...args);
        }
      };
    }

    function debounce(handler: Function, time: number = 50): Function {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          handler(...args);
        }, time);
      };
    }

    // eslint-disable-next-line flowtype/no-mutable-array
    function toArray<T>(item): Array<T> {
      // $FlowFixMe[method-unbinding]
      return Array.prototype.slice.call(item);
    }

    function elementArray(
      elements:
        | HTMLCollection<HTMLElement>
        | NodeList<HTMLElement>
        | $ReadOnlyArray<HTMLElement>
    ): $ReadOnlyArray<HTMLElement> {
      return toArray(elements).filter((el) => {
        return el.tagName.toLowerCase() !== TAG.STYLE;
      });
    }

    function getElements(selector, parent): $ReadOnlyArray<HTMLElement> {
      parent = parent || document;
      return elementArray(parent.querySelectorAll(selector));
    }

    function getParent(element: HTMLElement): HTMLElement {
      // $FlowFixMe
      return element.parentElement;
    }

    function showElement(el: HTMLElement) {
      el.classList.remove(CLASS.HIDDEN);
    }

    function hideElement(el: HTMLElement) {
      el.classList.add(CLASS.HIDDEN);
    }

    function sum(arr: $ReadOnlyArray<number>): number {
      let result = 0;
      for (const item of arr) {
        result += item;
      }
      return result;
    }

    function unique<T>(arr: $ReadOnlyArray<T>): $ReadOnlyArray<T> {
      const result = [];

      for (const el of arr) {
        if (result.indexOf(el) === -1) {
          result.push(el);
        }
      }

      return result;
    }

    function getAllChildren(element: HTMLElement): $ReadOnlyArray<HTMLElement> {
      return elementArray(element.children);
    }

    function getOptionalIndex(element: HTMLElement): number {
      return parseInt(element.getAttribute(ATTRIBUTE.OPTIONAL) || 0, 10);
    }

    function getElementsTotalWidth(
      elements: $ReadOnlyArray<HTMLElement>
    ): number {
      return sum(
        elements.map((child) => Math.ceil(child.getBoundingClientRect().width))
      );
    }

    function calculateGap(optionalParent: HTMLElement): number {
      // Get the button element
      const parentElement = optionalParent.parentElement;

      // Get the height of the button
      const parentHeight = parentElement?.getBoundingClientRect().height || 60;

      // Calculate the gap based of height of button
      if (parentHeight <= 34) {
        return 3; // Small and Medium
      } else if (parentHeight <= 49) {
        return 5; // Large
      } else if (parentHeight <= 59) {
        return 6; // XL
      } else {
        return 7; // XXL
      }
    }

    function getOptionalParents(): $ReadOnlyArray<HTMLElement> {
      return unique(
        getElements(SELECTOR.OPTIONAL).map(getParent).filter(Boolean)
      );
    }

    function getOptionalChildren(
      parent: HTMLElement
    ): $ReadOnlyArray<HTMLElement> {
      return toArray(getElements(SELECTOR.OPTIONAL, parent)).sort(
        (first, second) => {
          return getOptionalIndex(first) - getOptionalIndex(second);
        }
      );
    }

    const children = getOptionalParents().map((optionalParent) => {
      const allChildren = getAllChildren(optionalParent);
      const optionalChildren = getOptionalChildren(optionalParent);

      return {
        optionalParent,
        allChildren,
        optionalChildren,
      };
    });

    function toggleOptionals() {
      for (const {
        optionalParent,
        allChildren,
        optionalChildren,
      } of children) {
        const parentWidth = optionalParent.offsetWidth;
        let usedWidth =
          getElementsTotalWidth(allChildren) -
          getElementsTotalWidth(optionalChildren);

        const totalGapWidth =
          calculateGap(optionalParent) * optionalChildren?.length;

        const totalChildrenWidth = optionalChildren.reduce((acc, child) => {
          return acc + child.offsetWidth;
        }, 0);

        usedWidth += totalGapWidth + totalChildrenWidth;

        console.log("is the content being hidden?");
        console.log(usedWidth, parentWidth);
        if (usedWidth > parentWidth) {
          optionalChildren.forEach((optionalChild) =>
            hideElement(optionalChild)
          );
        } else {
          optionalChildren.forEach((optionalChild) =>
            showElement(optionalChild)
          );
        }
      }
    }

    const setDomReady = once(
      debounce(() => {
        window.addEventListener("resize", toggleOptionals);
        setTimeout(toggleOptionals);
        if (document.body) {
          document.body.classList.add(CLASS.DOM_READY);
        }
      })
    );

    const load = () => {
      toggleOptionals();
      setDomReady();
    };

    toggleOptionals();
    document.addEventListener("DOMContentLoaded", load);
    window.addEventListener("load", load);
    window.addEventListener("resize", load);
  };
}

type ScriptProps = {|
  nonce: ?string,
|};

export function Script({ nonce }: ScriptProps): ElementNode {
  return (
    <script
      nonce={nonce}
      innerHTML={`(${getComponentScript().toString()})()`}
    />
  );
}
