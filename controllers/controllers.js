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

// const getByCompanyId = (req, res) => {
//   // SELECT USERS WHERE ID = <REQ PARAMS ID>
//   console.log(req.params);

//   let id  = req.params.id;
//   let sql = "SELECT * FROM ?? WHERE ?? = ?";
//   // WHAT GOES IN THE BRACKETS
//   sql = mysql.format(sql, ["company", "id", id]);

//   pool.query(sql, (err,rows) => {
//     if (err) return handleSQLError(res, err);
//     return res.json(rows);
//   });
// };

const getByCompany = (req, res) => {
    // SELECT USERS WHERE ID = <REQ PARAMS ID>
    console.log(req.params);
  
    let company  = req.params.company_name;
    let sql = "SELECT * FROM ?? WHERE ?? = ?";
    // WHAT GOES IN THE BRACKETS
    sql = mysql.format(sql, ["company", "company_name", company]);
  
    pool.query(sql, (err,rows) => {
      if (err) return handleSQLError(res, err);
      return res.json(rows);
    });
  };

const createUser = (req, res) => {
  // INSERT INTO USERS FIRST AND LAST NAME
  let sql = `INSERT INTO ?? (id, company_name, owner, email, address, product, type) VALUES (${req.body.id},"${req.body.company_name}",
  "${req.body.owner}","${req.body.email}","${req.body.address}","${req.body.product}","${req.body.type}")`;
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["company"]);

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
  sql = mysql.format(sql, ["company", body, "id", id]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.status(204).json();
  });
};

const deleteByCompanyname = (req, res) => {
  // DELETE FROM USERS WHERE FIRST NAME = <REQ PARAMS FIRST_NAME>
  const { company_name } = req.params;
  let sql = "DELETE FROM ?? WHERE ?? = ?";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, ["company", "company_name", company_name]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  });
};

module.exports = {
  getAll,
  getByCompany,
  createUser,
  updateUserById,
  deleteByCompanyname,
};
