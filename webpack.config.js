module.exports = {
    module: {
        rules: [
            {
                exclude: /node_modules/, // don't transpile node_modules
                test: /\.js[x]?$/,          // do transpile any files ending in .jsx
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: ['../node_modules/babel-plugin-transform-react-jsx']
                    }
                }
            }
        ]
    }
};