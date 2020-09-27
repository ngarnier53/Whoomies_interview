const joi = require("@hapi/joi");
const MoviesHelper = require("../utils/helpers")

const getMoviesByYearAndCountryParamsSchema = joi.object({
  year: joi.number().required(),
  country: joi.string()
});

module.exports =
(async (request) => {
  const {
    value: params,
    error: paramsValidationError,
  } = getMoviesByYearAndCountryParamsSchema.validate(request.params);

  if (paramsValidationError) {
    throw paramsValidationError;
  }

  const { year, country } = params;

  return await MoviesHelper.findMoviesByYearAndCountryQuery(year, country);
});
