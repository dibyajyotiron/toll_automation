const express = require("express");

const users = require("./tolls");

const { internalServerError, notFoundError, genericError } = require("../middlewares/error");

module.exports = (app) => {
	app.use(express.json());
	app.use("/tolls", users);
	app.use(genericError);
	app.use(notFoundError);
	// most likely it shouldn't reach internalServerError unless error comes from the db itself where errorCode is not present as internal server error is already handled in generic
	app.use(internalServerError);
};
