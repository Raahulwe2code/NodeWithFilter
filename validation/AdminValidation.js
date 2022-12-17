import Joi from 'joi'
 export const AdminValidation= Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required().min(5).max(20),
    email:Joi.string().required()
})