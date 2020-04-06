# Datamosh

Mess around with image data using _buffers_, create some interesting & artistic results, **profit**.

## API

### mosh ( options, cb )

- `options`:
  - `read`: (Required) Path to original image that you wish to mosh.
    Supported types: `.jpg, .jpeg, .png, .bmp, .tiff, .gif`.
  - `write`: Path to write the resulting image. If unspecified, `mosh()` will return the resulting image data (Jimp).
  - `mode`: The mode to choose when moshing the supplied image. If no mode is specified, it will be chosen at random.
- `cb`: `function(error, data)` the callback function

## Example

```js
;(function jumpInThePit () {
  require('./index')(
    {
      read: '/home/m/Desktop/0.jpeg',
      write: '/home/m/Desktop/1.jpeg',
      mode: 'blurbobb'
    },
    (err, data) => {
      if (err) return console.error(err)

      console.log('Moshing Completed!')
    }
  )
})()
```

**Original**

![cute_kibby](https://user-images.githubusercontent.com/15038724/63730272-7bea3a00-c81f-11e9-9180-15d0d983adaf.jpg)

**M̵̟̰̬̼͐͂͛̀̀͒̋̄͗͘͝͝o̵̹̐͗͌s̷̛͍̞͍̤̘̜̎̄̆͊̃̆́͋͋̏̆̕h̸̺̦͍̝̳̞̮̮̝̐͌̏̓̌̾͠͠ͅe̶̛̙̯̭̳͕̗͒̓̓̂̋̈́̐̄̕d̴̟̩̖̟̖̻̱̰̥̗̜̪̊** using `schifty` mode.

![moshed_kibby](https://user-images.githubusercontent.com/15038724/63730276-7e4c9400-c81f-11e9-84e1-2cd37eeb40bf.jpg)
