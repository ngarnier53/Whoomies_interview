const {findMovieByIDQuery} = require('../../Movies/utils/helpers')
/**
 * find comments : only for dev purpose
 * @param limit
 * @returns {Promise<*[]|*>}
 */
const allCommentsQuery = async (limit = 30) => {

  const results = await new Parse.Query("Comments").limit(limit).find();
  return typeof results === "undefined" ? [] : results;
};



/**
 * gets the comments for one movie. 
 * @param {String} movieId -
 * @param {Number} limit -
 * @returns {[Comments]}
 */

const findCommentsByMovie = async (movieId, limit = 30) => {
  if (movieId === undefined) {
    throw "Movie params must be set";
  }

  // Movie exists
  if (!!await findMovieByIDQuery(movieId)) {
    let commentsForTheMovie = await allCommentsByMovieQuery(movieId, limit).find();
    return commentsForTheMovie === undefined ? [] : commentsForTheMovie;
  }

  throw "this movie doesn't exists"
};

/**
 * All commentsByMovieQuery
 * @param movieId
 * @param limit
 * @returns {Parse.Query}
 */
const allCommentsByMovieQuery = (movieId, limit) => {
  let commentsQuery = new Parse.Query("Comments");
  commentsQuery.include(["movie"]);

  if (movieId !== undefined) {
    let searchedMovie = new Parse.Object("Movies");
    searchedMovie.id = movieId;
    commentsQuery.equalTo("movie", searchedMovie);
  }

  if (limit !== undefined) {
    commentsQuery.limit(limit);
  }

  return commentsQuery;
};



module.exports = exports = { findCommentsByMovie, allCommentsQuery };