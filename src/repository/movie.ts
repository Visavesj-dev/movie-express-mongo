import { Movie } from "../api/movies/controller";

const MovieSchema = require("./../schema/movie");

class MovieRepository {
  async create(body: Movie) {
    const result = await new MovieSchema(body).save();

    return result;
  }

  async getById(id: string) {
    return await MovieSchema.findOne({ _id: id });
  }

  async getAll() {
    return await MovieSchema.find({});
  }

  async delete(id: string) {
    const result = await MovieSchema.findOne({ _id: id });
    if (!result) {
      return null;
    }

    await result.remove({ _id: id });
  }

  async update(id: string, body: Movie) {
    const result = await MovieSchema.findOne({ _id: id });
    if (!result) {
      return null;
    }
    await result.update(body);
    return await MovieSchema.findOne({ _id: id });
  }
}

export default MovieRepository;
