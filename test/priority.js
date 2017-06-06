import assert from 'assert';
import { sortedFI } from '../config/helper';

describe('Funding Icons priority', () => {

    it(`Should render correct order of funding icons for the most common case`, async () => {

        let returned = sortedFI(['MASTERCARD', 'JCB', 'VISA', 'AMEX', 'DISCOVER']);
        let expected = `<div class="cardIcons VISA"></div><div class="cardIcons MASTERCARD"></div><div class="cardIcons DISCOVER"></div><div class="cardIcons AMEX"></div>`;

        assert(returned.indexOf(expected) > -1, 'Funding icons not in correct order');
    });

    it(`Should render correct order for funding icons`, async () => {

        let returned = sortedFI(['ELO', 'JCB', 'VISA', 'CBNATIONALE', 'CUP']);
        let expected = `<div class="cardIcons VISA"></div><div class="cardIcons ELO"></div><div class="cardIcons JCB"></div><div class="cardIcons CUP"></div>`;

        assert(returned.indexOf(expected) > -1, 'Funding icons not in correct order');
    });

    it(`Should render correct order for funding icons with duplicate entries`, async () => {

        let returned = sortedFI(['MAESTRO', 'SWITCH', 'CBNATIONALE', 'CUP', 'CETELEM']);
        let expected = `<div class="cardIcons CUP"></div><div class="cardIcons MAESTRO"></div><div class="cardIcons CETELEM"></div><div class="cardIcons CBNATIONALE"></div>`;

        assert(returned.indexOf(expected) > -1, returned);
    });

    it(`Should throw error for invalid funding icon entry`, async () => {

        let error;
        try {
            sortedFI(['VISA', 'MASTERCARD', 'DISCOVER', 'AMEX', 'FOO']);
        } catch (err) {
            error = err;
        }

        if (!(error instanceof Error)) {
            throw new Error(`Invalid error`);
        }
    });


});
