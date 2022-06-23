'use strict';

module.exports = function (data) {
  const f = Math.floor,
    r = Math.random,
    x = Math.max;

  const seed = () => f(r() * 256);

  const hurp = [seed(), seed(), seed()],
    lurp = [seed(), seed(), seed()];

  let multi = f(r() * (255 - x(...hurp, ...lurp)));

  for (let i = 0; i < data.length; i += 4) {
    const rP = data[i] / 255,
      gP = data[i + 1] / 255,
      bP = data[i + 2] / 255;

    if (data[i] < lurp[0] || data[i] > hurp[0]) data[i] = hurp[0] - lurp[0] + rP * multi;
    if (data[i + 1] < lurp[1] || data[i + 1] > hurp[1])
      data[i + 1] = hurp[1] - lurp[1] + gP * multi;
    if (data[i + 2] < lurp[2] || data[i + 2] > hurp[2])
      data[1 + 2] = hurp[2] - lurp[2] + bP * multi;
  }

  return { data };
};
