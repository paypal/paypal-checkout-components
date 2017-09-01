/* @flow */

import { type ZalgoPromise } from 'zalgo-promise/src';

import { createFrame, destroyElement } from '../common';

export function testSetup({ options, script, preScript } : { options? : Object, script : string, preScript? : string }) : ZalgoPromise<void> {
    return new window.paypal.Promise((resolve, reject) => {

        options = options || {
            'data-paypal-checkout': '',
            'env':                  'test'
        };

        let dataOptions = Object.keys(options).map(name => {
            return `${ name }="${ options ? options[name] : '' }"`;
        }).join(' ');

        let frameHTML = `
            <head>
                <script>
                    window.mockDomain = 'mock://www.merchant.com';
                    var parentWindow = (window.opener || window.parent);
                    window.__coverage__ = parentWindow.__coverage__;
                    window.XMLHttpRequest.prototype.send = function() {};

                    ${ preScript || '' }
                </script>

                <script src="/base/src/load.js" ${ dataOptions }></script>
            </head>

            <body>
                <script>
                    (function() {
                        return (new paypal.Promise(function(resolve, reject) {
                            ${ script }
                        })).then(function(result) {
                            window.paypal.postRobot.send(window.parent, 'resolve', { result: result });
                        }, function(err) {
                            window.paypal.postRobot.send(window.parent, 'reject', { error: err.stack });
                        });
                    })();
                </script>
            </body>
        `;

        let frame = createFrame({
            container: document.body,
            html:      frameHTML
        });

        window.paypal.postRobot.once('resolve', { window: frame.contentWindow }, ({ data }) => {
            destroyElement(frame);
            return resolve(data.result);
        });

        window.paypal.postRobot.once('reject', { window: frame.contentWindow }, ({ data }) => {
            destroyElement(frame);
            return reject(new Error(data.error));
        });
    });
}
