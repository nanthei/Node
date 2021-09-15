const express = require("express");
require("./db/mongoose");
const serviceRoutes = require("./routes/serviceRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());
app.use(serviceRoutes);
app.use(orderRoutes);

app.listen(3000);
