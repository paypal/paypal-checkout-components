/* @flow */

import { setupSDK } from '@paypal/sdk-client/src';

import * as paypalButtons from './src/interface/button'; // eslint-disable-line import/no-namespace
import * as paypalMarks from './src/interface/marks'; // eslint-disable-line import/no-namespace

setupSDK([
    {
        name:     'buttons',
        requirer: () => paypalButtons
    },
    {
        name:     'marks',
        requirer: () => paypalMarks
    }
]);
