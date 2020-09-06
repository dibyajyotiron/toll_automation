const mongoose = require("mongoose");

const { Schema } = mongoose;
const jwt = require("jsonwebtoken");

const config = require("config");

const tollBoothSchema = new Schema(
	{
		number: {
			type: Number,
		},
		zone: {
			type: String,
		},
	},
	{ timestamps: true }
);

tollBoothSchema.pre("save", async (next, { password }) => next());

/**
 * creates unique index on a combination of number and zone
 */
tollBoothSchema.index({ number: 1, zone: 1 }, { unique: true });

tollBoothSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			number: this.number,
			zone: this.zone,
		},
		config.get("secretOrKey")
	);
};

module.exports.TollBooth = mongoose.model("TollBooth", tollBoothSchema);
