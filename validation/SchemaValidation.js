import Joi from 'joi'
export const userSchema= Joi.object({
    name:Joi.string().required(),
    dob:Joi.date().required(),
    city:Joi.string().required(),
    desc:Joi.string().required(),
    email:Joi.string().required(),
    mobile: Joi.string().required(),
    gender:Joi.string().required(),
    hobbies:Joi.array().required(),
 

})