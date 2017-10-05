
export default (req, ctx) => {

    return `
        <!DOCTYPE html>

        <html lang="en">
            <head>
                <meta charset="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                <meta name="robots" content="noindex" />

                <title>PayPal</title>

                <script>
                    window.pre = {};
                    window.preload = function(method, url, data, name) {
                        window.pre[name] = { method: method, uri: url, res: data };
                    };
                    window.preloadComplete = function() {};
                </script>
            </head>
    `;
};
