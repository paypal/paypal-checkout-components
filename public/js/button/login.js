
import { isLoggedIn } from './user';

let loginPreRender;

export function shouldPrefetchLogin() {
    return window.xprops.prefetchLogin;
}

export function setupLoginPreRender() {

    if (!shouldPrefetchLogin()) {
        return;
    }

    return isLoggedIn().then(loggedIn => {
        if (!loggedIn) {
            let login = window.paypal.Login.prerender({
                env: 'stage',

                onAuthenticate(data) {
                    throw new Error(`Called unimplemented onAuthenticate`);
                }
            });

            loginPreRender = {
                render(props) {
                    return login.render(props);
                },
                renderTo(win, props) {
                    return login.renderTo(win, props);
                }
            };

            setTimeout(() => {
                loginPreRender = null;
            }, 5 * 60 * 1000);
        }
    });
}

export function getAccessToken() {
    return new window.paypal.Promise((resolve, reject) => {
        let LoginComponent = loginPreRender || window.paypal.Login;
        loginPreRender = null;

        LoginComponent.renderTo(window.top, {
            onAuthenticate({ accessToken }) {
                resolve(accessToken);
            },
            onError: reject
        }).catch(reject);
    });
}
