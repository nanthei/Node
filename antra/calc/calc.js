const calc = (x, y) => {
    return x*y/dbd(x,y)
  };
  
  const dbd = (x, y) => {
    for (let i = x; i > 0; i--) {
      if (x % i == 0 && y % i == 0) return i;
    }
  };

  module.exports = {calc};
  