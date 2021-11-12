/* @flow */
/** @jsx node */
import { node, Fragment, type ChildType } from 'jsx-pragmatic/src';
import { LOGO_CLASS } from '@paypal/sdk-logos/src';

import { CLASS } from '../../../constants';

import { type LabelOptions } from './types';

export function ButtonDesignComponent({ designLabelText } : LabelOptions) : ChildType {
    return (
        <Fragment>
            <div class={ 'personalized-label-container' } data-animation-experiment="Varied_Button_Design"> <span>{designLabelText}</span></div>
            <style innerHTML={ `
              .${ CLASS.DOM_READY } .personalized-design-container img.${ LOGO_CLASS.LOGO }{
                  position: relative;
              }
              
              .personalized-design-container .personalized-label-container {
                  position: absolute;
                  opacity: 0; 
                  color: #142C8E;
                  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                  font-size: 14px;
              }

              .personalized-design-container .personalized-label-container span {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-around;
              }
          ` } />;
        </Fragment>
    );
}
