import expressMovies = require("express");
import {
  validate,
  updateValidator,
  createValidator,
} from "../../utils/validation";
import { upload } from "../../utils/upload";

const router = expressMovies.Router();
const controller = require("./controller");

router.get(
  "/",
  async (req: expressMovies.Request, res: expressMovies.Response) => {
    try {
      const movies = await controller.getMovies();
      res.json(movies);
    } catch (err) {
      res.status(400).send({
        message: `Error Status 400`,
      });
    }
  }
);

router.get(
  "/:id",
  async (req: expressMovies.Request, res: expressMovies.Response) => {
    try {
      const movieById = await controller.getMovieById(req.params.id);
      res.json(movieById);
    } catch (err) {
      res.status(400).send({
        message: `Error Status 400`,
      });
    }
  }
);

router.post(
  "/",
  upload.single("image"),
  validate(createValidator),
  async (req: any, res: expressMovies.Response) => {
    try {
      const host = req.host;
      const filePath =
        req.protocol +
        "://" +
        host +
        ":3001" +
        "/uploads/images/" +
        req.file.filename;

      const newData = {
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
        image: filePath,
      };

      const newMovie = await controller.addMovie(newData);

      res.json({
        message: "New Movie added!",
        newMovie,
      });
    } catch (err) {
      res.status(400).send({
        message: `Error Status 400`,
      });
    }
  }
);

router.put(
  "/:id",
  upload.single("image"),
  validate(updateValidator),
  async (req: any, res: expressMovies.Response) => {
    try {
      const host = req.host;
      const filePath =
        req.protocol +
        "://" +
        host +
        ":3001" +
        "/uploads/images/" +
        req.file.filename;

      const newData = {
        name: req.body.name,
        year: req.body.year,
        description: req.body.description,
        image: filePath,
      };

      const updatedMovie = await controller.updateMovie(req.params.id, newData);

      res.json({
        message: `Movie ${req.params.id} has been updated!`,
        updatedMovie,
      });
    } catch (err) {
      res.status(400).send({
        message: `Error Status 400`,
      });
    }
  }
);

router.delete(
  "/:id",
  async (req: expressMovies.Request, res: expressMovies.Response) => {
    try {
      await controller.deleteMovie(req.params.id);
      res.json({
        message: `Movie ${req.params.id} has been deleted!`,
      });
    } catch (err) {
      res.status(400).send({
        message: `Error Status 400`,
      });
    }
  }
);

module.exports = router;
