const {CommentModel} = require('../models/Comment');

/**
 * find comments
 * @param {Number} limit
 * @param {Boolean} format
 * @returns {[Comment]}
 */
const allComments = async (limit = 30, format = false) => {

  const results = await new Parse.Query("Comments").limit(limit).find();
  if (format)
    return !!results ? results.map(el => CommentModel.toJSON(el.toJSON())) : [];

  return !!results ? results : [];
};


/**
 * gets the comments for one movie.
 * @param {String} movieId -
 * @param {Number} limit -
 * @param {Boolean} format
 * @returns {[Comment]}
 */
const findCommentsByMovie = async (movieId, limit = 30, format = false) => {
  if (movieId === undefined) {
    throw "Movie params must be set";
  }

  let commentsForTheMovie = await allCommentsByMovieQuery(movieId, limit).find();

  if (format)
    return !!commentsForTheMovie ? commentsForTheMovie.map(el => CommentModel.toJSON(el.toJSON())) : [];

  return !!commentsForTheMovie ? commentsForTheMovie : [];
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

/**
 * Create comment
 * @param name
 * @param email
 * @param movie
 * @returns {Comment}
 */
const createComment = async(name, email, movie) => {

  let comment = new Parse.Object("Comments");
  comment.set("name", name);
  comment.set("email", email);
  comment.set("date", new Date());
  comment.set("movie_id", movie.id);
  comment.set("movie", movie);

  return await comment.save();
};

/**
 * Delete comment
 * @param {String} comment_id
 * @param {String} email
 * @returns {Comment}
 */
const deleteComment = async(comment_id, email) => {
  const comment = await new Parse.Query("Comments").get(comment_id);
  if (!!comment) {
    const commentJSON = comment.toJSON()
    if (commentJSON.email === email) {
      // Destroy
      return await comment.destroy();
    }

    throw "this email does not match";
  }

  throw "this comment does not exist";
};


module.exports = exports =
{
  findCommentsByMovie,
  allComments,
  countCommentsByMovie,
  createComment,
  deleteComment
};