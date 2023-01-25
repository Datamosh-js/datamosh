"use strict";

const noiseThreshold = 0.2;
const grainThreshold = 0.4;

function r(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = function (data) {
  const min = Math.min;
  const max = Math.max;
  const floor = Math.floor;
  const random = Math.random;

  for (let i = 0; i < data.length; i += 4) {
    /** Void effect */
    data[i] = min(data[i] - r(1, 15), 255);
    data[i + 1] = min(data[i + 1] - r(1, 15), 255);
    data[i + 2] = min(data[i + 2] - r(1, 15), 255);

    /** Add noise */
    if (random() < noiseThreshold) {
      data[i] = min(data[i] + r(1, 15), 255);
      data[i + 1] = min(data[i + 1] + r(1, 10), 255);
      data[i + 2] = min(data[i + 2] + r(1, 10), 255);
    }

    /** Darken image */
    data[i] = min(255, max(0, data[i] + floor(random() * 20 - 40)));
    data[i + 1] = min(255, max(0, data[i + 1] + floor(random() * 20 - 40)));
    data[i + 2] = min(255, max(0, data[i + 2] + floor(random() * 20 - 40)));

    /** Add grain */
    if (random() < grainThreshold) {
      const grain = floor(random() * 50);

      data[i] = min(255, max(0, data[i] + grain));
      data[i + 1] = min(255, max(0, data[i + 1] + grain));
      data[i + 2] = min(255, max(0, data[i + 2] + grain));
    }
  }

  return data;
};
