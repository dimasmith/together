Build scripts
=============

Backend is built with single webpack script - `backend.js`. It is environment-agnostic.

Front-end (resulting in `dist/client.bundle.js` is another story). It is aggressively minified
on production and have a proper source map. In development minification is turned off and
eval strings are used as dev tool (see webpack documentation for details).

`frontend.js` contains base configuration of build and is not directly usable. It is extended in
`frontend.dev.js` and `frontend.prod.js` for DEV and PROD profiles respectively.

`frontend.dev.js` is used by `dev proxy` directly for in-memory compilation. It does not end up in
any files on disk.

`frontend.prod.js` is used in `compile` and `prepublish` scripts and generated frontend bundle
for package users.
