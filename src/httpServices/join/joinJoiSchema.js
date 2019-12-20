import Joi from "joi-browser";
const joinFormSchema = {
  _id: Joi.string(),
  fullName: Joi.string()
    .required()
    .min(2)
    .max(64),
  email: Joi.string()
    .required()
    .min(2)
    .max(64),
  school: Joi.string()
    .required()
    .min(2)
    .max(1024),
  experience: Joi.string()
    .required()
    .min(2)
    .max(64),
  career: Joi.string()
    .min(3)
    .max(1028),
  fields: Joi.string()
    .min(3)
    .max(1028),
  languages: Joi.string()
    .min(3)
    .max(1028),
  linkedin: Joi.string()
    .min(3)
    .max(1028),
  freelanceSite: Joi.string()
    .min(3)
    .max(1028),
  OrganizationField: Joi.string(),
  fieldExperience: Joi.string()
    .min(3)
    .max(2048)
};
export function ValidateJoinForm(joinForm) {
  const result = Joi.validate(joinForm, joinFormSchema);
  if (result.error)
    return {
      key: result.error.details[0].context.key,
      message: result.error.details[0].message
    };
  return null;
}
