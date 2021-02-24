import Joi from 'joi';

export function todoValidator(req, res, next) {
  const todoCreation = Joi.object({
    title: Joi.string().min(4).required()
      .trim(),
      Description: Joi.string().min(6).required()
      .trim(),
      Priority: Joi.string().required()
      .trim()

  });
  const result = todoCreation.validate(req.body);
  if (result.error) return res.status(400).json({ Message: result.error.details[0].message });
  next();
}