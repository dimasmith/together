[![Build Status](https://travis-ci.org/dimasmith/together.svg?branch=dev)](https://travis-ci.org/dimasmith/together)

Together
========

Application for simultaneous photo viewing.

All actions made by any of viewers (like going to next photo or open photo list page)
are immediately duplicated in browsers of all other viewers.

## Use case

Once a friend of mine vent to long vacation. He wanted to share some photos and comment on some of those.
We started a skype conversation with screen sharing but video quality was pretty bad.
This application allows to show all photos from directory and synchronize actions of viewers.
Say when friend goes to next photo the same photo is shown to me. So he can tell me about that photo on
skype without having issues with video quality. I can also go to any photo that is interesting for me
and ask him to tell about that one. My actions will be synchronized to him as well.

Please note I'm not considering this as a serious application, more like playground to learn
javascript and node.js.

## Installing

`npm install @dimasmith/together`

## Running installed module

Command line client is provided for package.
Note that in order to serve properly you need to run
it either from installed module directory
(`node_modules/@dimasmith/together`) or specify this directory
as `--cwd` parameter.

```
Usage: together [options] <photos-dir>

  Starts server and show photos from specified dir

  Options:

    -h, --help        output usage information
    -V, --version     output the version number
    -p --port [port]  Server port
    -w --cwd <dir>    Application working directory

```

## Starting

Start server using `npm start`

Navigate to [http://localhost:8000](http://localhost:8000)

Host and port may be customized by setting environment variables `SERVER_HOST`
and `SERVER_PORT` respectively.

## Compilation

Before running server all sources should be compiled using
[webpack](http://webpack.github.io).

Compilation script is available in `package.json`. In order to run compilation use
`npm run-script compile`

## Development mode

By default server is started in development mode. It starts
[webpack dev server](http://webpack.github.io/docs/webpack-dev-server.html)
in proxy mode for main server.

Navigate to [http://localhost:9000/webpack-dev-server/](http://localhost:9000/webpack-dev-server/)

Dev server port can be changed by setting `DEV_SERVER_PORT` environment variable.

To disable development server set `NODE_ENV` variable to `production`
