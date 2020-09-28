Parse.Cloud.define(
  "commentsByMovie",
  require("./getCommentsByMovie")
);

Parse.Cloud.define(
  "getComments",
  require('./getComments')
);

Parse.Cloud.define(
  "getCommentsFormatted",
  require('./getCommentsFormatted')
);

Parse.Cloud.define(
  "commentsByMovieFormatted",
  require('./getCommentsByMovieFormatted')
);

Parse.Cloud.define(
  "createComment",
  require('./createComment')
);

Parse.Cloud.define(
  "deleteComment",
  require('./deleteComment')
);