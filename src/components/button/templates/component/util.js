/* @flow */
/* @jsx jsxToHTML */

export function encode(html : string = '') : string {
    return html.toString()
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\//g, '&#x2F;');
}

export function perc(pixels : number, percentage : number) : number {
    return Math.round((pixels * percentage) / 100);
}

export function min(...args : Array<number>) : number {
    return Math.min(...args);
}

export function max(...args : Array<number>) : number {
    return Math.max(...args);
}

// eslint-disable-next-line no-use-before-define
type ChildType = $ReadOnlyArray<ChildType> | JsxHTMLNode | string | void | null;
type ChildrenType = $ReadOnlyArray<ChildType>;
type PropsType = ?{ class? : string, id? : string, innerHTML? : string };

export class JsxHTMLNode {
    name : string
    props : PropsType
    children : ChildrenType

    constructor(name : string, props : PropsType, children : ChildrenType) {
        this.name     = name;
        this.props    = props;
        this.children = children;
    }

    toString() : string {
        return `<${ this.name }${ this.props ? ' ' : '' }${ this.props ? this.propsToString() : '' }>${ this.childrenToString() }</${ this.name }>`;
    }

    propsToString() : string {
        let props = this.props;

        if (!props) {
            return '';
        }

        return Object.keys(props).filter(key => {
            return key !== 'innerHTML' && props && props[key] !== false;
        }).map(key => {
            if (props && props[key] === true) {
                return `${ encode(key) }`;
            }
            return props ? `${ encode(key) }="${ encode(props[key]) }"` : '';
        }).join(' ');
    }

    childrenToString() : string {

        if (this.props && this.props.innerHTML) {
            return this.props.innerHTML;
        }

        if (!this.children) {
            return '';
        }

        let result  = '';

        function iterate(children) {
            for (let child of children) {

                if (child === null || child === undefined) {
                    continue;
                }

                if (Array.isArray(child)) {
                    iterate(child);
                } else if (child instanceof JsxHTMLNode) {
                    result += child.toString();
                } else {
                    result += encode(child);
                }
            }
        }

        iterate(this.children);

        return result;
    }
}

export class JsxHTMLNodeContainer extends JsxHTMLNode {


    constructor(children : ChildrenType) {
        super('', {}, children);
    }

    toString() : string {
        return this.childrenToString();
    }
}

export function jsxToHTML(name : string, props : PropsType, ...children : ChildrenType) : JsxHTMLNode {
    return new JsxHTMLNode(name, props, children);
}

function regexMap<T>(str : string, regex : RegExp, handler : () => T) : Array<T> {
    let results = [];

    // $FlowFixMe
    str.replace(regex, function regexMapMatcher() {
        results.push(handler.apply(null, arguments));
    });

    return results;
}

export function render(template : string, renderers : { [string] : (string) => ?(JsxHTMLNode | Array<JsxHTMLNode>) }) : JsxHTMLNode {

    // eslint-disable-next-line security/detect-unsafe-regex
    let nodes = regexMap(template, /\{\s*([a-z]+)(?::\s*([^} ]+))?\s*\}|([^${}]+)/g, (match, type, value, text) => {
        if (type) {
            if (!renderers[type]) {
                throw new Error(`Can not render type: ${ type }`);
            }

            return renderers[type](value);
        } else if (text && text.trim()) {

            if (!renderers.text) {
                return text;
            }

            return renderers.text(text);
        } else {
            return text;
        }
    });

    return new JsxHTMLNodeContainer(nodes);
}
