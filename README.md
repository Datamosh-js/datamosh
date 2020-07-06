# Datamosh

Mess around with image data using _buffers_, create some interesting & artistic results, **profit**.

## API

### mosh ( options, cb )

- #### `options`:

  - #### `read`: `<string>` | `<Buffer>` (Required)

    May be a string path to original supported image, or the Buffer of said image.

    Supported image types: `.jpg, .jpeg, .png, .bmp, .tiff, .gif`.

  - #### `write`: `<string>`

    Path to write the resulting image.

    If unspecified, the resulting image data will be returned as a Buffer.

  - #### `mode`: `<string>`

    The mode to choose when moshing the supplied image. If no mode is specified, it will be chosen at random.

    Current modes include:
    `schifty`, `blurbobb`, `veneneux`, `vana`, `fatcat`.

- #### `cb`: `function(error, data)`

  The callback function, as `datamosh` is callback based.

  The image `data` will be returned as a Buffer if `options.write` is unspecified. Reference the following for examples on usage.

## Example Code

```js
/* 
  Using paths
*/
;(function jumpInThePit () {
  require('datamosh')(
    {
      read: '/path/to/read/in.gif',
      write: '/path/to/write/out.gif',
      mode: 'veneneux'
    },
    err => {
      if (err) return console.error(err)

      console.log('Moshing Completed!')
    }
  )
})()

/* 
  Using buffers directly 
*/
;(function boogieWoogieBuffer () {
  // can be done w/ async too!
  let read = require('fs').readFileSync
  let write = require('fs').writeFileSync

  let img = read('/path/to/read/in.jpg')
  require('datamosh')(
    {
      read: img
    },
    (err, moshedImg) => {
      if (err) return console.error(err)

      console.log('Moshing Completed!')
      write('/path/to/write/out.jpg', moshedImg)
    }
  )
})()
```

## Custom Modes

Datamosh allows you to set custom moshing modes. As of `v1.1.0`, this may be acomplished by adding a mosh function to the `MODES` property.

For mosh function starter code, see the included template file located [here](https://github.com/mster/datamosh/blob/master/lib/modes/template).

```js
/*
  Setting custom modes
*/
const datamosh = require('datamosh')
function myNewMode (image) {
  // actually does nothing to the image
  return image
}

datamosh.MODES.myNewMode = myNewMode
datamosh(/* ... */)
```

## Datamosh in the wild

Check out this list of awesome apps that use `datamosh`!

- [JanMichaelBot](https://github.com/tlaskey/JanMichaelBot) by user [@Tlaskey](https://github.com/tlaskey)

## Example Images

**Original**

![cute_kibby](https://user-images.githubusercontent.com/15038724/63730272-7bea3a00-c81f-11e9-9180-15d0d983adaf.jpg)

**_Moshed_** using `schifty`.

![moshed_kibby](https://user-images.githubusercontent.com/15038724/63730276-7e4c9400-c81f-11e9-84e1-2cd37eeb40bf.jpg)

**Original**

![cat](https://user-images.githubusercontent.com/15038724/86549182-c20a3280-bef3-11ea-8f42-97df6b9d072f.jpg)

**_Moshed_** using `fatcat`.

![cat_moshed2](https://user-images.githubusercontent.com/15038724/86549187-c6365000-bef3-11ea-9906-35d2b755a8e5.jpg)

**Original**

![k_0](https://user-images.githubusercontent.com/15038724/86549099-81121e00-bef3-11ea-8302-c01af495f697.jpg)

**_Moshed_** using `veneneux`.

![k_0_moshed](https://user-images.githubusercontent.com/15038724/86549272-009fed00-bef4-11ea-9c51-bbde1a9e3802.jpg)
