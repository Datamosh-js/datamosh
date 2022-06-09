'use strict';

module.exports = function (data) {
  const red = new Array(data.length / 4),
    green = new Array(data.length / 4),
    blue = new Array(data.length / 4),
    a = new Array(data.length / 4);

  let high = 165,
    low = 80;
  for (let i = 0; i < data.length / 4; i++) {
    if (data[i] < high && data[i] > low) red[i] = data[i];
    if (data[i + 1] < high && data[i + 1] > low) green[i] = data[i + 1];
    if (data[i + 2] < high && data[i + 2] > low) blue[i] = data[i + 2];
    a[i] = data[i + 3];
  }

  const ret = [];
  for (let i = 0; i < red.length; i++) {
    ret.push(red[i]);
    ret.push(green[i]);
    ret.push(blue[i]);
    ret.push(a[i]);
  }

  return ret;
};
