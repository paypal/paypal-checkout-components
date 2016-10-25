import _ from 'underscore';
import Bluebird from 'bluebird';
import Handlebars from 'handlebars';
import fs from 'fs';
import { getButtonConfig } from './builder';

let readFile = Bluebird.promisify(fs.readFile);

module.exports = async function renderer(path) {

    let template = await readFile(path, { encoding: 'utf8' });
    template = Handlebars.compile(template);

    return (ctx, req) => {

        _.extend(ctx, getButtonConfig(req));
        return template(ctx, req);
    };
};
