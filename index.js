require("dotenv").config();
const express = require("express");
const promoRouter = require("./routes/routes");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/promo", promoRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("Welcome to our server!");
});

app.listen(port, () => {
  console.log(`Web server is listening on port ${port}!`);
});
