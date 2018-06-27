
import spark from 'xo-spark';

import { FUNDING } from '../constants';

module.exports = spark.register({

    name: 'button',

    description: 'Hermes Button API Plugin',

    apis: {

        buttonTypes: {
            path: '/api/button/funding',

            handlers: {
                get(req, res, params, query) {

                    let remembered = [];
                    let eligible = [];
                    let ineligible = [];

                    // Slingshot gives us a geo location header (`pp_geo_loc`). Local servers won't have this header.
                    // For now, forbid clients whos IP's are outside of the locale defined by the xcomponent from
                    // seeing the PPC button.
                    let [, country ] = req.query['locale.x'].split('_');
                    if (req.headers.pp_geo_loc && country !== req.headers.pp_geo_loc) {
                        ineligible.push(FUNDING.CREDIT);
                    }

                    if (req.cookies.login_email) {
                        remembered.push(FUNDING.PAYPAL);
                        eligible.push(FUNDING.PAYPAL);
                    }

                    if (req.cookies.pwv) {
                        remembered.push(FUNDING.VENMO);
                        eligible.push(FUNDING.VENMO);
                    }

                    return {
                        remembered: remembered,
                        eligible: eligible,
                        ineligible: ineligible,
                    };
                }
            },

            roles: []
        }
    }
});
