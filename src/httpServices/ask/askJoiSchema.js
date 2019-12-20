import Joi from "joi-browser";

export const AskSchema = {
  _id: Joi.string(),
  question: Joi.string()
    .min(1)
    .max(2000)
    .required(),
  answer: Joi.string()
    .min(1)
    .allow(null),
  date: Joi.date(),
  user_id: Joi.string().allow(null)
};
export function validateAsk(ask) {
  const result = Joi.validate(ask, AskSchema);
  if (!result.error) return null;
  return {
    key: result.error.details[0].context.key,
    message: result.error.details[0].message
  };
}
