const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")
const {findMovieByIDQuery} = require('../../Movies/utils/helpers');

const createCommentParamsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  movie_id: joi.string().required()
});

module.exports =
  (async (request) => {

    const {
      value: params,
      error: paramsValidationError,
    } = createCommentParamsSchema.validate(request.params);

    if (paramsValidationError) {
      throw paramsValidationError;
    }

    const { name, email, movie_id: movieId } = params;

    // Movie exists
    const movie = await findMovieByIDQuery(movieId);
    if (!!movie)
      return await CommentsHelper.createComment(name, email, movie);

    throw "this movie doesn't exists"
  });
