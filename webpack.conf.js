import webpack from 'webpack';

export let FILE_NAME = 'checkout';
export let MODULE_NAME = 'paypal';

function getNextVersion() {
    let version = require('./package.json').version;
    version = version.split('.');
    version[2] = (parseInt(version[2]) + 1).toString();
    version = version.join('.');
    return version;
}

function getNextMajorVersion() {
    return getNextVersion().split('.')[0];
}

function getNextMinorVersion() {
    return getNextVersion();
}

function getVersionVars() {
    return {
        __MAJOR_VERSION__: JSON.stringify(getNextMajorVersion()),
        __MINOR_VERSION__: JSON.stringify(getNextMinorVersion())
    };
}

function getWebpackConfig({ version, filename, modulename = MODULE_NAME, target = 'window', minify = false }) {

    return {
        module: {
            loaders: [
                {
                    test: /sinon\.js$/,
                    loader: "imports?define=>false,require=>false"
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(sinon|chai)/,
                    loader: 'babel'
                },
                {
                    test: /\.(html?|css|json)$/,
                    loader: 'raw-loader'
                }
            ]
        },
        output: {
            filename: filename,
            libraryTarget: target,
            umdNamedDefine: true,
            library: modulename,
            pathinfo: false
        },
        bail: true,
        devtool: 'source-map',
        resolve: {
            extensions: [ '', '.js', '.jsx' ],
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                test: /\.js$/,
                beautify: !minify,
                minimize: minify,
                compress: minify ? { warnings: false } : false,
                mangle: minify,
            }),
            new webpack.DefinePlugin({
                __TEST__: false,
                __FILE_NAME__: JSON.stringify(filename),
                __FILE_VERSION__: JSON.stringify(version),
                ...getVersionVars()
            }),
            new webpack.NamedModulesPlugin()
        ]
    };
}

let nextMajorVersion = getNextMajorVersion();
let nextMinorVersion = getNextMinorVersion();

export let webpack_tasks = {

    major: {
        src: 'src/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.js`
        })
    },

    minor: {
        src: 'src/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMinorVersion,
            filename: `${FILE_NAME}.${nextMinorVersion}.js`
        })
    },

    major_min: {
        src: 'src/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.min.js`,
            minify: true
        })
    },

    minor_min: {
        src: 'src/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMinorVersion,
            filename: `${FILE_NAME}.${nextMinorVersion}.min.js`,
            minify: true
        })
    },

    lib: {
        src: 'src/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `${FILE_NAME}.lib.js`,
            target: `umd`
        })
    },

    demo: {
        src: 'demo/app/client/js/index.jsx',
        out: 'demo/app/build',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `demo.js`,
            modulename: `ppdemo`
        })
    },

    child_loader: {
        src: 'src/loader/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `checkout.child.loader.js`
        })
    },

    child_loader_min: {
        src: 'src/loader/index.js',
        out: 'dist',
        cfg: getWebpackConfig({
            version: nextMajorVersion,
            filename: `checkout.child.loader.min.js`,
            minify: true
        })
    }
};
