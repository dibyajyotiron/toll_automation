module.exports = {
	dayFromNow() {
		let currentTime = new Date();
		currentTime.setTime(currentTime.getTime() + 1000 * 60 * 60 * 24);
		return currentTime;
	},
};
