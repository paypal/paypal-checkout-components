
import React from 'react';
import { Link } from 'react-router';

import { Header } from './header';
import { Editor } from './editor';
import { Code } from './code';

import * as patterns from '../patterns';

export let App = React.createClass({

    getInitialState() {
        return {};
    },

    onChangeCode(code) {
        this.setState({ code });
    },

    componentWillMount() {
        if (window.location.hash === '#/') {
            window.location.hash = '#/pattern/client';
        }
    },

    render() {
        let patternName = this.props.params.pattern || 'client';
        let activePattern = patterns[patternName];

        return (
            <div>
                <Header />

                <div className="main">
                    <div className="column-left">
                        <ul>
                            {
                                Object.keys(patterns).map(pattern =>
                                    <Link to={`/pattern/${pattern}`} key={pattern} activeClassName="active">
                                        <li>
                                            <span className="bullet"></span>
                                            <span>{ patterns[pattern].name }</span>
                                        </li>
                                    </Link>
                                )
                            }
                        </ul>
                    </div>

                    <div className="column-middle">
                        <div className="demo">
                            <h3>{activePattern.fullName}</h3>
                            {activePattern.description}
                            <hr />
                            <Code pattern={patternName} code={this.state.code} />
                        </div>
                    </div>

                    <div className="column-right">
                        <Editor code={activePattern.code()} onChange={val => this.onChangeCode(val)} />
                    </div>
                </div>
            </div>
        );
    }
});
