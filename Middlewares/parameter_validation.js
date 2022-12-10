const validator = require("express-validator");
const { error } = require("../helper.js");
const { success } = require("../helper.js");


  checkEmailPassword = (err,next) => {
    try{
    return [
      validator.body("email").isEmail().withMessage("Email invalide"),
      validator.body("password").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"), 
      // validator.body("password").isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1, returnScore: false }).withMessage("Le mot de passe doit contenir au moins 6 caractères dont au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 symbole"),
    ];
    } catch (err) {
      next(err);
    }
  }

  

  module.exports = {checkEmailPassword};
