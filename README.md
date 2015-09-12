[![Build Status](https://travis-ci.org/dimasmith/together.svg?branch=dev)](https://travis-ci.org/dimasmith/together)

Together
========

Application for simultaneous photo viewing.

All actions made by any of viewers (like going to next photo or open photo list page)
are immediately duplicated in browsers of all other viewers.

# Using

## Motivation

Once a friend of mine vent to long vacation. He wanted to share some photos and comment on some of those.
We started a skype conversation with screen sharing but video quality was pretty bad.
This application allows to show all photos from directory and synchronize actions of viewers.
Say when friend goes to next photo the same photo is shown to me. So he can tell me about that photo on
skype without having issues with video quality. I can also go to any photo that is interesting for me
and ask him to tell about that one. My actions will be synchronized to him as well.

Please note I'm not considering this as a serious application, more like playground to learn
javascript and node.js.

## Installation

`npm install @dimasmith/together`

## Running

Command line client is provided for package.
Note that in order to serve properly you need to run
it either from installed module directory
(`node_modules/@dimasmith/together`) or specify this directory
as `--cwd` parameter. This annoyance is scheduled to be fixed in upcoming versions.

Assuming you are in `node_modules/@dimasmith/together`. Start application with
```bash
together <path-to-dir-with-photos>
```
Open [http://localhost:8000](http://localhost:8000)

You may change server port using `-p` parameter.

Use `together -h` to see all configuration options.

# Development

## Preparation

Clone repository using `git clone https://github.com/dimasmith/together.git`

Install all necessary modules with `npm install`

## Add sample photos

Create directory `photos` inside source (it is added to `.gitignore`).
Add some photos you want to work with.

You may also create symlink instead of placing directory.

## Starting

`npm start` will start server wrapped by [webpack dev server](http://webpack.github.io/docs/webpack-dev-server.html).
Dev server is set to recompile client code once you changed any file.

Dev server is accessible on [http://localhost:9000](http://localhost:9000) (you can change
port by setting `DEV_SERVER_PORT` environment variable)

Normal server is available on [http://localhost:8000](http://localhost:8000)

## Compilation

Code compiled for production is packed in slightly different manner. Most notable things
are minification of images and uglifying javascripts so bundle is much smaller.

To check compiled code you need to build client bundle using `npm run-script compile`.
Then start your development server as usual with `npm start` and go to
[http://localhost:8000](http://localhost:8000) It will serve precompiled scripts.
Just the same way command line client will do.
