const express = require('express');

const app=express();

app.use(express.urlencoded({extended:false}));

app.use((req,res,next)=>{
    console.log('VISIT');
    next();
    });

app.get('/users',(req,res,next)=>{
res.send('<form action="add_user" method="POST"><input type="text" name="vardas"><button type="submit">SEND</button></form>');
});

app.post('/add_user',(req,res,next)=>{
    console.log(req.body);
    res.send('ADDED: ' + req.body.vardas);
    });

app.use((req,res,next)=>{
    res.send("text with h1 tagu");
    });

app.listen(3000);
