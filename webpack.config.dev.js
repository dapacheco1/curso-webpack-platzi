//path viene dentro de node.
const path = require('path');

//uso del plugin html
const HTMLWebpackPlugin = require('html-webpack-plugin');

//loaders de css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//soporte de copy webpack
const CopyPlugin = require('copy-webpack-plugin');

//minimizer plugin
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

//plugin terser
const TerserPlugin = require('terser-webpack-plugin');


//uso de variables de entorno
const Dotenv = require('dotenv-webpack');

//modulo que se quiere exportar
module.exports = {

    //entry: punto de entrada de la app. Aqui conecta toda mi app y sus utilerias y archivos.
    entry:'./src/index.js',
    //hacia donde enviamos lo que prepara webpack puede ser carpeta y archivos. Por defecto es la carpeta dist.
    output:{
        //path.resolve permite saber donde se encuentra el proyecto, debemos usar el nombre del directorio
        //dist para seguir el estandar. Esta es la ruta donde se guarda nuestro dist.
        //El directorio de salida debe ser un path absoluto.
        path:path.resolve(__dirname,'dist'),
        //es el nombre del archivo final de salida
        filename: '[name].[contenthash].js',
        //Esta instrucción hace que webpack le agregue un hash ( un hash es una serie de caracteres 
        //aleatorios) y su extencion por medio de esas variables en el string
        assetModuleFilename:'assets/images/[hash][ext][query]',
    },
    mode:'development',
    watch:true,
    resolve:{
        //indica las extensiones que vamos a utilizar y va a identificar. 
        extensions: ['.js'],
        alias:{
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@images':path.resolve(__dirname,'src/assets/images/'),
        }
    },
    module:{
        //reglas con la que decimos como trabajar con los archivos.
        rules:[
            {
                //evaluar el tipo de extensiones con el que vamos a trabajar.
                //utiliza cualquier extension .mjs o .js
                test:/\.m?js$/,
                //excluimos los modulos de node
                exclude:/node_modules/,
            
                use:{
                    //especificamos el uso de babel
                    loader:'babel-loader'
                }
            },
            {
                //css o styl
                test:/\.css|styl$/i,
                use:[
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'stylus-loader',
                    ],
            },
            {
                test:/\.png/,
                type:'asset/resource'
            },
            {
                //leer archivos woff
                test:/\.(woff|woff2)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        // Habilita o deshabilita la transformación de archivos en base64.
                        limit:1000,
                        // Especifica el tipo MIME con el que se alineará el archivo. 
       // Los MIME Types (Multipurpose Internet Mail Extensions)
       // son la manera standard de mandar contenido a través de la red.
                        mimetype:'application/font-woff',
                        
       // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
       // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
       // ubuntu-regularhola.woff
                        name:"[name].[contenthash].[ext]",
                        
                        outputPath:"./assets/fonts/",
                        publicPath:"../assets/fonts/",
                        // AVISAR EXPLICITAMENTE SI ES UN MODULO
                        esModule:false,
                    },
                }
            }
        ]
    },
    //array de los plugins
    plugins:[
        new HTMLWebpackPlugin({
            inject:true,
            //toma el template, enlaza todo y el resultado de salida se llama index.html
            template:'./public/index.html',
            filename:'./index.html'
        }),
        new MiniCssExtractPlugin({

            filename:'assets/[name].[contenthash].css'
        }),
        new Dotenv(),
        new CopyPlugin({
            //elementos que vamos a utilizar
            patterns:[//defino desde donde y hacia donde se mueven. estamos copiando la carpeta
                {
                    from:path.resolve(__dirname,"src","assets/images"),
                    //destino de la copia de la carpeta
                    to:"assets/images",
                }
            ]
        }),
    ],

};