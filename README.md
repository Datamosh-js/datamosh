# Datamosh [![License: MIT](https://img.shields.io/badge/license-MIT-blue)](https://opensource.org/licenses/MIT) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier) [![Build Status](https://travis-ci.com/mster/datamosh.svg?branch=master)](https://travis-ci.com/mster/datamosh)

![datamosh_cover_2x](https://user-images.githubusercontent.com/15038724/118436128-12662b00-b695-11eb-8b9e-f4d91a869adf.png)

Mess around with image data using _buffers_, create some interesting & artistic results, **profit**.

# Install

```
$ npm install datamosh
```

# Usage

Using callbacks

```js
const mosh = require("datamosh");

const opts = {
  read: "path/to/file/in.ext",
  mode: "fatcat",
};

const cb = (err, moshedBuffer) => {
  if (!err) writeFile("path/to/file/out.ext", moshedBuffer);
};

mosh(opts, cb);
```

Using async/await

```js
const { promisify } = require("util");

const promisifiedMosh = promisify(mosh);

const imgBuffer = await promisifiedMosh(opts);
```

Using multiple modes on a single image, applied with respect to order.

```js
const opts = {
  read: "path/to/file/in.ext",
  mode: ["vaporwave", "fatcat", "vana"],
};
```

# Custom Modes

Datamosh allows you to set custom moshing modes. As of `v1.1.0`, this may be acomplished by adding a mosh function to the `MODES` property.

For mosh function starter code, see the included template file located [here](https://github.com/mster/datamosh/blob/master/lib/modes/template).

```js
const datamosh = require("datamosh");

function myNewMode(image) {
  const bitmap = image.bitmap.data;
  // your cool code goes here

  image.bitmap.data = bitmap;

  return image;
}

datamosh.MODES.myNewMode = myNewMode;
```

## Example Images

![mode:fatcat](https://user-images.githubusercontent.com/15038724/118332090-64088d00-b4be-11eb-8d6e-139174c5d3ab.png)
Fatcat was created by user [@mster](https://github.com/mster)

![mode:vaporwave](https://user-images.githubusercontent.com/15038724/118332426-e8f3a680-b4be-11eb-9623-73be0128cc0a.png)
Vaporwave was created by user [@tlaskey](https://github.com/tlaskey)

![mode:blurbobb](https://user-images.githubusercontent.com/15038724/118333046-dfb70980-b4bf-11eb-9142-97b91bbb6721.png)

![mode:veneneux](https://user-images.githubusercontent.com/15038724/118332676-4ee02e00-b4bf-11eb-9a71-9974933ad014.png)

## Datamosh in the wild

Check out this list of awesome apps that use `datamosh`!

- [JanMichaelBot](https://github.com/tlaskey/JanMichaelBot) by user [@Tlaskey](https://github.com/tlaskey)
