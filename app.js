const express = require("express");
const dotenv = require("dotenv");
const paymentRouter = require("./routes/payment.route.js");
const mongoose = require("mongoose");
const categorieRouter = require("./routes/categorie.route");
const scategorieRouter = require("./routes/scategorie.route");
const articleRouter = require("./routes/article.route");
const userRouter = require("./routes/user.route");
const app = express();
const cors = require("cors");
const user = require("./models/user.js");
app.use(
  cors({
    origin: "*",
  })
);
dotenv.config();
//middleware
app.use(express.json());

// Connexion à la base données
mongoose
  .connect(process.env.DATABASECLOUD)
  .then(() => {
    console.log("DataBase Successfully Connected");
  })
  .catch((err) => {
    console.log("Unable to connect to database", err);
    process.exit();
  });

app.use("/api/scategories", scategorieRouter);
app.use("/api/categories", categorieRouter);
app.use("/api/articles", articleRouter);
app.use("/api/payment", paymentRouter);
app.listen(process.env.PORT);
app.use("/api/user", userRouter);
console.log("Application Run At Port" + process.env.PORT);
module.exports = app;
