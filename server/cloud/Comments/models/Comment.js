const moment = require('moment');
const {MovieModel} = require('../../Movies/models/Movie');

class CommentModel
{
  static toJSON(obj)
  {
    return {
      name: obj.name,
      email: obj.email,
      date: obj.date && moment(obj.date).isValid() ? moment(obj.date.iso).format("X") : null,
      movie: !!obj.movie && typeof obj.movie === 'object' && obj.movie.__type !== "Pointer" ? MovieModel.toJSON(obj.movie) : obj.movie
    }
  }
}

module.exports = {CommentModel};