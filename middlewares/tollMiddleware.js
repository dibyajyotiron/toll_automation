const { BAD_REQUEST, FORBIDDEN, CONFLICT } = require("../lib/errorLib");
const config = require("config");
const jwt = require("jsonwebtoken");

const { TollBooth } = require("../models/toll");
const { Receipt } = require("../models/receipt");
module.exports = {
	async auth(req, res, next) {
		const token = req.headers["x-auth-token"];
		if (!token)
			return res.status(401).json({
				error: true,
				message: "You've to login to access this route!",
			});

		try {
			const decoded = jwt.verify(token, config.get("secretOrKey"));
			req.user = decoded;
			return next();
		} catch (error) {
			return res.status(400).json({ error: true, message: "Invalid token provided." });
		}
	},
	/**
	 * This middleware validates a receipt, to check if a user is allowed to pass through a toll in his desired direction
	 * @param {'create' | 'fetch'} action
	 */
	validateReceipt(action) {
		return async (req, res, next) => {
			let vrn, direction;
			if (action === "fetch") {
				({ vrn, direction } = req.query);
			}
			if (action === "create") {
				({ vrn, direction } = req.body);
			}
			const dirMatcher = {};
			if (["north", "south"].includes(direction)) {
				dirMatcher.direction = {
					$in: [direction, "roundAllowed"],
				};
			} else {
				dirMatcher.direction = direction;
			}
			const receipt = await Receipt.aggregate([
				{
					$match: {
						vrn,
						...dirMatcher,
						validTill: { $gte: new Date() },
					},
				},
			]);
			if (action === "create") {
				if (Array.isArray(receipt) && receipt.length) {
					return next(
						CONFLICT({
							message: "Can't create receipt as it already exists!",
							data: receipt[0],
							keyName: "receipt",
						})
					);
				}
				return next();
			}
			if (!receipt || (Array.isArray(receipt) && !receipt.length)) {
				return next(
					FORBIDDEN({
						message: "This vehicle is not registered to pass from this toll!",
					})
				);
			}
			res.locals.receipt = receipt[0];
			return next();
		};
	},
};
