const moment = require('moment');

class MovieModel
{
  static toJSON(obj)
  {
    return {
      title: obj.title,
      plot: obj.plot,
      comments: !!obj.num_mflix_comments ? obj.num_mflix_comments : 0,
      year: obj.year,
      country: obj.countries,
      rated: obj.rated,
      released_date: moment(obj.released_date).isValid() ? moment(obj.released_date).format("X") : null,
      cast: obj.cast
    }
  }
}

module.exports = {MovieModel}