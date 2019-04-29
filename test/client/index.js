/* @flow */

import { setupMocks } from './mocks';

import './happy';
import './actions';
import './auth';
import './contingency';
import './funding';
import './error';
import './eligibility';
import './validation';
import './prerender';
import './vault';
import './clientConfig';
import './popupBridge';

beforeEach(() => {
    setupMocks();
});
