const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")

const deleteCommentParamsSchema = joi.object({
  comment_id: joi.string().required(),
  email: joi.string().email().required()
});

module.exports =
  (async (request) => {
    const {
      value: params,
      error: paramsValidationError,
    } = deleteCommentParamsSchema.validate(request.params);

    if (paramsValidationError) {
      throw paramsValidationError;
    }

    const { comment_id, email } = params;
    return await CommentsHelper.deleteComment(comment_id, email);
  });
