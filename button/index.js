'use strict'; // eslint-disable-line strict

require('module-babel')(__dirname);

let indexTemplate = require('./templates/index').indexTemplate;
let buttonTemplate = require('./templates/button').buttonTemplate;

module.exports = {
    getIndexTemplate: () => indexTemplate,
    getButtonTemplate: () => buttonTemplate
};