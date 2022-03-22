import MovieRepository from "../../repository/movie";
const _ = require("lodash");

const repo = new MovieRepository();

export interface Movie {
  id: string;
  name: string;
  year: number;
  description: string;
}

const getMovies = async () => {
  const res = await repo.getAll();
  return res;
};

const getMovieById = async (id: string) => {
  const res = await repo.getById(id);
  return res;
};

const addMovie = async (body: Movie) => {
  const res = await repo.create(body);
  return res;
};

const updateMovie = async (id: string, movieToUpdate: Movie) => {
  const res = await repo.update(id, movieToUpdate);
  return res;
};

const deleteMovie = async (id: string) => {
  const res = await repo.delete(id);
  return res;
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
