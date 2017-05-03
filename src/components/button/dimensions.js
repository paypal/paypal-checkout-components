/* @flow */

export function getDimensions(container : HTMLElement, size : string = 'small') : ?{ width? : string, height? : string } {
    if (size === 'responsive') {
        let width = container.offsetWidth;

        if (width) {
            if (width < 200) {
                return { height: '42px' };
            } else if (width < 300) {
                return { height: '48px' };
            } else {
                return { height: '60px' };
            }
        }
    }
}
