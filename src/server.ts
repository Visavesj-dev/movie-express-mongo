const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;
const moviesRouter = require("./api/movies");
const mongoose = require("mongoose");
const path = require("path");

const connectDB = async () => {
  const options = {
    authSource: "admin",
    user: "20Scoops",
    pass: "20Scoops",
    useNewUrlParser: true,
  };

  mongoose.set("debug", true);

  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error")
  );
  mongoose.connection.once(
    "open",
    console.error.bind(console, "connection success")
  );

  try {
    await mongoose.connect("mongodb://localhost:27017/20Scoops", options);
    await mongoose.connection.startSession();
  } catch (err) {
    console.log("err", err);
  }
};

(async () => {
  await connectDB();
})();

// this allows express to get body info for POST requests
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/movies", moviesRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
