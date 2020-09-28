const MoviesHelper = require("../utils/helpers")
const joi = require("@hapi/joi");

const updateCommentsNumberByMovieParamsSchema = joi.object({
  movie_id: joi.string().required()
});

module.exports = async (request) => {

  const {
    value: params,
    error: paramsValidationError,
  } = updateCommentsNumberByMovieParamsSchema.validate(request.params);

  if (paramsValidationError) {
    throw paramsValidationError;
  }

  const { movie_id } = params;

  return await MoviesHelper.updateCountCommentsByMovie(movie_id);
};
