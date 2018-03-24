module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        plugins: ['../node_modules/babel-plugin-transform-react-jsx']
                    }
                }
            },
            {
                exclude: /node_modules/, // don't transpile node_modules
                test: /\.jsx$/,          // do transpile any files ending in .jsx
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