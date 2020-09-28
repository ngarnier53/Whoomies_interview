const processAllByParseQuery = require("../../utils/processAllByParseQuery");
const {MovieModel} = require('../models/Movie');
const {countCommentsByMovie} = require('../../Comments/utils/helper');

const allMoviesQuery = (limit) => {
  let moviesQuery = new Parse.Query("Movies");

  if (limit !== undefined) {
    moviesQuery.limit(limit);
  }

  return moviesQuery;
};

/**
 * Restore the good number of comments (key num_mfix_comments) for each movie
 * @returns {Boolean}
 */
const migrateCountCommentsByMovie = async () => {
  return (async () => {
    const r = await processAllByParseQuery({
      query: allMoviesQuery(),
      useMasterKey: true,
      processingFunction: async (movie) => {
        //console.log("GOT THE MOVIE");

        //Count movie comments 
        const count = await countCommentsByMovie(movie.id);

        //Set movie comments number
        movie.set("num_mflix_comments", count);

        return movie.save();
      },
    });
    return true;
  })().catch((error) => {
    throw error;
  });

};

/**
 * findMovieByID : find movie by provided id
 * @param movieID
 * @returns {Object} : Movie corresponding to movieID or undefined
 */
const findMovieByIDQuery = async(movieID) =>
{
  if (!!movieID)
  {
    let moviesQuery = new Parse.Query("Movies");
    moviesQuery.equalTo("objectId", movieID);

    // Can returns undefined. It is up to the caller to decide for the behaviour
    return await moviesQuery.first();
  }
  else
    throw "Movie params must be set";
}

const findMoviesByYearAndCountryQuery = async(year, country = null, format = false) =>
{
  let moviesQuery = new Parse.Query("Movies");
  moviesQuery.greaterThan("year", year);
  if (!!country)
    moviesQuery.equalTo("countries", country);

  const results = await moviesQuery.find();

  if (format)
    return !!results ? results.map(el => MovieModel.toJSON(el.toJSON())) : [];

  return !!results ? results : [];
}



module.exports = exports =
{
  migrateCountCommentsByMovie,
  findMovieByIDQuery,
  findMoviesByYearAndCountryQuery
};
