const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(express.static('public'))
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

var mysql = require("mysql2");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql1234",
  database: "Visitors",
});

app
  .route("/")
  .get((req, res) => {
    console.log("here");
    res.render("final prototype");
  })
  .post((req, res, next) => {
    let name = req.body.name;
    let number = req.body.number;

    con.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");

      let dup = `SELECT * FROM Visitors WHERE VisNumber='${number}'`;
      con.query(dup, function (err, row) {
        if (err) {
          console.log("Error in DB");
          console.log(err);
          return;
        } else {
          if (row && row.length) {
            console.log("Duplicate");
          // res.send("you already have subscribed ");
            // do something with your row variable
          } else {
            var sql =` INSERT INTO visitors(VisID, VisName, VisNumber) VALUES(null,'${name}','${number}')`;
            con.query(sql, function (err, result) {
              if (err) throw err;
              console.log("1 record inserted");
              var cookie = req.cookies.cookieName;
              if (cookie === undefined) {
                // no: set a new cookie
                res
                  .cookie("number", number, { maxAge: 900000,})
                  .render("final prototype");
              }
            });
          }
        }
      });
    });
    // res.render("final prototype");
  });
app.listen(3000);