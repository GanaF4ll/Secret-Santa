const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const app = express();
const port = 3000;
const userRoute = require("./routes/userRoute");

mongoose.connect("mongodb://127.0.0.1:27017/SecretSanta");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", userRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Secret Santa app listening on port ${port}`);
});
