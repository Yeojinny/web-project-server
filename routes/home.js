var express = require("express");
var router = express.Router();
const fs = require("fs");

//"/pica/post"
router.get("/post", function (req, res, next) {
  // 파일 읽기
  fs.readFile(__dirname + "/../data/post.json", (err, data) => {
    if (!err) res.send(data);
    else {
      console.log("Error", err);
      res.send(err);
    }
  });
});

//"/pica/login"
router.get("/login", function (req, res, next) {
  fs.readFile(__dirname + "/../data/login.json", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log("Error", err);
      res.send(err);
    }
  });
});

//"/pica/search"
router.post("/search", function (req, res, next) {
  let searchText = req.body["searchText"];
  console.log(searchText);
  res.send("ok");

  //   console.log(1);
  //   var body = "";

  //   request.on("data", function (data) {
  //     console.log(2);
  //     body += data;
  //     console.log(body);
  //     // Too much POST data, kill the connection!
  //     // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
  //     if (body.length > 1e6) request.connection.destroy();
  //   });

  //   request.on("end", function () {
  //     var post = qs.parse(body);
  //     // use post['blah'], etc.
  //   });

  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.status(200).sendFile(__dirname + "/data/post.json");
});

module.exports = router;
