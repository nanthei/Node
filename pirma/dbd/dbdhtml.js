const dbd = require("./dbd");

const index = ()=>{

    let  s='<html>';
    s+='<body>';
    s+='<form method="post" action="counted">';
    s+='<input type="text" name="x"> <br> ';
    s+='<input type="text" name="y"> <br> ';
    s+='<button type="submit" >COUNT" </button ';

    s+='</form>';
    s+='</body>';
    s += '</html>'
    return s;
}

const result = (x, y)=>{

    let  s='<html>';
    s+='<body>';
    s+='RESULT: '  + dbd(x,y);


    s+='</body>';
    s += '</html>'
    return s;
}

module.exports ={ index, result};