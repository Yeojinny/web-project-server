const express = require("express");
const router = express.Router();
const request = require("request");
const maria = require("../modules/db");
const client_id = "QTOf544FkPwBZR8gZfaE";
const client_secret = "iZRwqUONop";

let cafeList = [];

/* GET home page. */
router.get("/", function (req, res, next) {
  let api_url = "https://openapi.naver.com/v1/search/local.json?";
  let option = {
    query: "카페", //지역 검색 텍스트
    start: 2, //검색시작 위치
    display: 5, //가져올 갯수
    sort: "random",
  };

  request.get(
    {
      uri: api_url,
      qs: option,
      headers: {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret,
      },
    },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
        res.end(body);
        cafeList = JSON.parse(body).items;
        insertTable();
      } else {
        res.status(response.statusCode).end();
        console.log("error = " + response.statusCode);
      }
    }
  );
});

function insertTable() {
  const sql =
    "INSERT INTO test.cafe (cafeName, cafeAddress, cafeStarAvg) VALUES ?;";
  const params = [];
  const randomStar = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  console.log(cafeList.length);
  for (let i = 0; i < cafeList.length; i++) {
    let ran = Math.floor(Math.random() * 10);
    let value = [cafeList[i].title, cafeList[i].address, randomStar[ran]];
    params.push(value);
  }
  console.log(params);
  maria.query(sql, [params], function (err, rows, fields) {
    if (!err) {
      console.log("성공");
    } else {
      console.log(err);
    }
  });
}

module.exports = router;
