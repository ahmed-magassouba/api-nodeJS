const generalService = require("../services/GeneralService");
const gs = new generalService();
const { success } = require("../helper.js");
const { error } = require("../helper.js");
const bcrypt = require("bcrypt");
const user = "user";
const validator = require("express-validator");

class UserController {
  getAll = async (req, res, next) => {
    try {
      let result = await gs.getAll(user);
      if (!result) {
        return res
          .status(500)
          .json(error("Erreur lors de la récupération des utilisateurs"));
      }
      return res.status(200).json(success("Liste des Utilisateurs", result));
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      let result = await gs.getById(user, req.params.id);
      if (!result) {
        return res.status(500).json(error("Utilisateur introuvable"));
      }
      return res.status(200).json(success("Utilisateur", result));
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      let errors = validator.validationResult(req);

      console.log(errors);
      if (!errors.isEmpty()) {
        return res.status(500).json(error({ error: errors.array() }));
      }

      req.body.created_at = new Date();
      req.body.updated_at = new Date();
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);

      let result = await gs.create(user, req.body);
      if (!result) {
        return res.status(500).json(error({ error: err.message }));
      }
      return res.status(200).json(success("Utilisateur créé", result));
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      req.body.updated_at = new Date();
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);

      let result = await gs.update(user, req.body, req.params.id);
      if (!result) {
        console.log(result);
        return res
          .status(500)
          .json(error("Impossible de modifier l'utilisateur"));
      }

      return res.status(200).json(success("Utilisateur modifié", result));
    } catch (err) {
      next(err);
    }
  };

  updatePatch = async (req, res, next) => {
    try {
      req.body.updated_at = new Date();
      const salt = bcrypt.genSaltSync(10);
      req.body.password = bcrypt.hashSync(req.body.password, salt);

      let result = await gs.updatePatch(user, req.body, req.params.id);
      if (!result) {
        return res.json({
          success: 0,
          message: "Impossible de modifier l'utilisateur",
        });
      }
      return res.status(200).json(success("Utilisateur modifié", result));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      let result = await gs.delete(user, req.params.id);
      if (!result) {
        return res.json({ success: 0, message: "Utilisateur introuvable" });
      }
      return res.status(200).json(success("Utilisateur supprimé", data));
    } catch (err) {
      next(err);
    }
  };
}

module.exports = UserController;
