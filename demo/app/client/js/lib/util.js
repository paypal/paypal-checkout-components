
export function stripIndent(str) {
	const match = str.match(/^[ \t]*(?=\S)/gm);

	if (!match) {
		return str;
	}

	const indent = Math.min.apply(Math, match.map(x => x.length)); // eslint-disable-line
	const re = new RegExp(`^[ \\t]{${indent}}`, 'gm');

	return indent > 0 ? str.replace(re, '') : str;
}

export function debounce(method, time = 500) {

    let timeout;

    return function() {

        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            return method.apply(this, arguments);
        }, time);
    };
}
