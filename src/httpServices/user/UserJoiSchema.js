import Joi from "joi-browser";
export const userSchema = {
  _id: Joi.string(),
  name: Joi.string()
    .required()
    .min(2)
    .max(64),
  email: Joi.string()
    .required()
    .min(8)
    .max(256),
  password: Joi.string().required(),
  gender: Joi.string().required(),
  short_desc: Joi.string()
    .min(5)
    .max(127),
  long_desc: Joi.string()
    .min(20)
    .max(1028),
  linkngedIn: Joi.string(),
  twitter: Joi.string(),
  facebook: Joi.string(),
  github: Joi.string(),
  profile_photo: Joi.string(),
  job: Joi.string()
};
export function validateUser(user) {
  const result = Joi.validate(user, userSchema);
  if (!result.error) return null;
  return {
    key: result.error.details[0].context.key,
    message: result.error.details[0].message
  };
}
