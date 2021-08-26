const http=require('http'); //Prisidedame HTTP moduli
const fs=require('fs');     //Prisidedame FS moduli
const path = require('path');
const metai=require('./metai');


//Sukuriam serveri ir paduodame f-ją kuri aptarnaus vartotojų užklausas
const server=http.createServer((req, res)=>{
    const url=req.url;         //  /informacija.txt
    const method=req.method;
    let file='./public'+url;   //Turime kintamaji su failo pavadinimu: ./public/informacija.txt


    //Patikrinsim ar failas egzistuoja ir ar jis yra failas
    if (fs.existsSync(file) && fs.lstatSync(file).isFile()){
        let stream=fs.readFileSync(file); //Nuskaitome failo turinį į kintamąjį stream
        const ext=path.parse(file).ext;   // Paimama failo galunė
        //Jei failo glune css, server sakys kad persiunčia css faila
        if (ext=='.css') res.setHeader('Content-Type', 'text/css'); 
        //Jei failo glune png, server sakys kad persiunčia png paveiksla
        if (ext=='.png') res.setHeader('Content-Type', 'image/png'); 
        if (ext=='.jpg') res.setHeader('Content-Type', 'image/jpeg'); 
        if (ext=='.ico') res.setHeader('Content-Type', 'image/jpeg'); 
        
        res.write(stream); //Išvedėme vartotojui failą
        return res.end(); //Uždarome persiuntima ir nutraukiame f-ją
    }

    //Jei formoje paspaudė mygtuką skaičiuoti (todėl atėjo su POST metodu ir url metai)
    if (method==='POST' && url==='/metai'){
        let data=[];                // Į masyvą dėsime atsiųstus formos duomenis
        req.on('data', (chunk)=>{
            data.push(chunk);       // Į masyvą įdedame atskiras atsiustas dalis
        });
        req.on('end', ()=>{
            const d=Buffer.concat(data).toString(); //Paimame visus atsiustus duomenis
                                                    //metai = 2020
            const m=parseInt(d.split('=')[1]);   //Iš atsiųstų duomenų pasiimame metus
            const spalva=metai(m);
            let stream=fs.readFileSync('./template/index.html','utf-8'); //Nuskaitome failo turinį į kintamąjį stream
            stream=stream.replace("{{result}}", m + spalva);
            res.setHeader('Content-Type', 'text/html'); //Nusiuntėme headerį
            res.write(stream); //Išvedėme vartotojui failą
            return res.end(); //Uždarome persiuntima ir nutraukiame f-ją
        });
    }else{
        let stream=fs.readFileSync('./template/index.html','utf-8'); //Nuskaitome failo turinį į kintamąjį stream
        stream=stream.replace("{{result}}", "Įveskite metus ir tikrinkite");
        res.setHeader('Content-Type', 'text/html'); //Nusiuntėme headerį
        res.write(stream); //Išvedėme vartotojui failą
        return res.end(); //Uždarome persiuntima ir nutraukiame f-ją
    }
});

server.listen(3000, 'localhost');