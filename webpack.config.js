const path = require(`path`);

module.exports = {
    mode: `development`,
    entry: `./src/main.js`,
    output: {
        filename: `bundle.js`,
        path: path.join(__dirname, `public`)
    }
    devtool: `source-map`
    // devServer: {
    //     contntBase: path.join(__dirname, `public`),
    //     watchContentBase: true
    // }
}