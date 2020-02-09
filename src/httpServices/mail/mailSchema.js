import Joi from "joi-browser";

const mailSchema = {
  email: Joi.string().required(),
  mail: Joi.string().required()
};
export function validateMail(data) {
  const result = Joi.validate(data, mailSchema);
  if (result.error)
    return {
      key: result.error.details[0].context.key,
      message: result.error.details[0].message
    };
  return null;
}
