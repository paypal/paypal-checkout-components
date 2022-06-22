/* @flow */
/* eslint import/no-namespace: off */

import * as graphqlAPI from './api'
import { enableVault } from './order';

describe('order api', () => {
    it('Call enableVault directly', async () => {
        const callgraphqlCall = jest.spyOn(graphqlAPI, 'callGraphQL').mockImplementationOnce(jest.fn())
        await enableVault({orderID:'', 
            buttonSessionID:"xxxxxxx",
            clientAccessToken:"xxxxxxx",
            fundingSource:"PAYPAL",
            integrationArtifact:"xxxxx",
            productFlow:"xxxxxxx",
            userExperienceFlow:"xxxxx"
        })
        expect(callgraphqlCall).toBeCalled()
    });

});
