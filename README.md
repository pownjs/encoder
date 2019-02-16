[![Follow on Twitter](https://img.shields.io/twitter/follow/pownjs.svg?logo=twitter)](https://twitter.com/pownjs)
[![NPM](https://img.shields.io/npm/v/@pown/encoder.svg)](https://www.npmjs.com/package/@pown/encoder)
[![Fury](https://img.shields.io/badge/version-2x%20Fury-red.svg)](https://github.com/pownjs/lobby)

# Pown Encoder

## Credits

This tool is part of [secapps.com](https://secapps.com) open-source initiative.

```
  ___ ___ ___   _   ___ ___  ___
 / __| __/ __| /_\ | _ \ _ \/ __|
 \__ \ _| (__ / _ \|  _/  _/\__ \
 |___/___\___/_/ \_\_| |_|  |___/
  https://secapps.com
```

> **NB**: Pown Encoder is the result of an almost direct copy of SecApps' excellent [Encoder](https://encoder.secapps.com) tool.

## Quickstart

This tool is meant to be used as part of [Pown.js](https://github.com/pownjs/pown) but it can be invoked separately as an independent tool.

Install Pown first as usual:

```sh
$ npm install -g pown@latest
```

Invoke directly from Pown:

```sh
$ pown encoder
```

Otherwise, install this module locally from the root of your project:

```sh
$ npm install @pown/encoder --save
```

Once done, invoke pown cli:

```sh
$ ./node_modules/.bin/pown-cli encoder
```

You can also use the global pown to invoke the tool locally:

```sh
$ POWN_ROOT=. pown encoder
```

## Usage

> **WARNING**: This pown command is currently under development and as a result will be subject to breaking changes.

```
pown encoder
```
