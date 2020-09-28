const joi = require("@hapi/joi");
const CommentsHelper = require("../utils/helper")


module.exports =
  (async (request) => {

    return await CommentsHelper.allCommentsFormatted();
  });
