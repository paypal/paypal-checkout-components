/* @flow */
/** @jsx node */

import { node, Style, type ChildType, Fragment } from '@krakenjs/jsx-pragmatic/src';
import { PayuponinvoiceMark } from '@paypal/sdk-logos/src';

import { Text, Space } from '../../ui/text';

export function Mark({ ...props } : {||}) : ChildType {
    return (
      <Fragment>
        <PayuponinvoiceMark {...props}/>
        <Space /><Text animate optional>Rechnungskauf</Text>
      </Fragment>
    );
}
