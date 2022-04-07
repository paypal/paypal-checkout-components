/* @flow */
/* eslint  max-nested-callbacks: off */
/* eslint  max-lines: off */
import { wrapPromise } from '@krakenjs/belter/src';
import { FUNDING } from '@paypal/sdk-constants';

import type { SmartFields } from '../../src/types';
import { getSmartFieldsByFundingSource } from '../../src/lib/comms';

import { renderSmartFieldsMock, createButtonHTML, mockSetupButton, clickButton  } from './mocks';


describe('smart-fields', () => {

    describe('ideal', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.IDEAL;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm for ideal if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.IDEAL;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
   

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm for ideal if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.IDEAL;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
       

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });


    describe('p24', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.P24;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm for p24 if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.P24;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };


                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm for p24 if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.P24;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };


                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });

    describe('blik', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.BLIK;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.BLIK;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should NOT call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.BLIK;

                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };


                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });

    describe('eps', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.EPS;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
    
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.EPS;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.EPS;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });

    describe('giropay', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.GIROPAY;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
    
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.GIROPAY;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    
                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.GIROPAY;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });

    describe('mybank', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.MYBANK;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
    
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.MYBANK;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };


                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.MYBANK;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });

    describe('sofort', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.SOFORT;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.SOFORT;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
            

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.SOFORT;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    
                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });


    describe('trustly', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.TRUSTLY;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }

                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.TRUSTLY;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.TRUSTLY;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });

    describe('verkkopankki', () => {
        it('should get the smartfields correctly via getSmartFieldsByFundingSource', async () => {
            return await wrapPromise(({ expect }) => {
    
                const fundingSource = FUNDING.VERKKOPANKKI;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const smartFields : ?SmartFields = getSmartFieldsByFundingSource(fundingSource);
    
                if (!smartFields) {
                    throw new Error('smartfields not found');
                } else {
                    if (smartFields.name !== 'smart-fields') {
                        throw new Error('name incorrect');
                    }
    
                    if (smartFields.fundingSource !== fundingSource) {
                        throw new Error('fundingSource incorrect');
                    }
    
                    if (smartFields.isValid()) {
                        throw new Error('inValid incorrect');
                    }
                }
                
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should call confirm if valid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.VERKKOPANKKI;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => true)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    

                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });

        it('should not call confirm if invalid', async () => {
            return await wrapPromise(async ({ expect }) => {
    
                const fundingSource = FUNDING.VERKKOPANKKI;
    
                const smartFieldsIfrm = renderSmartFieldsMock({
                    fundingSource,
                    isValid:       expect('isValid', () => false)
                });
    
                const fundingEligibility = {
                    [fundingSource]: {
                        eligible: true
                    }
                };
    
                createButtonHTML({ fundingEligibility });
    
                await mockSetupButton({
                    merchantID:         [ 'XYZ12345' ],
                    fundingEligibility
                });
    
                await clickButton(fundingSource);
    
                smartFieldsIfrm.done();
    
            });
        });
    });
});
