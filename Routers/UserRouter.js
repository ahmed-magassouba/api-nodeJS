const express = require("express");
const router = express.Router();
const {checkToken} = require("../Middlewares/token_validation");
const {checkEmailPassword} = require("../Middlewares/parameter_validation");

const userController = require("../Controllers/UserController");

var user = new userController();



/***************** GET USERS **************/
router.get("/",checkToken, user.getAll);

/***************** GET USER BY ID **************/
router.get("/:id",checkToken, user.getById);

/***************** POST USER **************/
router.post("/",checkEmailPassword(), user.create);

/***************** PUT USER **************/
router.put("/:id",checkToken, user.update);

/***************** PATCH USER **************/
router.patch("/:id",checkToken, user.updatePatch);

/***************** DELETE USER **************/
router.delete("/:id",checkToken, user.delete);


module.exports = router;
