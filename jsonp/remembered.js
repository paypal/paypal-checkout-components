
import express from 'express';

module.exports = function remememberedCorsFactory() {

    let app = express();

    app.get('/remembered', (req, res) => {

        let callback = req.query.callback;

        if (!callback || !callback.match(/^[a-zA-Z]+$/)) {
            return res.status(400).send(`Invalid callback`);
        }

        let paypal = false;
        let venmo = false; 

        if (req.cookies.login_email) {
            paypal = true;
        }

        if (req.cookies.pwv) {
            paypal = true;
            venmo = true;
        }

        let script = `window.${callback}(${ JSON.stringify({ paypal, venmo }) });`;

        return res
            .status(200)
            .header('content-type', 'application/javascript')
            .send(script);
    });

    return app;
}