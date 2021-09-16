//    .\mongod.exe --dbpath='C:\Users\toshiba satellite\Desktop\BIT\mongoDB\data'

const express = require("express");
require("./db/mongoose");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(feedbackRoutes);
app.use(userRoutes);

app.listen(3000);
