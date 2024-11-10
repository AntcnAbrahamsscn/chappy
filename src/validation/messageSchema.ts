import Joi from "joi";

const messageSchema = Joi.object({
    sender: Joi.string().required(),
    content: Joi.string().min(1).max(500).required(),
    channel: Joi.string().allow(null),
    directTo: Joi.string().allow(null),
    sentAt: Joi.date().required(),
});

export default messageSchema;
