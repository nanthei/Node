const express = require("express");
const hbs = require("hbs");
const path = require("path");
const pageRoute = require("./routes/page");

const viewsPath = path.join(__dirname, "views", "templates");
const partialsPath = path.join(__dirname, "views", "partials");
const publicPath = path.join(__dirname, "public");

const app = express();

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(publicPath));
app.use(pageRoute);

app.listen(3000);
