const skaiciavimas = (x, y, z) => {
    let suma = x;
    for (let i = 0; i < z; i++) {
        suma += (suma*y/100);
        }
    return suma;
  };
  
  module.exports = skaiciavimas;