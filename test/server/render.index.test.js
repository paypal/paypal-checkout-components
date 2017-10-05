
import renderIndex from '../../button/templates/index';

import { mockReq, mockContext } from './mock';

test('should do a basic index render and succeed', () => {

    let req = mockReq();
    let ctx = mockContext();

    renderIndex(req, ctx);
});
