/* @flow */

import { config } from '../../config';
import { Login } from './component';

let prerender = Login.prerender;
Login.prerender = function(props) : Object {
    let component = prerender.apply(this, arguments);

    let env = (props && props.env) || config.env;

    component.html = component.html.then(html => {
        return `
            ${html}

            <script src="${config.scriptUrl}" async></script>

            <script>
                (function() {

                    function ajaxifyForms() {
                        Array.prototype.slice.call(document.querySelectorAll('form')).forEach(function(form) {
                            form.addEventListener('submit', function(event) {
                                event.preventDefault();

                                var data = {};

                                Array.prototype.slice.call(form.elements).forEach(function(el) {

                                    if (el.disabled || !el.name) {
                                        return;
                                    }

                                    if (['file', 'reset', 'submit', 'button'].indexOf(el.type) !== -1) {
                                        return;
                                    }

                                    var value;

                                    if (['checkbox', 'radio'].indexOf(el.type) !== -1 && el.checked) {
                                        value = 'on';
                                    } else {
                                        value = el.value;
                                    }

                                    data[el.name] = value;
                                });

                                var serializedData = Object.keys(data).map(function(key) {
                                    return encodeURIComponent(key) + '=' + encodeURIComponent(data[key])
                                }).join('&').replace(/%20/g, '+');

                                var req = new XMLHttpRequest();
                                req.open(form.method || 'GET', '${config.paypalUrls[env]}' + form.getAttribute('action'));
                                req.setRequestHeader('Accept', 'application/json');
                                req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                                req.setRequestHeader('x-csrf-token', data._csrf);
                                req.setRequestHeader('is-inline-ul', 'true');
                                req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                                req.send(serializedData);

                                req.onload = function() {
                                    if (req.status !== 200) {
                                        return window.xchild.error(new Error('Login returned status: ' + req.status));
                                    }

                                    var data;

                                    try {
                                        data = JSON.parse(req.responseText);
                                    } catch (err) {
                                        return window.xchild.error(err + '\\n\\n' + req.responseText);
                                    }

                                    if (data.htmlResponse) {
                                        document.write(data.htmlResponse);
                                        return setTimeout(ajaxifyForms);
                                    }

                                    if (!data || !data.accessToken) {
                                        return window.xchild.error('Could not find access token: \\n\\n' + JSON.stringify(data, null, 2));
                                    }

                                    window.xprops.onAuthenticate({
                                        accessToken: data.accessToken
                                    });
                                };

                                req.onerror = function() {
                                    return window.xchild.error(new Error('Login error'));
                                };
                            });
                        });
                    }

                    ajaxifyForms();

                })();
            </script>
        `;
    });

    return component;
};
