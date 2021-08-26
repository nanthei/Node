const skaiciavimas = require("./skaiciavimas");

const index = ()=>{

    let  s='<html>';
    s+='<body>';
    s+='<form method="post" action="counted">';
    s+='<input type="text" name="x" value="100"> <br> ';
    s+='<input type="text" name="y" value="2"> <br> ';
    s+='<input type="text" name="z" value="5"> <br> ';
    s+='<button type="submit" >COUNT </button ';

    s+='</form>';
    s+='</body>';
    s += '</html>'
    return s;
}
const result = (x, y, z)=>{

    let  s='<html>';
    s+='<body>';
    s+='RESULT: '  + skaiciavimas(x,y,z).toFixed(2);


    s+='</body>';
    s += '</html>'
    return s;
}

module.exports ={ index, result};