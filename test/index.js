import assert from 'assert';
import { getButtonConfig } from '../lib/builder';
import renderer from '../lib';
import config from '../lib/buttonConfig';
import Handlebars from 'handlebars';

describe('Button Configurations before rendering', () => {
    before(done => {

        Handlebars.registerHelper('json', function (obj) {
            return new Handlebars.SafeString(JSON.stringify.apply(null, [obj, null, 4])
                .replace(/</g, '\\u003C').replace(/>/g, '\\u003E'));
        });

        done();
    });
    after(done => { done(); });



    it('should successfully return for generic case', async (done) => {
        try {
            let req = {
                query: {
                    'style.size': 'small',
                    'style.color': 'silver',
                    'style.shape': 'rect',
                    'style.label': 'checkout',
                    'locale.x': 'en_US'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.size === 'small');
            assert(button.color === 'silver');
            assert(button.shape === 'rect');
            assert(button.label === 'checkout');
            assert(button.locale === 'en_US');

            done();
        } catch (err) {
            done(err);
        }

    });

    it('should successfully return with defaults for bad inputs in request', async (done) => {
        try {
            let req = {
                query: {
                    'style.size': 'aksdlfj;',
                    'style.color': 'asldkjfa;',
                    'style.shape': 'askdjf',
                    'style.label': 'laskdfj',
                    'locale.x': 'sdl;fja;dskj'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.size === config.DEFAULT_SIZE);
            assert(button.color === config.DEFAULT_COLOR);
            assert(button.shape === config.DEFAULT_SHAPE);
            assert(button.label === config.DEFAULT_LABEL);
            assert(button.locale === config.DEFAULT_LOCALE);

            done();
        } catch (err) {
            done(err);
        }

    });

    it('should return the correct checkout paypal-content section for en_US (string + $wordmark$)', async (done) => {

        try {
            let req = {
                query: {
                    'locale.x': 'en_US'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.label_tag === 'The safer, easier way to pay');
            assert(button.logo === `${config.themes.general}<span class="text" data-hide-if-overflow> Check out</span>`);

            done();
        } catch (err) {
            done(err);
        }


    });

    it('should return the correct checkout paypal-content section for de_DE ($wordmark$ + string)', async (done) => {
        try {
            let req = {
                query: {
                    'locale.x': 'de_DE'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.label_tag === 'Überall schnell und sicher bezahlen.');
            assert(button.logo === `<span class="text" data-hide-if-overflow>Direkt zu </span>${config.themes.general}`);
            done();

        } catch (err) {
            done(err);
        }
    });

    it('should return the correct checkout paypal-content section for zh_US (string + $wordmark$ + string)', async (done) => {
        try {
            let req = {
                query: {
                    'locale.x': 'zh_US'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.label_tag === '更安全、更便捷的付款方式');
            assert(button.logo === `<span class="text" data-hide-if-overflow>使用</span>${config.themes.general}<span class="text" data-hide-if-overflow>结账</span>`);
            done();

        } catch (err) {
            done(err);
        }
    });

    it('should return the correct checkout paypal-content for a blue button', async (done) => {

        try {
            let req = {
                query: {
                    'style.size': 'small',
                    'style.color': 'blue',
                    'style.shape': 'rect',
                    'style.label': 'checkout',
                    'locale.x': 'en_US'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.size === 'small');
            assert(button.color === 'blue');
            assert(button.shape === 'rect');
            assert(button.label === 'checkout');
            assert(button.locale === 'en_US');

            assert(button.logo === `${config.themes.blue_checkout}<span class="text" data-hide-if-overflow> Check out</span>`, 'Expected the blue theme');
            assert(button.label_tag === 'The safer, easier way to pay');

            done();
        } catch (err) {
            done(err);
        }
    });

    it('should return the correct checkout paypal-content for a tiny button', async (done) => {
        try {
            let req = {
                query: {
                    'style.size': 'tiny',
                    'style.color': 'gold',
                    'style.shape': 'rect',
                    'style.label': 'checkout',
                    'locale.x': 'en_US'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.size === 'tiny');
            assert(button.color === 'gold');
            assert(button.shape === 'rect');
            assert(button.label === 'checkout');
            assert(button.locale === 'en_US');

            assert(button.label_tag === 'The safer, easier way to pay');

            done();
        } catch (err) {
            done(err);
        }
    });

    it('should return the correct credit   paypal-content for a tiny button', async (done) => {
        try {
            let req = {
                query: {
                    'style.size': 'tiny',
                    'style.shape': 'rect',
                    'style.label': 'credit',
                    'locale.x': 'en_US'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.size === 'tiny');
            assert(button.color === 'creditblue');
            assert(button.shape === 'rect');
            assert(button.label === 'credit');
            assert(button.locale === 'en_US');

            assert(button.label_tag === 'Buy Now. Pay Over Time.');

            done();
        } catch (err) {
            done(err);
        }
    });

    it('should return the correct credit   paypal-tag-content section for en_US', async (done) => {
        try {
            let req = {
                query: {
                    'style.label': 'credit'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.color === 'creditblue');
            assert(button.locale === 'en_US');
            assert(button.label_tag === 'Buy Now. Pay Over Time.');
            done();

        } catch (err) {
            done(err);
        }
    });


    it('should return the correct credit   paypal-tag-content section for de_DE', async (done) => {
        try {
            let req = {
                query: {
                    'locale.x': 'de_DE',
                    'style.label': 'credit'
                }
            };

            let button = getButtonConfig(req).buttonConfig;

            assert(button.label_tag === 'Kaufen Sie jetzt und bezahlen Sie nach und nach.');
            done();

        } catch (err) {
            done(err);
        }
    });



    it('should render the button.hbs page', async (done) => {
        try {
            let req = {
                query: {
                    'style.size': 'small',
                    'style.color': 'silver',
                    'style.shape': 'rect',
                    'style.label': 'checkout',
                    'locale.x': 'en_US'
                }
            };
            
            let render = await renderer('./public/button.hbs');

            let buttonPage = render({ meta: {}, cookies: {} }, req);

            assert(buttonPage.indexOf('<button class="paypal-button paypal-style-checkout ' +
                    'paypal-color-silver paypal-size-small paypal-shape-rect en_US" type="submit">') > -1,
                    'Expected label, color, size, shape and locale to be set correctly in the template');


            done();
        } catch (err) {
            done(err);
        }
    });

});



