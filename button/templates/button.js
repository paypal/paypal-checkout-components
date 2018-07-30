
import { componentTemplate } from 'paypal-checkout/dist/checkout.button.render';

import { pollForResource, query, array, bool, number, safeJSON } from './util';

const COMPONENT_TEMPLATE_URL = 'https://www.paypalobjects.com/api/checkout.button.render.js';
const COMPONENT_TEMPLATE_FETCH_INTERVAL = 20 * 60 * 1000;

let dynamicComponentTemplate = componentTemplate;

if (process.env.NODE_ENV !== 'test') {
    pollForResource(COMPONENT_TEMPLATE_URL, async (code) => {
        
        let exports = {};
        eval(code); // eslint-disable-line no-eval
    
        if (typeof exports.componentTemplate !== 'function') {
            throw new Error(`Expected componentTemplate to be a function`);
        }
    
        dynamicComponentTemplate = exports.componentTemplate;
    
    }, COMPONENT_TEMPLATE_FETCH_INTERVAL);
}

export let buttonTemplate = (req, ctx) => {

    let config = ctx.config;
    let meta = ctx.meta;
    let cookies = ctx.cookies;
    let pre = ctx.pre;

    let locale = query(req, 'locale.x', 'en_US');
    let commit = query(req, 'commit');
    let platform = query(req, 'platform', 'desktop');

    let style = {
        size:         query(req, 'style.size'),
        color:        query(req, 'style.color'),
        shape:        query(req, 'style.shape'),
        label:        query(req, 'style.label'),
        layout:       query(req, 'style.layout'),
        
        maxbuttons:   number(req, 'style.maxbuttons'),
        height:       number(req, 'style.height'),

        fundingicons: bool(req, 'style.fundingicons'),
        branding:     bool(req, 'style.branding'),
        tagline:      bool(req, 'style.tagline'),

        installmentperiod: number(req, 'style.installmentperiod')
    };

    let funding = {
        allowed:    array(req, 'funding.allowed'),
        disallowed: array(req, 'funding.disallowed'),
        remembered: array(req, 'funding.remembered')
    };

    let { eligible, ineligible } = pre.buttonTypes.res.data;

    eligible.forEach(source => {
        funding.remembered.push(source);
    });

    ineligible.forEach(source => {
        if (funding.disallowed.indexOf(source) === -1) {
            funding.disallowed.push(source);
        }
    });

    let buttonHTML = dynamicComponentTemplate({
        props: {
            env:      meta.env,
            platform: platform,
            locale:   locale,
            style:    style,
            funding:  funding,
            commit:   commit
        }
    });

    let stageProp = meta.icstage ? `data-stage="${ meta.icstage }"` : '';

    return `
        <body>
            ${ buttonHTML }
            <div id="cardExp"></div>

            <script src="${ config.urls.incontextScript }/checkout${ meta.version ? '.' : '' }${ meta.version ? meta.version : '' }.js" data-paypal-checkout data-no-bridge data-state="ppxo_meta" data-env="${ meta.env }" ${ stageProp ? stageProp : '' }}></script>

            <script>
                window.angular = {
                    value: function() {},
                    module: function() {
                        return {
                            directive: function() {}
                        };
                    }
                };

                window.meta    = ${ safeJSON(meta) };
                window.cookies = ${ safeJSON(cookies) };
                window.config  = window.meta.config;
            </script>

            <script src="${ meta.staticUrl }/js/button.js?build=${ meta.buildId }"></script>

            <script>
                window.setupButton();
            </script>
        </body>
    `;
};
