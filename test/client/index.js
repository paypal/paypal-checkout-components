/* @flow */

import { setupMocks } from './mocks';

import './happy';
import './actions';
import './auth';
import './contingency';
import './funding';
import './wallet';
import './error';
import './eligibility';
import './validation';
import './prerender';
import './vault';
import './clientConfig';
import './popupBridge';
import './card';
import './native';
import './nativePopup';
import './nativeFallback';
import './payee';
import './connect';
import './smart-fields';
import './popup';

beforeEach(() => {
    setupMocks();
});
