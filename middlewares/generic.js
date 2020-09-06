const mongoose = require("mongoose");
const config = require("config");
const errorLib = require("../lib/errorLib");
module.exports = {
	validateReqBody(joiSchema) {
		return (req, res, next) => {
			const { error } = joiSchema(req.body, req);
			if (error)
				return res.status(400).json({
					error: true,
					message: error.details ? error.details[0].message : error.message,
				});
			return next();
		};
	},
	validateReqQuery(joiSchema) {
		return (req, res, next) => {
			const { error } = joiSchema(req.query, req);
			if (error)
				return res.status(400).json({
					error: true,
					message: error.details ? error.details[0].message : error.message,
				});
			return next();
		};
	},
	/**
	 *
	 * @param {'admin'|'toll'} role
	 */
	validateAccess(role) {
		return (req, res, next) => {
			const appToken = req.headers["x-app-token"];
			const requiredToken = config.get(`tokens.${role}`);
			const adminToken = config.get("tokens.admin");
			// make sure that if a route only allows toll tokens, admins are also allowed to access that route
			if (appToken === requiredToken || appToken === adminToken) {
				return next();
			}
			return next(
				errorLib.FORBIDDEN({
					message: "You're not authorized to do this action!",
				})
			);
		};
	},
};
