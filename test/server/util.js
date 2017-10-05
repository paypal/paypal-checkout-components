
export function regexMap(str, regex, handler = (x => x)) {
    let results = [];
    
    str.replace(regex, function regexMapMatcher() {
        results.push(handler.call(null, arguments));
    });

    return results;
}