const db = require("../config/database");
class UserService {

  getUserByEmail = (email) => {
   return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (err, data, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(data[0]);
        }
      );
    });
  };
}

module.exports = UserService;
