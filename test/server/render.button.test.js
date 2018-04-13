
import { FUNDING } from '../../constants';
import { buttonTemplate } from '../../button/templates/button';

import { mockReq, mockContext } from './mock';
import { regexMap } from './util';

function getRenderedFundingSources(template) {
    return regexMap(template, /data-funding-source="([^"]+)"/g, result => result[1]);
}

test('should do a basic button render and succeed', () => {

    let req = mockReq();
    let ctx = mockContext();

    buttonTemplate(req, ctx);
});

test('should pass the correct attributes to checkout.js', () => {

    let req = mockReq();
    let ctx = mockContext();

    let template = buttonTemplate(req, ctx);

    if (template.indexOf(`<script src="${ ctx.config.urls.incontextScript }`) === -1) {
        throw new Error(`Expected button template to have incontext script included`);
    }

    if (template.indexOf(`data-paypal-checkout`) === -1) {
        throw new Error(`Expected script to have data-paypal-checkout attribute`);
    }

    if (template.indexOf(`data-no-bridge`) === -1) {
        throw new Error(`Expected script to have data-no-bridge attribute`);
    }

    if (template.indexOf(`data-env="${ ctx.meta.env }"`) === -1) {
        throw new Error(`Expected script to have correct data-env attribute`);
    }

    if (template.indexOf(`data-stage="${ ctx.meta.icstage }"`) === -1) {
        throw new Error(`Expected script to have correct data-stage attribute`);
    }
});

test('should render the button in html', () => {

    let req = mockReq();
    let ctx = mockContext();

    let template = buttonTemplate(req, ctx);

    if (template.indexOf(`class="paypal-button-container`) === -1) {
        throw new Error(`Expected button template to be rendered`);
    }
});

test('should only render paypal button by default', () => {

    let req = mockReq();
    let ctx = mockContext();

    let template = buttonTemplate(req, ctx);

    let fundingSources = getRenderedFundingSources(template);
    
    if (fundingSources.length !== 1 || fundingSources[0] !== FUNDING.PAYPAL) {
        throw new Error(`Expected only paypal button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});

test('should use buttonTypes api to inform buttons which are rendered', () => {

    let req = mockReq();
    let ctx = mockContext();

    ctx.pre.buttonTypes.res.data.eligible = [ FUNDING.VENMO ];

    let template = buttonTemplate(req, ctx);

    let fundingSources = getRenderedFundingSources(template);
    
    if (fundingSources.length !== 2 || fundingSources[1] !== FUNDING.VENMO) {
        throw new Error(`Expected venmo button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});

test('should use funding.allowed to inform buttons which are rendered', () => {
    
    let req = mockReq();
    let ctx = mockContext();

    req.query['funding.allowed'] = FUNDING.VENMO;

    let template = buttonTemplate(req, ctx);

    let fundingSources = getRenderedFundingSources(template);
    
    if (fundingSources.length !== 2 || fundingSources[1] !== FUNDING.VENMO) {
        throw new Error(`Expected venmo button to be rendered, got: ${ fundingSources.join(', ') }`);
    }
});