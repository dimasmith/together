Together
========

Application for simultaneous photo viewing. Photo switching is synchronized
 between all connected users.

## Running installed module

Use command line client `together.js` to run application from within installed
module directory.

CLI requires `photos` parameter to be passed and pointing do directory with images.

Example:
```
cd node_modules/@dimasmith/together

./together --photos=~/Pictures
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
