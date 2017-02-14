
import React from 'react';
import { Link } from 'react-router';

import { Header } from './header';
import { Editor } from './editor';
import { Code } from './code';

import * as patterns from '../patterns';

export let App = React.createClass({

    getInitialState() {
        return {
            env: 'sandbox'
        };
    },

    onChangeCode(code) {
        this.setState({ code });
    },

    componentWillMount() {
        if (window.location.hash === '#/') {
            window.location.hash = '#/pattern/client';
        }
    },

    onChangeEnv(env) {
        this.setState({ env });
    },

    render() {
        let patternName = this.props.params.pattern || 'client';
        let activePattern = patterns[patternName];

        return (
            <div>
                <Header onChangeEnv={ env => this.onChangeEnv(env) } />

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
                            {activePattern.intro}
                            <hr />
                            <Code pattern={patternName} code={this.state.code} />
                            <hr />
                            {activePattern.description}
                        </div>
                    </div>

                    <div className="column-right">
                        <Editor code={activePattern.code({ env: this.state.env })} onChange={val => this.onChangeCode(val)} />
                    </div>
                </div>
            </div>
        );
    }
});
