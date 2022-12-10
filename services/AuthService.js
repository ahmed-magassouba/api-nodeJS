const db = require("../config/database");
class AuthService {
  getMe = (id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM user WHERE id = ?", [id], (err, data, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(data[0]);
      });
    });
  };

  updateMe = (objet, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE user SET ? WHERE id = ?",
        [objet, id],
        (err, data, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(data);
        }
      );
    });
  };
}

module.exports = AuthService;
