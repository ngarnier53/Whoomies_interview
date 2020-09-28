Parse.Cloud.afterDelete("Comments", function(request) {
    const { object: comment } = request;
    console.log("TRIGGER AFTER DELETE COMMENTS");

    const commentJSON = comment.toJSON();

    // Update number of comments
    Parse.Cloud.startJob("UpdateCommentsNumberByMovie", {movie_id: commentJSON.movie_id});

    return true;
});
