const Joi = require('@hapi/joi');

const loginValidation = function(data){
    const schema = Joi.object({
        username: Joi.string()
            .username()
    })
}