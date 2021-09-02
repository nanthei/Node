const express = require('express');
const menu = require('./../modules/menu')
const atsiliepimai = require('./../modules/atsiliepimai')

const router = express.Router();

router.get('/',(req,res,next)=>{
res.render('index');
});

router.get('/meniu',(req,res,next)=>{
const restoranoMeniu = menu.getMenu();
res.render('meniu',{
    title: 'Restorano meniu',
    menu: restoranoMeniu
});
});

router.get('/atsiliepimai',(req,res,next)=>{
const ats=atsiliepimai.getAtsiliepimai();
res.render('atsiliepimai',{
    title: 'Atsiliepimai',
    ats:ats
});
});

router.post('/atsiliepimai',(req,res,next)=>{
    atsiliepimai.addAtsiliepimai(req.body.name,req.body.text);
    res.redirect('/atsiliepimai')
});

router.get('/kontaktai',(req,res,next)=>{
    res.render('kontaktai');
});

router.use('/',(req,res,next)=>{

});

module.exports=router;