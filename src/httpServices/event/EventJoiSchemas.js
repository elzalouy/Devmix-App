import Joi from "joi-browser";

const eventSessionSchema = {
  session_name: Joi.string()
    .min(3)
    .max(128)
    .required(),
  session_number: Joi.number().required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
  instructor_id: Joi.string().required(),
  content_desc: Joi.string()
    .required()
    .min(5)
    .max(1028),
  content_link: Joi.string()
};

const feedbacks = {
  user_id: Joi.string().required(),
  feedback: Joi.string()
    .required()
    .min(3)
    .max(50)
};
const EventSchema = {
  name: Joi.string()
    .min(3)
    .max(128)
    .required(),
  location: Joi.string()
    .min(3)
    .max(128)
    .required(),
  date: Joi.string().required(),
  cover_photo: Joi.any().required(),
  users: Joi.number(),
  feedbacks: Joi.array().items(feedbacks),
  sessions: Joi.array()
    .items(eventSessionSchema)
    .min(1)
    .required()
    .max(128),
  facebook_link: Joi.string(),
  twitter_link: Joi.string(),
  __v: Joi.number()
};
function validateEvent(event) {
  const result = Joi.validate(event, EventSchema);
  event.sessions.forEach(item => {
    let errors = validateSession(item);
    if (errors) return errors;
  });
  if (!result.error) return null;
  else return result.error.details[0].message;
}
function validateSession(session) {
  const result = Joi.validate(session, eventSessionSchema);
  if (!result.error) return null;
  let error = result.error.details[0].message;
  return error;
}
function validateFeedback(feedback) {
  const result = Joi.validate(feedback, feedbacks);
  if (!result.error) return null;
  let error = result.error.details[0].message;
  return error;
}
export {
  EventSchema,
  validateEvent,
  eventSessionSchema,
  validateSession,
  validateFeedback
};
