const generalService = require("../services/GeneralService");
const gs = new generalService();
const { success } = require("../helper.js");
const { error } = require("../helper.js");
const groupe = "groupe";
const validator = require("express-validator");

class GroupeController {
  getAll = async (req, res, next) => {
    try {
      let result = await gs.getAll(groupe);
      if (!result) {
        return res
          .status(500)
          .json(error("Erreur lors de la récupération des Groupes"));
      }
      return res.status(200).json(success("Liste des Groupes", result));
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      let result = await gs.getById(groupe, req.params.id);
      if (!result) {
        return res.status(500).json(error("Groupe introuvable"));
      }
      return res.status(200).json(success("Groupe", result));
    } catch (err) {
      next(err);
    }
  };

  create = async (req, res, next) => {
    try {
      let errors = validator.validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(500).json(error({ error: errors.array() }));
      }

      req.body.created_at = new Date();
      req.body.updated_at = new Date();

      let result = await gs.create(groupe, req.body);
      if (!result) {
        return res.status(500).json(error({ error: err.message }));
      }
      return res.status(200).json(success("Groupe créé", result));
    } catch (err) {
      next(err);
    }
  };

  update = async (req, res, next) => {
    try {
      req.body.updated_at = new Date();

      let result = await gs.update(groupe, req.body, req.params.id);
      if (!result) {
        console.log(result);
        return res.status(500).json(error("Impossible de modifier l'Groupe"));
      }

      return res.status(200).json(success("Groupe modifié", result));
    } catch (err) {
      next(err);
    }
  };

  updatePatch = async (req, res, next) => {
    try {
      req.body.updated_at = new Date();

      let result = await gs.updatePatch(groupe, req.body, req.params.id);
      if (!result) {
        return res.json({
          success: 0,
          message: "Impossible de modifier le Groupe",
        });
      }
      return res.status(200).json(success("Groupe modifié", result));
    } catch (err) {
      next(err);
    }
  };

  delete = async (req, res, next) => {
    try {
      let result = await gs.delete(groupe, req.params.id);
      if (!result) {
        return res.json({ success: 0, message: "Groupe introuvable" });
      }
      return res.status(200).json(success("Groupe supprimé", data));
    } catch (err) {
      next(err);
    }
  };
}

module.exports = GroupeController;
