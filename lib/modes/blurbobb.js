"use strict";

module.exports = function (data) {
  let counter = 0;
  for (let i = 0; i < data.length; i++) {
    if (counter < 64) data[i] = Math.random() * 255;

    counter++;
    if (counter > 128) counter = Math.random() * 128;
  }

  return data;
};
