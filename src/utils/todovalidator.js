import Joi from 'joi';

class Validator {
  static todoValidator(account) {
    return Joi.object({
      title: Joi.string().required(),
      description: Joi.string()
        .required(),
      priority: Joi.string()
        .required()
    }).validate(account);
  }
}
  export default Validator;