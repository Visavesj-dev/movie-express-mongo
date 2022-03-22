const mongoDb = require("mongoose");

const ObjectId = mongoDb.Schema.ObjectId;

const movieSchema = mongoDb.Schema({
  id: ObjectId,
  name: {
    type: "string",
  },
  year: {
    type: "number",
  },
  description: {
    type: "string",
  },
  image: { type: "string" },
});

module.exports = mongoDb.model("movies", movieSchema);
