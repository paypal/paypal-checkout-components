
import { componentTemplate } from 'paypal-checkout/dist/checkout.button.render';

function query(req, key, def) {
    return req.query[key] || def;
}

function array(req, key) {
    return query(req, key, '').split(',').filter(Boolean);
}

function bool(req, key, def) {

    let val = query(req, key, def);

    if (val === 'true') {
        return true;
    }

    if (val === 'false') {
        return false;
    }
}

function number(req, key, def) {

    let val = query(req, key, def);

    if (val) {
        return parseInt(val, 10);
    }
}

function safeJSON() {
    return JSON.stringify.apply(null, arguments).replace(/</g, '\\u003C').replace(/>/g, '\\u003E');
}

export default (req, ctx) => {

    let config = ctx.config;
    let meta = ctx.meta;
    let cookies = ctx.cookies;
    let pre = ctx.pre;

    let locale = query(req, 'locale.x', 'en_US');

    let style = {
        size:         query(req, 'style.size'),
        color:        query(req, 'style.color'),
        shape:        query(req, 'style.shape'),
        label:        query(req, 'style.label'),
        layout:       query(req, 'style.layout'),
        maxbuttons:   number(req, 'style.maxbuttons'),

        fundingicons: bool(req, 'style.fundingicons'),
        branding:     bool(req, 'style.branding'),
        tagline:      bool(req, 'style.tagline')
    };

    let funding = {
        allowed:    array(req, 'funding.allowed'),
        disallowed: array(req, 'funding.disallowed'),
        remembered: array(req, 'funding.remembered')
    };

    pre.buttonTypes.res.data.eligible.forEach(source => {
        funding.remembered.push(source);
    });

    let buttonHTML = componentTemplate({
        props: {
            env:     meta.env,
            locale:  locale,
            style:   style,
            funding: funding
        }
    });

    let stageProp = meta.icstage ? `data-stage="${ meta.icstage }"` : '';

    return `
        <body>
            ${ buttonHTML }

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
