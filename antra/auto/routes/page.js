const express = require('express');
const menu = require('./../modules/menu')
const rezervacija = require('./../modules/rezervacija')

const router = express.Router();

router.get('/',(req,res,next)=>{
res.render('index');
});

router.get('/menu',(req,res,next)=>{
const kainos = menu.getMenu();
res.render('menu',{
    title: 'Paslaugu kainos',
    menu: kainos
});
});
 
router.post("/rezervacija", (req, res, next) => {

    console.log(      req.body.marke,
        req.body.model,
        req.body.year,
        req.body.text,
        req.body.optional);
    rezervacija.addRezervacija(
      req.body.marke,
      req.body.model,
      req.body.year,
      req.body.text,
      req.body.optional
    );
    res.redirect("/rezervacija");
  });
  
router.get('/rezervacija',(req,res,next)=>{
    res.render('rezervacija');
// const ats=rezervacija.getRezervacija();
// res.render('rezervacija',{
//     title: 'Rezervacija',
//     ats:ats
// });
});

// router.post('/rezervacija',(req,res,next)=>{
//     rezervacija.addRezervacija(req.body.mark,req.body.model,req.body.year,req.body.text,req.body.optional);
//     res.redirect('/rezervacija')
// });

router.get('/kontaktai',(req,res,next)=>{
    res.render('kontaktai');
});

router.use('/',(req,res,next)=>{

});

module.exports=router;