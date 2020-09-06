const express = require("express");
const router = express.Router();
const { validateReqBody, validateReqQuery, validateAccess } = require("../middlewares/generic");
const { auth, validateReceipt } = require("../middlewares/tollMiddleware");
const { validateTollCreationSchema, validateReceiptCreateSchema, validateReceiptFetchSchema } = require("../models/joiSchema");
const { createTollBooth, loginTollBooth, isVehicleAllowed, generateReceipt } = require("../controllers/tollBoothController");

router.post("/register", validateReqBody(validateTollCreationSchema), validateAccess("admin"), createTollBooth);

router.post("/login", validateAccess("toll"), loginTollBooth);

router.use(auth);

router.get("/vehicle/is-allowed", validateReqQuery(validateReceiptFetchSchema), validateReceipt("fetch"), isVehicleAllowed);

router.post("/vehicle/generate-receipt", validateReqBody(validateReceiptCreateSchema), validateReceipt("create"), generateReceipt);

module.exports = router;
