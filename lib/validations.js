import config from './buttonConfig';
import BUTTON_CONTENT from './buttonContent';


export function getValidSize(size) {
    return (size && config.buttonSizes.indexOf(size) > -1) ? size : config.DEFAULT_SIZE;
}

export function getValidColor(color) {
    return (color && config.buttonColors.indexOf(color) > -1) ? color : config.DEFAULT_COLOR;
}

export function getValidShape(shape) {
    return (shape && config.buttonShapes.indexOf(shape) > -1) ? shape : config.DEFAULT_SHAPE;
}

export function getValidLocale(locale) {
    return (locale && BUTTON_CONTENT[locale]) ? locale : config.DEFAULT_LOCALE;
}

export function getValidLabel(label) {
    return (label && config.buttonLabels.indexOf(label) > -1) ? label : config.DEFAULT_LABEL;
}