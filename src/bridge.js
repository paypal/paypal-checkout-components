
import xcomponent from 'xcomponent/src';

const BRIDGE_URL = 'http://localhost.paypal.com:8000/webapps/hermes/static/html/paypal-checkout-meta.html';

if (window.location.href !== BRIDGE_URL) {
    xcomponent.postRobot.openBridge(BRIDGE_URL);
}
