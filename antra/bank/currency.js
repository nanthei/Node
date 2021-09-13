const request=require('postman-request');

const currency=(from, to, callback)=>{
    let end=new Date().toISOString().slice(0,10);
    let start=new Date();
    start.setDate(start.getDate()-30);
    start=start.toISOString().slice(0,10);

    const url='https://api.frankfurter.app/'+start+'..'+end+'?from='+from+'&to='+to;
    request({url:url},(error, response)=>{
       
        if (response!=null && response.statusCode===200){
            //console.log(error);
            //
            
            const data=JSON.parse(response.body);
                const rates=[];
                let i=0;
                for (const [date, rate] of (Object.entries(data.rates)).reverse()){
                    i++;
                    if (i>10) break;
                    rates.push({
                            date:date,
                            rate:rate[to]
                    });
                }
            callback(rates.reverse());
        }else{
            callback([]);
        }
    });
}

const currencies=(callback)=>{
    const url="https://api.frankfurter.app/currencies";
    request({url:url}, (error, response)=>{
        const currencies=JSON.parse(response.body);
        const ca=[];
        for (const [code, name] of Object.entries(currencies) ){
            console.log("Kodas: "+code+" Pavadinimas: "+name );
            ca.push({
                code:code,
                name:name

            });
        }
        callback(ca);
    });
}

module.exports={currency, currencies};