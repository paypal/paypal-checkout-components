/* @flow */

export function getDimensions(container : HTMLElement, size : string = 'small') : { width : string, height : string } {

    let responsiveHeight = '42px';

    if (size === 'responsive') {
        let width = container.offsetWidth;

        if (width < 100) {
            responsiveHeight = '22px';
        } else if (width < 200) {
            responsiveHeight = '42px';
        } else if (width < 300) {
            responsiveHeight = '48px';
        } else {
            responsiveHeight = '60px';
        }
    }

    return {

        tiny: {
            width: '80px',
            height: '22px'
        },

        small: {
            width: '148px',
            height: '42px'
        },

        medium: {
            width: '230px',
            height: '48px'
        },

        large: {
            width: '380px',
            height: '60px'
        },

        responsive: {
            width: '100%',
            height: responsiveHeight
        }

    }[size];
}
