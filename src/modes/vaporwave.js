'use strict';

module.exports = function (data) {
  const COLORS = [
    [0, 184, 255],
    [255, 0, 193],
    [150, 0, 255],
    [0, 255, 249]
  ];

  for (let i = 0; i < data.length; i += 4) {
    if (data[i] <= 15 && data[i + 1] <= 15 && data[i + 2] <= 15) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    } else if (
      data[i] > 15 &&
      data[i] <= 60 &&
      data[i + 1] > 15 &&
      data[i + 1] <= 60 &&
      data[i + 2] > 15 &&
      data[i + 2] <= 60
    ) {
      data[i] = COLORS[0][0];
      data[i + 1] = COLORS[0][1];
      data[i + 2] = COLORS[0][2];
    } else if (
      data[i] > 60 &&
      data[i] <= 120 &&
      data[i + 1] > 60 &&
      data[i + 1] <= 120 &&
      data[i + 2] > 60 &&
      data[i + 2] <= 120
    ) {
      data[i] = COLORS[1][0];
      data[i + 1] = COLORS[1][1];
      data[i + 2] = COLORS[1][2];
    } else if (
      data[i] > 120 &&
      data[i] <= 180 &&
      data[i + 1] > 120 &&
      data[i + 1] <= 180 &&
      data[i + 2] > 120 &&
      data[i + 2] <= 180
    ) {
      data[i] = COLORS[2][0];
      data[i + 1] = COLORS[2][1];
      data[i + 2] = COLORS[2][2];
    } else if (
      data[i] > 180 &&
      data[i] <= 234 &&
      data[i + 1] > 180 &&
      data[i + 1] <= 234 &&
      data[i + 2] > 180 &&
      data[i + 2] <= 234
    ) {
      data[i] = COLORS[3][0];
      data[i + 1] = COLORS[3][1];
      data[i + 2] = COLORS[3][2];
    } else if (data[i] >= 235 && data[i + 1] >= 235 && data[i + 2] >= 235) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  return { data };
};
