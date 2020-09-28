const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")
const {findMovieByIDQuery} = require('../../Movies/utils/helpers');

const getCommentsByMovieParamsSchema = joi.object({
  limit: joi.number().default(20),
  movieId: joi.string().required()
});

module.exports =
  (async (request) => {
    const {
      value: params,
      error: paramsValidationError,
    } = getCommentsByMovieParamsSchema.validate(request.params);

    if (paramsValidationError) {
      throw paramsValidationError;
    }

    const { movieId, limit } = params;

    if (!!await findMovieByIDQuery(movieId))
      return await CommentsHelper.findCommentsByMovie(movieId, limit, true);

    throw "this movie doesn't exists";
  });
