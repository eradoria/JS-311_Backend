const mysql = require("mysql");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/errors");

const getAll = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM company", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getByCompanyName = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  console.log(req.params);

  let name = req.params.company_name;
  let sql = "SELECT * FROM ?? WHERE ?? = ?";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["company", "company_name", name]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql = `INSERT INTO ?? (first_name, last_name) VALUES ("${req.body.first_name}","${req.body.last_name}")`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users"]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
  });
};

const updateUserById = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>
  const { id } = req.params;
  const { body } = req;
  let sql = "UPDATE ?? SET ? WHERE ?? = ?";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", body, "id", id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteUserByFirstName = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  const { first_name } = req.params;
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["users", "first_name", first_name]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAll,
  getByCompanyName,
  createUser,
  updateUserById,
  deleteUserByFirstName,
};
