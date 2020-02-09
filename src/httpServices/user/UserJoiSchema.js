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
    .max(127)
    .allow(null, ""),
  long_desc: Joi.string()
    .min(20)
    .max(1028)
    .allow(null, ""),
  linkngedIn: Joi.string().allow(null, ""),
  twitter: Joi.string().allow(null, ""),
  facebook: Joi.string().allow(null, ""),
  github: Joi.string().allow(null, ""),
  profile_photo: Joi.string().allow(null, ""),
  job: Joi.string().allow(null, ""),
  phone: Joi.string()
    .max(24)
    .allow(null, ""),
  address: Joi.string()
    .max(1028)
    .allow(null, "")
};

export const updateUserSchema = {
  short_desc: Joi.string()
    .min(5)
    .max(127)
    .allow(null, ""),
  long_desc: Joi.string()
    .min(20)
    .max(1028)
    .allow(null, ""),
  linkngedIn: Joi.string().allow(null, ""),
  twitter: Joi.string().allow(null, ""),
  facebook: Joi.string().allow(null, ""),
  github: Joi.string().allow(null, ""),
  profile_photo: Joi.string().allow(null, ""),
  job: Joi.string().allow(null, ""),
  phone: Joi.string()
    .max(24)
    .allow(null, ""),
  address: Joi.string()
    .max(1028)
    .allow(null, "")
};
export const passwordSchema = {
  password: Joi.string()
    .min(6)
    .required(),
  newPassword: Joi.string()
    .min(6)
    .required(),
  confirmPassword: Joi.string()
    .min(6)
    .required()
};
export function validateUser(user) {
  const result = Joi.validate(user, userSchema);
  if (!result.error) return null;
  return {
    key: result.error.details[0].context.key,
    message: result.error.details[0].message
  };
}

export function validateUpdateUser(user) {
  const result = Joi.validate(user, updateUserSchema);
  if (!result.error) return null;
  return {
    key: result.error.details[0].context.key,
    message: result.error.details[0].message
  };
}
export function validateChangePassword(data) {
  const result = Joi.validate(data, passwordSchema);
  if (!result.error) return null;
  return {
    key: result.error.details[0].context.key,
    message: result.error.details[0].message
  };
}
