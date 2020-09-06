const mongoose = require("mongoose");
const { Schema } = mongoose;
const { dayFromNow } = require("../lib/helpers");
const directions = require("config").get("directions");

const receiptSchema = new Schema(
	{
		_tollBooth: {
			type: Schema.Types.ObjectId,
			ref: "TollBooth",
		},
		vrn: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			enum: [100, 200],
		},
		validTill: {
			type: Date,
			default: dayFromNow,
		},
		direction: {
			type: String,
			enum: directions,
			required: true,
		},
	},
	{ timestamps: true }
);

receiptSchema.pre("save", function (next, req) {
	if (this.isNew) {
		this._tollBooth = req.user._id;
		if (this.direction === "roundAllowed") {
			this.amount = 200;
		} else {
			this.amount = 100;
		}
	}
	return next();
});

module.exports.Receipt = mongoose.model("Receipt", receiptSchema);
