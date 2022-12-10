const userService = require("../services/UserService");
const uS = new userService();
const authService = require("../services/AuthService");
const aS = new authService();
const bcrypt = require("bcrypt");
const { success } = require("../helper.js");
const { error } = require("../helper.js");
const jwt = require("jsonwebtoken");

const db = require("../config/database");

class AuthController {
  login = async (req, res, next) => {
    try {
      //on recupère notre user avec son mail
      let result = await uS.getUserByEmail(req.body.email);
      //si erreur on renvoie un message d'erreur
      if (!result) {
        res.status(500).json(error("Utilisateur introuvable"));
      }

      //si on a un user on compare le mot de passe
      if (result) {
        console.log(result);
        bcrypt.compare(req.body.password, result.password, (err, check) => {
          //si erreur on renvoie un message d'erreur
          if (err) {
            res.status(500).json(error({ error: err.message }));
          }

          //si le mot de passe est bon
          if (check) {
            //on supprime le mot de passe de notre user
            result.password = undefined;

            //on crée notre token
            const token = jwt.sign(
              {
                user: result,
              },
              process.env.JWT_KEY
              // {
              //   expiresIn: "1h",
              // }
            );
            return res.status(200).json({
              status: 200,
              message: "Authentification réussie",
              token: token,
            });
          } else {
            res
              .status(401)
              .json(
                error(
                  "Authentification échouée : email ou mot de passe incorrect"
                )
              );
          }
        });
      } else {
        res.status(401).json(error("Authentification échouée"));
      }
    } catch (err) {
      next(err);
    }
  };

  getMe = async (req, res, next) => {
    try {
      if (!req.decoded.user.id) {
        return res.status(401).json(error("Authentification échouée"));
      }

      let result = await aS.getMe(req.decoded.user.id);
      if (!result) {
        res.status(500).json(error({ error: err.message }));
      }
      res.status(200).json(success("Utilisateur connecté", result));
    } catch (err) {
      next(err);
    }
  };

  updateMe = async (req, res, next) => {
    try {
      req.body.updated_at = new Date();

      let result = await aS.updateMe(req.body, req.user.id);
      if (!result) {
        return res.status(500).json(error({ error: err.message }));
      }
      return res
        .status(200)
        .json(success("Utilisateur connecté modifié", result[0]));
    } catch (err) {
      next(err);
    }
  };
}

module.exports = AuthController;
