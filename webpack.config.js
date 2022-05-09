//import시 require()
//node.js의 전역에서 path라는 모듈 불러오기

const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')

//export시 module.exports = {}
module.exports = (env, options) => {
  console.log(env, options)
  return {
    resolve: {
      // 현 프로젝트에 .js .vue 파일들은 확장자 명시없이도 문제없도록 설정
      extensions: ['.js', '.vue'],
      alias: {
        '~': `${__dirname}/src`
      }
    },
    // 파일을 읽기 시작하는 첫 진입점. js파일
    entry: './src/main.js',
    // 컴파일된 결과물 관련 설정
    output: {
      //결과물 절대경로를 설정.
      publicPath: '/',
      clean: true
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'postcss-loader',
            {
              loader: 'sass-loader',
            }
          ]
        }
      ]
    },
    //플러그인 추가하기
    //번들링 후 결과물의 처리 방식 등 다양한 설정을 적용하는 곳
    plugins: [
      //불러온 HtmlPlugin을 생성자 함수 형태 'new'로 실행 -> 결과가 반환되어 plugins의 배열 데이터에 담길 것
      new HtmlPlugin({
        //플러그인의 옵션은 객체형태로 넣는다
        template: './src/index.html',
      }),
      new CopyPlugin({
        //설정한 폴더 안 내용을 복사해주는 플러그인
        patterns: [
          { from: 'static' }, //생성한 static폴더 안 내용을 번들링으로 설정한 폴더 안으로 복사하도록 설정
        ],
      }),
      new VueLoaderPlugin(),

      new webpack.DefinePlugin({ __VUE_OPTIONS_API__: true, __VUE_PROD_DEVTOOLS__: true }),
    ],

    //개발서버 명시하는 설정 추가
    devServer: {
      host: 'localhost',
      historyApiFallback: true
    },
  }
}
