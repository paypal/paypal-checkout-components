/* @flow */

import { buildBreakdown, calculateTotalFromShippingBreakdownAmounts, convertQueriesToArray, updateShippingOptions } from '../../src/props/utils';
import { ON_SHIPPING_CHANGE_PATHS } from '../../src/props/onShippingChange';

describe('onShippingChange utils', () => {
    describe('calculateTotalFromShippingBreakdownAmounts', () => {
        it('should calculate correct amount from current breakdown and updated amount when update amount is in breakdown', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                },
                handling: {
                    value: '1.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                handling: '5.0'
            };

            const result = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts });
            if (result !== '115.00') {
                throw new Error(`Expected result to be 115.0, but got ${ result }`);
            }
        });

        it('should calculate correct amount from current breakdown and updated amount when update amount is not in breakdown', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                handling: '5.0'
            };

            const result = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts });
            if (result !== '115.00') {
                throw new Error(`Expected result to be 115.0, but got ${ result }`);
            }
        });

        it('should calculate correct amount when shipping_discount is updated with a positive number', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                shipping_discount: '5.0'
            };

            const result = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts });
            if (result !== '105.00') {
                throw new Error(`Expected result to be 105.00, but got ${ result }`);
            }
        });

        it('should calculate correct amount when shipping_discount is updated with a negative number', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                shipping_discount: '-5.0'
            };

            const result = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts });
            if (result !== '105.00') {
                throw new Error(`Expected result to be 105.00, but got ${ result }`);
            }
        });

        it('should calculate correct amount when discount is updated with a positive number', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                discount: '5.0'
            };

            const result = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts });
            if (result !== '105.00') {
                throw new Error(`Expected result to be 105.00, but got ${ result }`);
            }
        });

        it('should calculate correct amount when shipping_discount is updated with a negative number', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                discount: '-5.0'
            };

            const result = calculateTotalFromShippingBreakdownAmounts({ breakdown, updatedAmounts });
            if (result !== '105.00') {
                throw new Error(`Expected result to be 105.00, but got ${ result }`);
            }
        });
    });

    describe('buildBreakdown', () => {
        it('should build breakdown for shipping_discount to be positive if sent as negative', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                shipping_discount: '-5.0'
            };

            const expectedResult = JSON.stringify({"item_total":{"value":"100.0","currency_code":"USD"},"shipping":{"value":"10.0","currency_code":"USD"},"shipping_discount":{"currency_code":"USD","value":"5.00"}});
            const result = JSON.stringify(buildBreakdown({ breakdown, updatedAmounts }));

            if (result !== expectedResult) {
                throw new Error(`Expected result, ${ expectedResult } to match result, ${ result }`);
            }
        });

        it('should build breakdown for discount to be positive if sent as negative', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                discount: '-5.0'
            };

            const expectedResult = JSON.stringify({"item_total":{"value":"100.0","currency_code":"USD"},"shipping":{"value":"10.0","currency_code":"USD"},"discount":{"currency_code":"USD","value":"5.00"}});
            const result = JSON.stringify(buildBreakdown({ breakdown, updatedAmounts }));

            if (result !== expectedResult) {
                throw new Error(`Expected result, ${ expectedResult } to match result, ${ result }`);
            }
        });

        it('should build the breakdown request for shipping change patch call with updated amounts present in breakdown', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                handling: '5.0'
            };

            const expectedResult = JSON.stringify({"item_total":{"value":"100.0","currency_code":"USD"},"shipping":{"value":"10.0","currency_code":"USD"},"handling":{"currency_code":"USD","value":"5.0"}});
            const result = JSON.stringify(buildBreakdown({ breakdown, updatedAmounts }));

            if (result !== expectedResult) {
                throw new Error(`Expected result, ${ expectedResult } to match result, ${ result }`);
            }
        });

        it('should build the breakdown request for shipping change patch call with updated amounts not present in breakdown', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'USD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'USD'
                }
            };
            const updatedAmounts = {
                handling: '5.0'
            };

            const expectedResult = JSON.stringify({"item_total":{"value":"100.0","currency_code":"USD"},"shipping":{"value":"10.0","currency_code":"USD"},"handling":{"currency_code":"USD","value":"5.0"}});
            const result = JSON.stringify(buildBreakdown({ breakdown, updatedAmounts }));
            if (result !== expectedResult) {
                throw new Error(`Expected result, ${ expectedResult } to match result, ${ result }`);
            }
        });


        it('should build the breakdown request for shipping change patch call with updated amounts present in breakdown with correct currency code', () => {
            const breakdown = {
                item_total: {
                    value: '100.0',
                    currency_code: 'CAD'
                },
                shipping: {
                    value: '10.0',
                    currency_code: 'CAD'
                },
                handling: {
                    value: '1.0',
                    currency_code: 'CAD'
                }
            };
            const updatedAmounts = {
                handling: '5.0'
            };

            const expectedResult = JSON.stringify({"item_total":{"value":"100.0","currency_code":"CAD"},"shipping":{"value":"10.0","currency_code":"CAD"},"handling":{"value":"5.0","currency_code":"CAD"}});
            const result = JSON.stringify(buildBreakdown({ breakdown, updatedAmounts }));
            if (result !== expectedResult) {
                throw new Error(`Expected result, ${ expectedResult } to match result, ${ result }`);
            }
        });
    });

    describe('convertQueriesToArray', () => {
        const shippingOptions = [
            {
                id: "SHIP_1234",
                label: "Free Shipping",
                type: "SHIPPING",
                selected: true,
                amount: {
                    value: "0.00",
                    currency_code: "USD"
                }
            },
            {
                id: "SHIP_123",
                label: "Shipping",
                type: "SHIPPING",
                selected: false,
                amount: {
                    value: "20.00",
                    currency_code: "USD"
                }
            },
            {
                id: "SHIP_124",
                label: "Overnight",
                type: "SHIPPING",
                selected: false,
                amount: {
                    value: "40.00",
                    currency_code: "USD"
                }
            }
        ];
        const breakdown = {
            item_total: {
                value: '100.0',
                currency_code: 'USD'
            },
            shipping: {
                value: '10.0',
                currency_code: 'USD'
            }
        };

        it('should convert object amount queries to array', () => {
            const queries = {
                [ON_SHIPPING_CHANGE_PATHS.AMOUNT]: {
                    op:       'replace',
                    path:     ON_SHIPPING_CHANGE_PATHS.AMOUNT,
                    value: {
                        value:         '110.0',
                        currency_code: 'USD',
                        breakdown
                    }
                }
            };

            const expectedResult = JSON.stringify([{"op":"replace","path":"/purchase_units/@reference_id=='default'/amount","value":{"value":"110.0","currency_code":"USD","breakdown":{"item_total":{"value":"100.0","currency_code":"USD"},"shipping":{"value":"10.0","currency_code":"USD"}}}}]);
            const result = JSON.stringify(convertQueriesToArray({ queries }));

            if (result !== expectedResult) {
                throw new Error(`Expected result to match result. ${ JSON.stringify(result) }`);
            }
        });

        it('should convert object options queries to array', () => {
            const queries = {
                [ON_SHIPPING_CHANGE_PATHS.OPTIONS]: {
                    op:    'replace',
                    path:  ON_SHIPPING_CHANGE_PATHS.OPTIONS,
                    value: shippingOptions
                }
            };

            const expectedResult = JSON.stringify([{"op":"replace","path":"/purchase_units/@reference_id=='default'/shipping/options","value":[{"id":"SHIP_1234","label":"Free Shipping","type":"SHIPPING","selected":true,"amount":{"value":"0.00","currency_code":"USD"}},{"id":"SHIP_123","label":"Shipping","type":"SHIPPING","selected":false,"amount":{"value":"20.00","currency_code":"USD"}},{"id":"SHIP_124","label":"Overnight","type":"SHIPPING","selected":false,"amount":{"value":"40.00","currency_code":"USD"}}]}]);
            const result = JSON.stringify(convertQueriesToArray({ queries }));

            if (result !== expectedResult) {
                throw new Error(`Expected result to match result. ${ JSON.stringify(result) }`);
            }
        });

        it('should convert object amount and options queries to array', () => {
            const queries = {
                [ON_SHIPPING_CHANGE_PATHS.AMOUNT]: {
                    op:       'replace',
                    path:     ON_SHIPPING_CHANGE_PATHS.AMOUNT,
                    value: {
                        value:         '110.0',
                        currency_code: 'USD',
                        breakdown
                    }
                },
                [ON_SHIPPING_CHANGE_PATHS.OPTIONS]: {
                    op:    'replace',
                    path:  ON_SHIPPING_CHANGE_PATHS.OPTIONS,
                    value: shippingOptions
                }
            };

            const expectedResult = JSON.stringify([{"op":"replace","path":"/purchase_units/@reference_id=='default'/amount","value":{"value":"110.0","currency_code":"USD","breakdown":{"item_total":{"value":"100.0","currency_code":"USD"},"shipping":{"value":"10.0","currency_code":"USD"}}}},{"op":"replace","path":"/purchase_units/@reference_id=='default'/shipping/options","value":[{"id":"SHIP_1234","label":"Free Shipping","type":"SHIPPING","selected":true,"amount":{"value":"0.00","currency_code":"USD"}},{"id":"SHIP_123","label":"Shipping","type":"SHIPPING","selected":false,"amount":{"value":"20.00","currency_code":"USD"}},{"id":"SHIP_124","label":"Overnight","type":"SHIPPING","selected":false,"amount":{"value":"40.00","currency_code":"USD"}}]}]);
            const result = JSON.stringify(convertQueriesToArray({ queries }));

            if (result !== expectedResult) {
                throw new Error(`Expected result to match result. ${ JSON.stringify(result) }`);
            }
        });
    });

    describe('updateOptions', () => {
        const shippingOptions = [
            {
                id: "SHIP_1234",
                label: "Free Shipping",
                type: "SHIPPING",
                selected: true,
                amount: {
                    value: "0.00",
                    currency_code: "USD"
                }
            },
            {
                id: "SHIP_123",
                label: "Shipping",
                type: "SHIPPING",
                selected: false,
                amount: {
                    value: "20.00",
                    currency_code: "USD"
                }
            },
            {
                id: "SHIP_124",
                label: "Overnight",
                type: "SHIPPING",
                selected: false,
                amount: {
                    value: "40.00",
                    currency_code: "USD"
                }
            }
        ];

        it('should update options with selected option', () => {
            const selectedShippingOption = {
                id: "SHIP_123",
                label: "Shipping",
                type: "SHIPPING",
                selected: true,
                amount: {
                    value: "20.00",
                    currency_code: "USD"
                }
            };

            const result = updateShippingOptions({ option: selectedShippingOption, options: shippingOptions });
            result.forEach(option => {
                if (option.selected && option.label !== 'Shipping') {
                    throw new Error(`Expected selected option to be SHIP_123.`);
                }
            })
        });
    });
});
