// import { WithId } from "mongodb";
import Joi from "joi";

// Här ska vi ha JOI!
const loginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).max(128).required(),
});

export default loginSchema;
