
import React from 'react';

import { stripIndent, debounce } from '../lib';

export let Editor = React.createClass({

    render: () => (
        <div id="editor" className="editor"></div>
    ),

    getInitialState() {
        return {
            code: stripIndent(this.props.code)
        };
    },

    shouldComponentUpdate(nextProps, nextState) {
        return this.props.code !== nextProps.code;
    },

    componentDidMount() {

        let editor = ace.edit('editor');
        editor.setTheme('ace/theme/monokai');
        editor.getSession().setMode('ace/mode/html');
        editor.setShowPrintMargin(false);
        editor.$blockScrolling = Infinity;

        editor.getSession().on('change', debounce(() => {
            let value = editor.getValue();
            if (this.props.onChange && value) {
                this.props.onChange(value);
            }
        }, 300));

        editor.setValue(stripIndent(this.props.code), -1);

        this.setState({ editor: editor });
    },

    componentWillUpdate: function(nextProps, nextState){
        nextState.editor.setValue(stripIndent(nextProps.code), -1);
    }
});
