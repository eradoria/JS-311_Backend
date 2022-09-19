const mysql = require("mysql");
const pool = require("../sql/connections");
const { handleSQLError } = require("../sql/errors");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authlogin = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>

  const { email, password } = req.body;
  let sql = "SELECT * FROM user_creds WHERE email = ?";
  // WHAT GOES IN THE BRACKETS
  sql = mysql.format(sql, [email]);
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    bcryptjs.compare(password, results[0].password, function (err, result) {
      // result == true
      console.log(result);
      if (err) {
        return res.status(500).json(err);
      } else if (!result) {
        return res.status(401).json({ MSG: "User or Password is Incorrect" });
      } else {
        const token = jwt.sign(
          { user_id: results[0].user_id },
          process.env.JWT_SECRET
        );
        res.cookie("Bearer", token, { maxAge: 900000 });
        res.header("Authorization", `Bearer ${token}`).send({
          signedToken,
        });

        return res.status(200).json(token);
      }
    });
  });
};

const authsignup = (req, res) => {
  // UPDATE USERS AND SET FIRST AND LAST NAME WHERE ID = <REQ PARAMS ID>

  const { email, password } = req.body;
  let sql = "INSERT INTO user_creds (email, password) VALUES (?, ?)";
  // WHAT GOES IN THE BRACKETS
  bcryptjs.hash(password, 10, function (err, hash) {
    // Store hash in your password DB.
    if (err) {
      return res.status(500).json(err);
    } else {
      sql = mysql.format(sql, [email, hash]);
      console.log(hash);
      pool.query(sql, (err, results) => {
        if (err) return handleSQLError(res, err);
        return res.status(200).json(results);
      });
    }
  });
};

module.exports = {
  authlogin,
  authsignup,
};
