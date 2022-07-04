"use strict";

module.exports = function (data) {
  const ret = []

  for(let i=0; i<data.length; i+=4){
    if(i % 12 === 0){
      ret.push(data[i])
      ret.push(data[i+1])
      ret.push(data[i+2])
      ret.push(255)
    }
    else{
      const r = data[i]
      const g = data[i+1]
      const b = data[i+2]

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const L = (r + g + b) / 765
      
      if(L > .65){
        ret.push(255)
        ret.push(255)
        ret.push(255)
        ret.push(255)
      }
      else if(L < .35){
        ret.push(0)
        ret.push(0)
        ret.push(0)
        ret.push(255)
      }
      else{
        for(let j=0;j<3;j++){
          const seed = Math.random() > .5 ? max : min
          ret.push(seed)
        }
        ret.push(255)
      }
      
  
    }
  }

  return ret
}
