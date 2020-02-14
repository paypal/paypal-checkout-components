/* @flow */
/** @jsx h */

import { h, Fragment, type Node } from 'preact';

import { Style } from './style';

type PageProps = {|
    children : Node
|};

export function Page({ children } : PageProps) : Node {
    return (
        <Fragment>
            <Style>
                {`
                    html, body {
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        overflow: hidden;
                    }

                    body {
                        font-family: Helvetica Neue,HelveticaNeue,HelveticaNeue-Light,Helvetica Neue Light,helvetica,arial,sans-serif;
                        vertical-align: top;
                        border-collapse: collapse;
                    }

                    * {
                        user-select: none;
                        cursor: default;
                        box-sizing: border-box;
                    }
                `}
            </Style>
            { children }
        </Fragment>
    );
}
