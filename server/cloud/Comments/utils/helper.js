const {findMovieByIDQuery} = require('../../Movies/utils/helpers')
const {CommentModel} = require('../models/Comment');

/**
 * find comments : only for dev purpose
 * @param limit
 * @returns {Promise<*[]|*>}
 */
const allComments = async (limit = 30) => {

  const results = await new Parse.Query("Comments").limit(limit).find();
  return !!results ? results : [];
};

/**
 * find comments formatted : for dev purpose
 * @param limit
 * @returns {Promise<*[]|*>}
 */
const allCommentsFormatted = async (limit = 30) => {

  const results = await new Parse.Query("Comments").limit(limit).find();

  return typeof results === "undefined" ? [] : results.map(el => CommentModel.toJSON(el.toJSON()));
};



/**
 * gets the comments for one movie.
 * @param {String} movieId -
 * @param {Number} limit -
 * @param {Boolean} format
 * @returns {[Comments]}
 */
const findCommentsByMovie = async (movieId, limit = 30, format = false) => {
  if (movieId === undefined) {
    throw "Movie params must be set";
  }

  // Movie exists
  if (!!await findMovieByIDQuery(movieId)) {
    let commentsForTheMovie = await allCommentsByMovieQuery(movieId, limit).find();

    if (format)
      return !!commentsForTheMovie ? commentsForTheMovie.map(el => CommentModel.toJSON(el.toJSON())) : [];

    return !!commentsForTheMovie ? commentsForTheMovie : [];
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


/**
 * Count commentsByMovie
 * @param movieId
 * @returns {Number}
 */
const countCommentsByMovie = async (movieId) => {

  let commentsQuery = new Parse.Query("Comments");

  if (movieId !== undefined) {
    commentsQuery.equalTo("movie_id", movieId);
  }

  return await commentsQuery.count();
};



module.exports = exports = { findCommentsByMovie, allComments, allCommentsFormatted, countCommentsByMovie };