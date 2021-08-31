const express = require('express');
const path = require('path');
const pageRouter = require('./routes/page');
const systemRouter = require('./routes/system');
const userRouter = require('./routes/user');

const app=express();

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(pageRouter);
app.use(systemRouter);
app.use('/user',userRouter);

app.listen(3000);
