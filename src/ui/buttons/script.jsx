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
      LOGOS_READY: "logos-ready",
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
      const isTagline = optionalParent?.classList.contains(
        "paypal-button-tagline" || false
      );

      if (isTagline) {
        return 0;
      }
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

    function toggleLogos(immediate) {
      const LOGO_CLASS = {
        PAYPAL_LOGO: ".paypal-logo-paypal-rebrand",
        PP_LOGO: ".paypal-logo-pp-rebrand",
        PAYPAL_BUTTON: ".paypal-button-rebrand",
        BUTTON_LABEL: ".paypal-button-label-container",
      };

      const paylaterButtons = getElements(LOGO_CLASS.PAYPAL_BUTTON);

      // Phase 1: make all PayPal logos invisible-but-in-flow so we can measure
      // their natural widths without any visible flash. Using inline style
      // instead of the "hidden" class avoids pulling them out of layout
      // (position:absolute), which would corrupt width measurements.
      const logoMeasurements = [];

      for (const button of paylaterButtons) {
        const paypalLogo = button.querySelector(LOGO_CLASS.PAYPAL_LOGO);
        const ppLogo = button.querySelector(LOGO_CLASS.PP_LOGO);
        const buttonLabel = button.querySelector(LOGO_CLASS.BUTTON_LABEL);

        if (!buttonLabel || !paypalLogo || !ppLogo) {
          continue;
        }

        // Temporarily force both logos into flow (invisible) so we can measure
        // their natural widths regardless of current hidden/shown state.
        // We override position and visibility via inline style — this keeps the
        // CLASS.HIDDEN class intact (no class mutation = no visible repaint).
        paypalLogo.style.cssText =
          "position:static!important;visibility:hidden!important";
        ppLogo.style.cssText =
          "position:static!important;visibility:hidden!important";

        logoMeasurements.push({ paypalLogo, ppLogo, buttonLabel });
      }

      // Phase 2: measure all widths in one batch (single forced layout read)
      const updates = [];

      for (const { paypalLogo, ppLogo, buttonLabel } of logoMeasurements) {
        const buttonWidth = buttonLabel.offsetWidth;
        const gap = calculateGap(buttonLabel);

        const allElements = getAllChildren(buttonLabel);
        const textElements = allElements.filter(
          (el) => !el.classList.contains("paypal-logo-pp-rebrand")
        );

        // textElements includes paypalLogo (now in flow) + text
        const totalWidth = getElementsTotalWidth(textElements) + gap;
        const useLargerLogo = totalWidth <= buttonWidth;

        updates.push({ paypalLogo, ppLogo, useLargerLogo });
      }

      // Phase 3: restore inline style overrides, then apply the show/hide
      // decision. On first render apply immediately (before paint) so the
      // correct logo is shown from the very first frame. On resize, defer to
      // rAF so all mutations land in a single paint and avoid mid-resize flash.
      function applyUpdates() {
        // Only unlock logos and apply show/hide if we actually found buttons
        // with both logo elements present. If either logo was missing (not yet
        // in the DOM), skip — the MutationObserver will re-trigger once added.
        if (updates.length === 0) {
          return;
        }
        // Unlock the CSS default-hidden logos before applying JS show/hide
        // so both changes land in the same paint. Using a dedicated class
        // (logos-ready) instead of dom-ready avoids triggering the text
        // animation before the second render.
        if (document.body) {
          document.body.classList.add(CLASS.LOGOS_READY);
        }
        for (const { paypalLogo, ppLogo } of updates) {
          paypalLogo.style.cssText = "";
          ppLogo.style.cssText = "";
        }
        for (const { paypalLogo, ppLogo, useLargerLogo } of updates) {
          if (useLargerLogo) {
            showElement(paypalLogo);
            hideElement(ppLogo);
          } else {
            hideElement(paypalLogo);
            showElement(ppLogo);
          }
        }
      }

      if (immediate) {
        applyUpdates();
      } else {
        requestAnimationFrame(applyUpdates);
      }
    }

    const setupResizeHandler = once(() => {
      window.addEventListener("resize", () => {
        toggleOptionals();
        toggleLogos();
      });
      setTimeout(() => {
        toggleOptionals();
        toggleLogos();
      });
    });

    function setDomReady() {
      if (document.body) {
        document.body.classList.add(CLASS.DOM_READY);
      }
    }

    const hasRebrandButtons = getElements(".paypal-button-rebrand").length > 0;

    const setDomReadyOnLoad = once(() => {
      // For pages with no rebrand buttons (PayPal, Venmo, etc.) dom-ready
      // must come from the load event since there is no MutationObserver
      // trigger. For rebrand buttons, dom-ready is set by the MutationObserver
      // after the second render, so we skip it here to avoid setting it too
      // early (before the second render replaces the DOM).
      if (!hasRebrandButtons) {
        setDomReady();
      }
    });

    const load = () => {
      toggleOptionals();
      toggleLogos(true);
      setupResizeHandler();
      setDomReadyOnLoad();
    };

    // Re-run synchronously whenever a rebrand logo node is added to the DOM
    // (second client-side render). MutationObserver fires as a microtask —
    // before the browser paints — so logos and dom-ready land in the same
    // frame as the new DOM, with no visible flash.
    const bodyEl = document.body;
    if (typeof MutationObserver !== "undefined" && bodyEl) {
      const observer = new MutationObserver((mutations) => {
        const hasLogoChange = mutations.some((m) =>
          Array.from(m.addedNodes).some((n) => {
            if (!(n instanceof Element)) {
              return false;
            }
            return (
              n.classList.contains("paypal-logo-paypal-rebrand") ||
              n.querySelector(".paypal-logo-paypal-rebrand") !== null
            );
          })
        );
        if (hasLogoChange) {
          toggleOptionals();
          toggleLogos(true);
          setDomReady();
        }
      });
      observer.observe(bodyEl, { childList: true, subtree: true });
    }

    toggleOptionals();
    toggleLogos(true);
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
