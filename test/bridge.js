
import 'src/index';
import './tests/common';

import postRobot from 'post-robot/src/index';

postRobot.sendToParent('meta', {
    locale: 'en_US',
    iframeEligible: false,
    iframeEligibleReason: 'test'
});
