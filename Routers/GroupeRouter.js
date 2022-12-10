var express = require("express");

const router = express.Router();

const groupeController = require("../Controllers/GroupeController");
var groupe = new groupeController();


module.exports = router;

/***************** GET GROUPES **************/
router.get("/", groupe.getAll);

/***************** GET GROUPE BY ID **************/
router.get("/:id", groupe.getById);

/***************** POST GROUPE **************/
router.post("/", groupe.create);

/***************** PUT GROUPE **************/
router.put("/:id", groupe.update);

/***************** PATCH GROUPE **************/
router.patch("/:id", groupe.updatePatch);

/***************** DELETE GROUPE **************/
router.delete("/:id", groupe.delete);