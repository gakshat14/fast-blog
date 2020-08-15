import { Configuration } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production' ? true : false;

interface IConfiguration extends Configuration {
    devServer: any;
}

const config: IConfiguration = {
    resolve: { extensions: ['.js', '.ts', '.tsx'] },

    // place from where the apoplication will start and as well as build
    entry: { flat_blog: './src/index' },

    // place where the output will be stored
    output: {
        filename: '[name].[hash:8].js',
        // this is used when we are using code splitting with dynamic import
        chunkFilename: '[name].[chunkhash:8].chunk.js',
        // Output location
        path: path.resolve(__dirname, 'dist'),
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.json',
                            experimentalWatchApi: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            inject: 'body',
            hash: true,
        }),
    ],
    devtool: isProduction ? undefined : '#source-map',
    mode: isProduction ? 'production' : 'development',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        usedExports: true
    },
    devServer: {
        port: 3000,
        hot: true,
        hotOnly: true,
        inline: true,
        https: true,
        host: '0.0.0.0',
        overlay: true,
        disableHostCheck: true,
        compress: true,
        clientLogLevel: 'info',
        historyApiFallback: true,
    }
}

console.log(process.env.NODE_ENV);

export default config;
