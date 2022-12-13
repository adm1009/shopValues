const express = require("express");
const cors = require("cors");

const app = express();
const shopDetailsRoute = require("./routes/shopDetailsRoutes");
const userRoute = require("./routes/userRoutes");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to shopValues application." });
});
app.use("/details",shopDetailsRoute);
app.use("/user",userRoute);
const PORT = process.env.PORT || 8080;

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});