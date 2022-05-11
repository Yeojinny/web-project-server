const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");

//pool객체 생성
const pool = mysql.createPool(dbConfig);

//pool에서 connection을 얻기
function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
}

module.exports = getConnection;

// pool.getConnection(function (err, connection) {
//   if (err) throw err;
//   else {
//     connection.query("sql 쿼리", function (err, results) {
//       if (err) throw err;
//       else console.log(results);
//     });
//     connection.release();
//   }
// });

// const preventClosingConnection = () => {
//   connection.query("SELECT 1");
// };

// const intervalId = setInterval(preventClosingConnection, 5000);
