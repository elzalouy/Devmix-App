import Joi from "joi-browser";

const Schema = {
  name: Joi.string()
    .required()
    .min(2)
    .max(128),
  phone: Joi.string()
    .required()
    .min(6)
    .max(22),
  email: Joi.string().required(),
  message: Joi.string()
    .required()
    .min(3)
    .max(1024)
};
export function validateContact(contact) {
  const result = Joi.validate(contact, Schema);
  if (!result.error) return null;
  return {
    key: result.error.details[0].context.key,
    message: result.error.details[0].message
  };
}
