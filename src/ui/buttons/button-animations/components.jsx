/* @flow */
/** @jsx node */
import { node, Fragment } from 'jsx-pragmatic/src';

import { getDivideLogoAnimationLabelAndStyles } from './index';

export type LabelOptions = {|
    enableDivideLogoAnimation : ?boolean
|};

export function LabelTextForDivideLogoAnimation({ enableDivideLogoAnimation } : LabelOptions) : void {
    const config = getDivideLogoAnimationLabelAndStyles(enableDivideLogoAnimation);
    if (!config) {
        return;
    }

    return (
        <Fragment>
            <div class={ config.labelClass }> <span>{config.labelText}</span></div>
            <style innerHTML={ config.styles } />;
        </Fragment>
    );
}
