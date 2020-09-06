const logger = require("../services/logger");
module.exports = {
	notFoundError(req, res, next) {
		return res.status(404).json({
			error: true,
			message: "The resource you are looking for is not available",
		});
	},

	internalServerError(error, req, res, next) {
		console.error(error.message, error);
		return res.status(500).json({ error: true, message: "Something went wrong!" });
	},

	genericError(error, req, res, next) {
		console.error(error.message, error);

		if (error.code === 11000) {
			return res.status(409).json({
				error: true,
				message: "This value already exists!",
				details: error.keyValue,
			});
		}
		return res.status(error.statusCode).json({
			error: true,
			message: `${error.message}`,
			[error.keyName || "data"]: error.data,
		});
	},
};
