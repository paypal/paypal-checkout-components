
require('module-babel')(__dirname);

import { indexTemplate } from './templates/index';
import { buttonTemplate } from './templates/button';

module.exports = {
    getIndexTemplate: () => indexTemplate,
    getButtonTemplate: () => buttonTemplate
};