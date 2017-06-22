import assert from 'assert';
import context from '../index';

let locales = {
    '': [ '' ],
    AD: [ 'en', 'fr', 'es', 'zh' ],
    AE: [ 'en', 'fr', 'es', 'zh', 'ar' ],
    AG: [ 'en', 'fr', 'es', 'zh' ],
    AI: [ 'en', 'fr', 'es', 'zh' ],
    AL: [ 'en' ],
    AM: [ 'en', 'fr', 'es', 'zh' ],
    AN: [ 'en', 'fr', 'es', 'zh' ],
    AO: [ 'en', 'fr', 'es', 'zh' ],
    AR: [ 'es', 'en' ],
    AT: [ 'de', 'en' ],
    AU: [ 'en' ],
    AW: [ 'en', 'fr', 'es', 'zh' ],
    AZ: [ 'en', 'fr', 'es', 'zh' ],
    BA: [ 'en' ],
    BB: [ 'en', 'fr', 'es', 'zh' ],
    BE: [ 'en', 'nl', 'fr' ],
    BF: [ 'fr', 'en', 'es', 'zh' ],
    BG: [ 'en' ],
    BH: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    BI: [ 'fr', 'en', 'es', 'zh' ],
    BJ: [ 'fr', 'en', 'es', 'zh' ],
    BM: [ 'en', 'fr', 'es', 'zh' ],
    BN: [ 'en' ],
    BO: [ 'es', 'en', 'fr', 'zh' ],
    BR: [ 'pt', 'en' ],
    BS: [ 'en', 'fr', 'es', 'zh' ],
    BT: [ 'en' ],
    BW: [ 'en', 'fr', 'es', 'zh' ],
    BY: [ 'en' ],
    BZ: [ 'es', 'en', 'fr', 'zh' ],
    C2: [ 'zh', 'en' ],
    CA: [ 'en', 'fr' ],
    CD: [ 'fr', 'en', 'es', 'zh' ],
    CG: [ 'en', 'fr', 'es', 'zh' ],
    CH: [ 'de', 'fr', 'en' ],
    CI: [ 'fr', 'en' ],
    CK: [ 'en', 'fr', 'es', 'zh' ],
    CL: [ 'es', 'en', 'fr', 'zh' ],
    CM: [ 'fr', 'en' ],
    CN: [ 'zh' ],
    CO: [ 'es', 'en', 'fr', 'zh' ],
    CR: [ 'es', 'en', 'fr', 'zh' ],
    CV: [ 'en', 'fr', 'es', 'zh' ],
    CY: [ 'en' ],
    CZ: [ 'en', 'fr', 'es', 'zh' ],
    DE: [ 'de', 'en' ],
    DJ: [ 'fr', 'en', 'es', 'zh' ],
    DK: [ 'da', 'en' ],
    DM: [ 'en', 'fr', 'es', 'zh' ],
    DO: [ 'es', 'en', 'fr', 'zh' ],
    DZ: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    EC: [ 'es', 'en', 'fr', 'zh' ],
    EE: [ 'en', 'ru', 'fr', 'es', 'zh' ],
    EG: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    ER: [ 'en', 'fr', 'es', 'zh' ],
    ES: [ 'es', 'en' ],
    ET: [ 'en', 'fr', 'es', 'zh' ],
    FI: [ 'en', 'fr', 'es', 'zh' ],
    FJ: [ 'en', 'fr', 'es', 'zh' ],
    FK: [ 'en', 'fr', 'es', 'zh' ],
    FM: [ 'en' ],
    FO: [ 'da', 'en', 'fr', 'es', 'zh' ],
    FR: [ 'fr', 'en' ],
    GA: [ 'fr', 'en', 'es', 'zh' ],
    GB: [ 'en' ],
    GD: [ 'en', 'fr', 'es', 'zh' ],
    GE: [ 'en', 'fr', 'es', 'zh' ],
    GF: [ 'en', 'fr', 'es', 'zh' ],
    GI: [ 'en', 'fr', 'es', 'zh' ],
    GL: [ 'da', 'en', 'fr', 'es', 'zh' ],
    GM: [ 'en', 'fr', 'es', 'zh' ],
    GN: [ 'fr', 'en', 'es', 'zh' ],
    GP: [ 'en', 'fr', 'es', 'zh' ],
    GR: [ 'en', 'fr', 'es', 'zh' ],
    GT: [ 'es', 'en', 'fr', 'zh' ],
    GW: [ 'en', 'fr', 'es', 'zh' ],
    GY: [ 'en', 'fr', 'es', 'zh' ],
    HK: [ 'en', 'zh' ],
    HN: [ 'es', 'en', 'fr', 'zh' ],
    HR: [ 'en' ],
    HU: [ 'en', 'fr', 'es', 'zh' ],
    ID: [ 'id', 'en' ],
    IE: [ 'en', 'fr', 'es', 'zh' ],
    IL: [ 'he', 'en' ],
    IN: [ 'en' ],
    IS: [ 'en' ],
    IT: [ 'it', 'en' ],
    JM: [ 'es', 'en', 'fr', 'zh' ],
    JO: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    JP: [ 'ja', 'en' ],
    KE: [ 'en', 'fr', 'es', 'zh' ],
    KG: [ 'en', 'fr', 'es', 'zh' ],
    KH: [ 'en' ],
    KI: [ 'en', 'fr', 'es', 'zh' ],
    KM: [ 'fr', 'en', 'es', 'zh' ],
    KN: [ 'en', 'fr', 'es', 'zh' ],
    KR: [ 'ko', 'en' ],
    KW: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    KY: [ 'en', 'fr', 'es', 'zh' ],
    KZ: [ 'en', 'fr', 'es', 'zh' ],
    LA: [ 'en' ],
    LC: [ 'en', 'fr', 'es', 'zh' ],
    LI: [ 'en', 'fr', 'es', 'zh' ],
    LK: [ 'en' ],
    LS: [ 'en', 'fr', 'es', 'zh' ],
    LT: [ 'en', 'ru', 'fr', 'es', 'zh' ],
    LU: [ 'en', 'de', 'fr', 'es', 'zh' ],
    LV: [ 'en', 'ru', 'fr', 'es', 'zh' ],
    MA: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    MC: [ 'fr', 'en' ],
    MD: [ 'en' ],
    ME: [ 'en' ],
    MG: [ 'en', 'fr', 'es', 'zh' ],
    MH: [ 'en', 'fr', 'es', 'zh' ],
    MK: [ 'en' ],
    ML: [ 'fr', 'en', 'es', 'zh' ],
    MN: [ 'en' ],
    MQ: [ 'en', 'fr', 'es', 'zh' ],
    MR: [ 'en', 'fr', 'es', 'zh' ],
    MS: [ 'en', 'fr', 'es', 'zh' ],
    MT: [ 'en' ],
    MU: [ 'en', 'fr', 'es', 'zh' ],
    MV: [ 'en' ],
    MW: [ 'en', 'fr', 'es', 'zh' ],
    MX: [ 'es', 'en' ],
    MY: [ 'en' ],
    MZ: [ 'en', 'fr', 'es', 'zh' ],
    NA: [ 'en', 'fr', 'es', 'zh' ],
    NC: [ 'en', 'fr', 'es', 'zh' ],
    NE: [ 'fr', 'en', 'es', 'zh' ],
    NF: [ 'en', 'fr', 'es', 'zh' ],
    NG: [ 'en' ],
    NI: [ 'es', 'en', 'fr', 'zh' ],
    NL: [ 'nl', 'en' ],
    NO: [ 'no', 'en' ],
    NP: [ 'en' ],
    NR: [ 'en', 'fr', 'es', 'zh' ],
    NU: [ 'en', 'fr', 'es', 'zh' ],
    NZ: [ 'en', 'fr', 'es', 'zh' ],
    OM: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    PA: [ 'es', 'en', 'fr', 'zh' ],
    PE: [ 'es', 'en', 'fr', 'zh' ],
    PF: [ 'en', 'fr', 'es', 'zh' ],
    PG: [ 'en', 'fr', 'es', 'zh' ],
    PH: [ 'en' ],
    PL: [ 'pl', 'en' ],
    PM: [ 'en', 'fr', 'es', 'zh' ],
    PN: [ 'en', 'fr', 'es', 'zh' ],
    PT: [ 'pt', 'en' ],
    PW: [ 'en', 'fr', 'es', 'zh' ],
    PY: [ 'es', 'en' ],
    QA: [ 'en', 'fr', 'es', 'zh', 'ar' ],
    RE: [ 'en', 'fr', 'es', 'zh' ],
    RO: [ 'en', 'fr', 'es', 'zh' ],
    RS: [ 'en', 'fr', 'es', 'zh' ],
    RU: [ 'ru', 'en' ],
    RW: [ 'fr', 'en', 'es', 'zh' ],
    SA: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    SB: [ 'en', 'fr', 'es', 'zh' ],
    SC: [ 'fr', 'en', 'es', 'zh' ],
    SE: [ 'sv', 'en' ],
    SG: [ 'en' ],
    SH: [ 'en', 'fr', 'es', 'zh' ],
    SI: [ 'en', 'fr', 'es', 'zh' ],
    SJ: [ 'en', 'fr', 'es', 'zh' ],
    SK: [ 'en', 'fr', 'es', 'zh' ],
    SL: [ 'en', 'fr', 'es', 'zh' ],
    SM: [ 'en', 'fr', 'es', 'zh' ],
    SN: [ 'fr', 'en', 'es', 'zh' ],
    SO: [ 'en', 'fr', 'es', 'zh' ],
    SR: [ 'en', 'fr', 'es', 'zh' ],
    ST: [ 'en', 'fr', 'es', 'zh' ],
    SV: [ 'es', 'en', 'fr', 'zh' ],
    SZ: [ 'en', 'fr', 'es', 'zh' ],
    TC: [ 'en', 'fr', 'es', 'zh' ],
    TD: [ 'fr', 'en', 'es', 'zh' ],
    TG: [ 'fr', 'en', 'es', 'zh' ],
    TH: [ 'th', 'en' ],
    TJ: [ 'en', 'fr', 'es', 'zh' ],
    TM: [ 'en', 'fr', 'es', 'zh' ],
    TN: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    TO: [ 'en' ],
    TR: ['tr', 'en'],
    TT: [ 'en', 'fr', 'es', 'zh' ],
    TV: [ 'en', 'fr', 'es', 'zh' ],
    TW: [ 'zh', 'en' ],
    TZ: [ 'en', 'fr', 'es', 'zh' ],
    UA: [ 'en', 'ru', 'fr', 'es', 'zh' ],
    UG: [ 'en', 'fr', 'es', 'zh' ],
    US: [ 'en', 'fr', 'es', 'zh' ],
    UY: [ 'es', 'en', 'fr', 'zh' ],
    VA: [ 'en', 'fr', 'es', 'zh' ],
    VC: [ 'en', 'fr', 'es', 'zh' ],
    VE: [ 'es', 'en', 'fr', 'zh' ],
    VG: [ 'en', 'fr', 'es', 'zh' ],
    VN: [ 'en' ],
    VU: [ 'en', 'fr', 'es', 'zh' ],
    WF: [ 'en', 'fr', 'es', 'zh' ],
    WS: [ 'en' ],
    YE: [ 'ar', 'en', 'fr', 'es', 'zh' ],
    YT: [ 'en', 'fr', 'es', 'zh' ],
    ZA: [ 'en', 'fr', 'es', 'zh' ],
    ZM: [ 'en', 'fr', 'es', 'zh' ],
    ZW: [ 'en' ]
};

let labels = [ 'checkout', 'credit', 'pay' ];

let sizes = [ 'tiny', 'small', 'medium', 'large', 'responsive' ];

let colors = [ 'blue', 'gold', 'silver', 'creditblue' ];

let shapes = [ 'rect', 'pill' ];

describe('Button Configurations before rendering', () => {

    for (let country of Object.keys(locales)) {
        for (let lang of locales[country]) {
            for (let label of labels) {
                for (let size of sizes) {
                    for (let color of colors) {
                        for (let shape of shapes) {

                            let logocolor = {
                                gold: 'blue',
                                silver: 'blue',
                                blue: 'white',
                                creditblue: 'white'
                            }[color];

                            let locale = (lang && country) ? `${lang}_${country}` : undefined;

                            if (label === 'credit') {

                                if (size === 'tiny') {
                                    continue;
                                }

                                if (color !== 'creditblue') {
                                    continue;
                                }

                            } else if (color === 'creditblue') {
                                continue;
                            }

                            if (label === 'pay') {
                                if (size === 'tiny') {
                                    continue;
                                }
                            }

                            it(`Should render the button for ${locale} / ${size} / ${color} / ${shape} / ${label}`, async () => { // eslint-disable-line

                                let req = {
                                    query: {
                                        'style.size': size,
                                        'style.color': color,
                                        'style.shape': shape,
                                        'style.label': label,
                                        'locale.x': locale
                                    }
                                };

                                let html = context(req).buttonHTML;

                                let expected =
                                    `<div id="paypal-button" class="paypal-button paypal-style-${label} paypal-color-${color} paypal-logo-color-${logocolor} paypal-size-${size} paypal-shape-${shape}"`;

                                assert(html.indexOf(expected) > -1, 'Expected label, color, size, shape and locale to be set correctly in the template');

                                if (label !== 'credit') {
                                    assert(html.match(`<span class="text">.+</span>`, 'Button should have text'));
                                }

                                if (label !== 'buynow') {
                                    assert(html.indexOf(`<img class="logo logo-paypal logo-paypal-${color}"`, 'Button should have a logo'));
                                }
                            });
                        }
                    }
                }
            }
            break;
        }
    }

});
