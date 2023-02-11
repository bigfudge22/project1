var mysql = require('mysql');  
var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "mysql1234" ,
  database: "Visitors"
});  

con.connect(function(err) {  
  if (err) throw err;  
  console.log("Connected!");  
  var sql = "INSERT INTO Visitors (VisID, VisName,VisNumber) VALUES ('1', 'Ajeet Kumar', '0963194709')";  
  con.query(sql, function (err, result) {  
  if (err) throw err;  
  console.log("1 record inserted");  
  });  
});