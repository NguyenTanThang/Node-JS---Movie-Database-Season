const Joi = require('joi');

const getMessage = (validationObject) => {
    return validationObject.error.details[0].message;
}

const addGenreSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
})

const addPlanSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    price: Joi.number()
        .required(),
    description: Joi.string()
        .min(3)
        .required(),
    durationInDays: Joi.number()
        .required(),
})

const addCommentSchema = Joi.object({
    customerID: Joi.string()
        .required(),
    movieSeriesID: Joi.string()
        .required(),
    content: Joi.string()
        .required(),
})

const addSubscriptionSchema = Joi.object({
    customerID: Joi.string()
        .required(),
    planID: Joi.string()
        .required()
})

const editSubscriptionSchema = Joi.object({
    ended_date: Joi.date()
        .required(),
    planID: Joi.string()
        .required()
})

const addManagerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(3)
        .required(),
    roleID: Joi.string()
        .required(),
})

const loginManagerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(3)
        .required()
})

const editManagerSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(3)
        .allow('')
        .optional(),
    roleID: Joi.string()
        .required(),
})

const changePasswordManager = Joi.object({
    oldPassword: Joi.string()
        .min(3)
        .max(30)
        .required(),
    newPassword:  Joi.string()
        .min(3)
        .max(30)
        .required()
})

const addCustomerSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .email({
            tlds: {
                allow: false
            }
        })
        .required(),
    username: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .min(3)
        .required(),
})

const loginSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .email({
            tlds: {
                allow: false
            }
        })
        .required(),
    password: Joi.string()
        .min(3)
        .required(),
})

const editCustomerSchema = Joi.object({
    email: Joi.string()
        .min(3)
        .email({
            tlds: {
                allow: false
            }
        })
        .required(),
    password: Joi.string()
        .min(3)
        .allow('')
        .optional(),
    username: Joi.string()
        .max(30)
        .min(3)
        .allow('')
        .optional(),
})

const addMovieSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(256)
        .required(),
    IMDB_ID: Joi.string()
        .required(),
    trailerURL: Joi.string()
        .required(),
    movieURL: Joi.string()
        .required(),
    posterURL: Joi.string()
        .required(),
    description: Joi.string()
        .allow('')
        .optional(),
})

const editMovieSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(256)
        .optional(),
    IMDB_ID: Joi.string()
        .optional(),
    trailerURL: Joi.string()
        .optional(),
    movieURL: Joi.string()
        .optional(),
    posterURL: Joi.string()
        .optional(),
    description: Joi.string()
        .allow('')
        .optional(),
})

const addSeriesSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(256)
        .required(),
    IMDB_ID: Joi.string()
        .required(),
    trailerURL: Joi.string()
        .required(),
    posterURL: Joi.string()
        .required(),
    description: Joi.string()
        .allow('')
        .optional(),
})

const editSeriesSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(256)
        .optional(),
    IMDB_ID: Joi.string()
        .optional(),
    trailerURL: Joi.string()
        .optional(),
    posterURL: Joi.string()
        .optional(),
    description: Joi.string()
        .allow('')
        .optional(),
})

const addSeasonSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(256)
        .required(),
    seriesID: Joi.string()
        .required(),
    trailerURL: Joi.string()
        .required(),
    posterURL: Joi.string()
        .required(),
    seasonNum: Joi.number()
        .required(),
    description: Joi.string()
        .allow('')
        .optional(),
})

const editSeasonSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(256)
        .optional(),
    trailerURL: Joi.string()
        .optional(),
    posterURL: Joi.string()
        .optional(),
    description: Joi.string()
        .allow('')
        .optional(),
})

module.exports = {
    addGenreSchema,
    addManagerSchema,
    editManagerSchema,
    addCustomerSchema,
    editCustomerSchema,
    addMovieSchema,
    editMovieSchema,
    addSeriesSchema,
    editSeriesSchema,
    getMessage,
    addPlanSchema,
    addSubscriptionSchema,
    editSubscriptionSchema,
    loginManagerSchema,
    changePasswordManager,
    addSeasonSchema,
    editSeasonSchema,
    addCommentSchema,
    loginSchema
}