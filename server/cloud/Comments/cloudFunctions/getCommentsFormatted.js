const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")


module.exports =
  (async (request) => {

    return await CommentsHelper.allComments(30, true);
  });
