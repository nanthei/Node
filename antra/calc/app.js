const express = require("express");
const pageRouter = require("./routes/page");
const logRouter = require("./routes/log");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(pageRouter);
app.use(logRouter);

app.listen(3000);
