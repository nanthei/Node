//    .\mongod.exe --dbpath='C:\Users\toshiba satellite\Desktop\BIT\mongoDB\data'

const express=require('express');
require('./db/mongoose');
const feedbackRoutes=require('./routes/feedbackRoutes');

const app=express();

app.use(express.json())
app.use(feedbackRoutes);

app.listen(3000);