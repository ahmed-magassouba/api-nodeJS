const express = require("express");
const router = express.Router();
const {checkToken} = require("../Middlewares/token_validation");
const {checkEmailPassword} = require("../Middlewares/parameter_validation");
// const uploadController = require("../Controllers/UploadController");

// var user = new uploadController();

/***************** POST SINGLE IMAGE **************/
router.post("/upload",checkToken);

/***************** POST MULTIPLE IMAGES **************/
router.post("/uploads",checkToken);

module.exports = router;