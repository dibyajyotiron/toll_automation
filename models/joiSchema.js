const Joi = require("joi");
const directions = require("config").get("directions");

module.exports = {
	validateTollCreationSchema(toll) {
		const schema = {
			number: Joi.number().required().min(1),
			zone: Joi.string().required(),
		};
		return Joi.validate(toll, schema);
	},
	validateReceiptCreateSchema(receipt) {
		const schema = {
			vrn: Joi.string().length(10).required(),
			direction: Joi.string().valid(directions).required(),
		};
		return Joi.validate(receipt, schema);
	},
	validateReceiptFetchSchema(receipt) {
		const schema = {
			vrn: Joi.string().length(10).required(),
			direction: Joi.string().valid(directions).required(),
		};
		return Joi.validate(receipt, schema);
	},
};
