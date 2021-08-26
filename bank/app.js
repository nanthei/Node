
let {currency, currencies}=require('./currency');
const http=require('http');
const fs=require('fs');
const path=require('path');

function generateSelect(ca, name){
    //Generuojame select'ą ir jį patalpinsime į index.html
    let s='<select class="form-control select2" name="'+name+'">';
    ca.forEach((d)=>{
        s+="<option value='"+d.code+"'>"+d.name+"</option>";
    });
    s+="</select>";
    return s;
}

function generateTable(rates){
    let s="<table class='table'>";
    rates.forEach((d)=>{
        s+="<tr><td>"+d.date+"</td><td>"+d.rate+"</td></tr>";
    });
    s+="</table>";
    return s;
}

//Susikuriame serverį
const server=http.createServer((req,res)=>{
    let url=req.url;
    
    if (url==='/'){
        //Pasiimame places ir vykdome asinchroninę funkciją
        currencies((ca)=>{
            let stream=fs.readFileSync('./template/index.html','utf-8');
            stream=stream.replace('{{from}}', generateSelect(ca,'from'));
            stream=stream.replace('{{to}}', generateSelect(ca,'to'));
            res.setHeader('Content-type','text/html');
            res.write(stream);
            return res.end();
        });
        
    }


    let getData=url.split('?');
    if (getData[0]==='/keisti'){  //  /keisti?from=EUR&to=USD

        let from=getData[1].split('&')[0].split('=')[1];
        let to=getData[1].split('&')[1].split('=')[1];

        currencies((ca)=>{
            currency(from,to, (rates)=>{
                res.setHeader('Content-Type','text/html');
                let stream=fs.readFileSync('./template/temp.html', 'utf-8');
                stream=stream.replace('{{from}}',  generateSelect(ca,'from'));
                stream=stream.replace('{{to}}',    generateSelect(ca,'to'));
                stream=stream.replace('{{rates}}', generateTable(rates));
                stream=stream.replace('{{name}}', from+" - "+to);
                res.write(stream);
                res.end();
            });
        });     
    }
                                      

    
    
    

});

//Laukiame užklausų
server.listen(3000, 'localhost');



/*
currency('EUR','EUR', (rates)=>{
    rates.forEach((rate)=>{
        console.log('Data: '+rate.date+' Kursas: '+rate.rate);
    });
});
*/



currencies((ca)=>{
    console.log(ca);
});

//let str='from=EUR&to=USD';   //from=EUR              to=USD
/*
console.log(str.split('&')[0].split('=')[1]);
console.log(str.split('&')[1].split('=')[1]);
*/