var express = require("express");
const router = express.Router();

const {checkToken} = require("../Middlewares/token_validation");
const {checkEmailPassword} = require("../Middlewares/parameter_validation");

const authController = require("../Controllers/AuthController");
var auth = new authController();

/***************** LOGIN USER**************/
router.post("/", auth.login);

/***************** GET ME **************/
router.get("/getMe",checkToken, auth.getMe);

/***************** PUT ME **************/
router.put("/putMe",checkToken, auth.updateMe);




module.exports = router;