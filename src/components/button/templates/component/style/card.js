/* @flow */

import { CLASS } from './class';

export let cardStyle = `

    .${ CLASS.CARD } img {
        height: 100%;
    }

    @media only screen and (max-width: 150px) {
        .${ CLASS.CARD } {
            display: none;
        }
    }

    @media only screen and (min-width: 150px) {
        .${ CLASS.CARD } {
            display: inline-block;
        }
    }
`;
