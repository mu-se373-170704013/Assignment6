const mongoose = require("mongoose");
const express = require("express");

const app = express();
const router = require("./router");
const errorController = require("./controllers/error");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(errorController);

mongoose.connect(
  "mongodb+srv://harunergingonen:DtSqnfjhavLt3iRO@se373cluster.sb3rr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to Database");
  }
);
app.listen(3000, () => {
  console.log(`Backend listening on port 3000`);
});
