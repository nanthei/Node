const isPrime = (num) => {
    if (num <= 1) return 'NO';
    if (num === 2) return 'YES';
  
    for (var i = 2; i < num; i++) 
      if (num % i === 0) return 'NO';
      else return 'YES';
  }

module.exports =isPrime;