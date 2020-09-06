const { TollBooth } = require("../models/toll");
const { Receipt } = require("../models/receipt");

module.exports = {
	async createTollBooth(req, res) {
		const { number, zone } = req.body;
		await TollBooth.create({
			zone,
			number,
		});
		return res.json({
			success: true,
		});
	},

	async loginTollBooth(req, res) {
		const { number, zone } = req.body;
		const tollBooth = await TollBooth.findOne({
			zone,
			number,
		});
		const token = tollBooth.generateAuthToken();
		return res.header("x-auth-token", token).json({ message: "Successfully logged in!" });
	},
	async isVehicleAllowed(req, res) {
		const { receipt } = res.locals;
		return res.json({
			allowed: true,
			receipt,
		});
	},
	async generateReceipt(req, res) {
		const { vrn, direction } = req.body;
		const newReceipt = new Receipt({
			vrn,
			direction,
		});
		await newReceipt.save(req);
		return res.json({
			success: true,
			receipt: newReceipt,
		});
	},
};
