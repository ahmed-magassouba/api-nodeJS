const db = require("../config/database");

class UserService {
  getAll = (table) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM ${table}`, [], (err, data, fields) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
    });
  };

  
  getById = (table, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM ${table} WHERE id = ?`,
        [id],
        (err, data, fields) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(data[0]);
          }
        }
      );
    });
  };


  create = (table, objet) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO ${table} SET ?`, [objet], (err, data, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });
  };


  update = (table, objet, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${table} SET ? WHERE id = ?`,
        [objet, id],
        (err, data, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(data[0]);
        }
      );
    });
  };


  updatePatch = (table, objet, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE ${table} SET ? WHERE id = ?`,
        [objet, id],
        (err, data, fields) => {
          if (err) {
            return reject(err);
          }
          return resolve(data[0]);
        }
      );
    });
  };


  delete = (table, id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM ${table} WHERE id = ?`,
        [id],
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
