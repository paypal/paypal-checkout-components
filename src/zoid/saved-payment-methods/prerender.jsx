/* @flow */
/** @jsx node */

import { node, type ChildType } from "@krakenjs/jsx-pragmatic/src";
import type { ZoidProps } from "@krakenjs/zoid/src";

import { type SavedPaymentMethodsProps } from "./props";

type PrerenderedSavedPaymentMethodsProps = {|
  nonce: ?string,
  props: ZoidProps<SavedPaymentMethodsProps>,
|};

export function PrerenderedSavedPaymentMethods({
  nonce,
}: // props,
PrerenderedSavedPaymentMethodsProps): ChildType {
  return (
    <html>
      <head>
        <style nonce={nonce}>
          {`
            * {
              box-sizing: border-box;
            }
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            }
            .saved-payment-methods-loading {
              display: flex;
              align-items: center;
              justify-content: center;
              height: 100vh;
              color: #999;
            }
              .loader { 
                width: 100%;
                max-height: 50px;
                display: block;
              }
            .loader-wave {
              transform-box: fill-box;
              transform-origin: 0 50%;
            }
            .loader-wave-1 { animation: loader-wave 1.2s linear infinite; }
            .loader-wave-2 { animation: loader-wave 1.6s linear infinite; }
            .loader-wave-3 { animation: loader-wave 2s linear infinite; }
            .loader-wave-4 { animation: loader-wave 0.9s linear infinite; }
            @keyframes loader-wave {
              from { transform: translateX(0); }
              to { transform: translateX(-50px); }
            }
          `}
        </style>
      </head>
      <body>
        <svg
          class="loader"
          viewBox="0 0 400 50"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path
              id="wave-period"
              d="M 0,25 C 12.5,20 37.5,30 50,25 C 62.5,20 87.5,30 100,25"
            />
            <clipPath id="waves-clip">
              <rect x="0" y="0" width="318" height="50" />
            </clipPath>
          </defs>
          <g
            clip-path="url(#waves-clip)"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
          >
            <g class="loader-wave loader-wave-1" stroke="#e74c3c">
              <use href="#wave-period" x="0" y="0" />
              <use href="#wave-period" x="50" y="0" />
              <use href="#wave-period" x="100" y="0" />
              <use href="#wave-period" x="150" y="0" />
              <use href="#wave-period" x="200" y="0" />
              <use href="#wave-period" x="250" y="0" />
              <use href="#wave-period" x="300" y="0" />
              <use href="#wave-period" x="350" y="0" />
            </g>
            <g class="loader-wave loader-wave-2" stroke="#f39c12">
              <use href="#wave-period" x="0" y="6" />
              <use href="#wave-period" x="50" y="6" />
              <use href="#wave-period" x="100" y="6" />
              <use href="#wave-period" x="150" y="6" />
              <use href="#wave-period" x="200" y="6" />
              <use href="#wave-period" x="250" y="6" />
              <use href="#wave-period" x="300" y="6" />
              <use href="#wave-period" x="350" y="6" />
            </g>
            <g class="loader-wave loader-wave-3" stroke="#27ae60">
              <use href="#wave-period" x="0" y="12" />
              <use href="#wave-period" x="50" y="12" />
              <use href="#wave-period" x="100" y="12" />
              <use href="#wave-period" x="150" y="12" />
              <use href="#wave-period" x="200" y="12" />
              <use href="#wave-period" x="250" y="12" />
              <use href="#wave-period" x="300" y="12" />
              <use href="#wave-period" x="350" y="12" />
            </g>
            <g class="loader-wave loader-wave-4" stroke="#3498db">
              <use href="#wave-period" x="0" y="18" />
              <use href="#wave-period" x="50" y="18" />
              <use href="#wave-period" x="100" y="18" />
              <use href="#wave-period" x="150" y="18" />
              <use href="#wave-period" x="200" y="18" />
              <use href="#wave-period" x="250" y="18" />
              <use href="#wave-period" x="300" y="18" />
              <use href="#wave-period" x="350" y="18" />
            </g>
          </g>
          <path
            d="M 355 48 C 340 48 331 33 334 26 L 339 12 L 345 20 C 352 18 358 18 365 20 L 370 12 L 375 26 C 379 33 370 48 355 48 Z"
            fill="none"
            stroke="#000"
            stroke-width="2"
            stroke-linejoin="round"
          />
        </svg>
        <div class="saved-payment-methods-loading">
          Loading Saved Payment Methods...
        </div>
      </body>
    </html>
  );
}
