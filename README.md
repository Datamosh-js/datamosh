# Datamosh

Mess around with image data using *buffers*, create some interesting & artistic results, **profit**. 

## API
### mosh(readFrom [, writeOut] [, config])
* `readFrom`: Path to original image that you wish to mosh. Currently only `*.jpg` and `*.jpeg` file formats are supported.
* `writeOut` (optional): Path to write the resulting image. If unspecified, `mosh(...)` will return the resulting image data as a buffer.
* `config` (optional): Configuration options for the datamoshing.
    * `mode`: The mode to choose when moshing the supplied image. If no mode is specified, it will be chosen at random.

## Example

```js
const mosh = require('./');

(async function jumpInThePit () {
  try {
    const moshedData = await mosh(
      'path/to/read/image.jpg',
      'path/to/write/image_moshed.jpg',
      { mode: 'blurbobb' }
    )
  } catch (error) {
    console.log(error)
  }
})();
```

**Original**

![cute_kibby](https://user-images.githubusercontent.com/15038724/63730272-7bea3a00-c81f-11e9-9180-15d0d983adaf.jpg)

**M̵̟̰̬̼͐͂͛̀̀͒̋̄͗͘͝͝o̵̹̐͗͌s̷̛͍̞͍̤̘̜̎̄̆͊̃̆́͋͋̏̆̕h̸̺̦͍̝̳̞̮̮̝̐͌̏̓̌̾͠͠ͅe̶̛̙̯̭̳͕̗͒̓̓̂̋̈́̐̄̕d̴̟̩̖̟̖̻̱̰̥̗̜̪̊** using `schifty` mode. 

![moshed_kibby](https://user-images.githubusercontent.com/15038724/63730276-7e4c9400-c81f-11e9-84e1-2cd37eeb40bf.jpg)

