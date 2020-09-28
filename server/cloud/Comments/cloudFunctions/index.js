Parse.Cloud.define(
  "commentsByMovie",
  require("./getCommentsByMovie")
);

Parse.Cloud.define("getComments", require('./getComments'));

// Formatted
Parse.Cloud.define("getCommentsFormatted", require('./getCommentsFormatted'));

Parse.Cloud.define("commentsByMovieFormatted", require('./getCommentsByMovieFormatted'));