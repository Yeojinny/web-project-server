const express = require("express");
const router = express.Router();
const request = require("request");
const client_id = "QTOf544FkPwBZR8gZfaE";
const client_secret = "iZRwqUONop";
const rest_api_key = "8c3c9e38fcf03e08108fa167ba9812fd";
const axios = require("axios");

/* GET home page. */
router.get("/", function (req, res) {
  //post : req.body
  let keyword = req.query["keyword"];
  console.log(keyword);
  let url =
    "https://dapi.kakao.com/v2/local/search/keyword.json?query=" +
    encodeURIComponent(keyword) +
    "&category_group_code=CE7"; // url 및 키워드 담아 보냄
  let config = {
    headers: { Authorization: "KakaoAK 8c3c9e38fcf03e08108fa167ba9812fd" },
  }; //인증키 정보

  axios
    .get(url, config)
    .then((response) => {
      // API호출
      if (response.data != undefined || response.data != null) {
        let cafeList = response.data.documents.map((item) => {
          let obj = {};
          obj.title = item.place_name;
          obj.address = item.address_name;
          obj.roadAddress = item.road_address_name;
          return obj;
        });
        res.send(cafeList);
      }
    })
    .catch((error) => res.send(error));
  // request.get(
  //   {
  //     uri: api_url,
  //     headers: { Authorization: `KakaoAK ${rest_api_key}` },
  //   },
  //   function (error, response, body) {
  //     if (!error && response.statusCode == 200) {
  //       //res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
  //       //console.log(body);
  //       // res.end(body);
  //       // result = JSON.parse(body).items;
  //       // let cafeList = result.map((item) => {
  //       //   let obj = {};
  //       //   obj.title = item.title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
  //       //   obj.address = item.address;
  //       //   obj.roadAddress = item.roadAddress;
  //       //   return obj;
  //       // });
  //       // console.log(cafeList);
  //       // res.send(cafeList);
  //       console.log(response);
  //     } else {
  //       res.status(response.statusCode).end();
  //       console.log("error = " + response.statusCode);
  //     }
  //   }
  // );
});

// function insertTable() {
//   const sql =
//     "INSERT INTO test.cafe (cafeName, cafeAddress, cafeStarAvg) VALUES ?;";
//   const params = [];
//   const randomStar = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
//   console.log(cafeList.length);
//   for (let i = 0; i < cafeList.length; i++) {
//     let ran = Math.floor(Math.random() * 10);
//     let value = [cafeList[i].title, cafeList[i].address, randomStar[ran]];
//     params.push(value);
//   }
//   console.log(params);
//   maria.query(sql, [params], function (err, rows, fields) {
//     if (!err) {
//       console.log("성공");
//     } else {
//       console.log(err);
//     }
//   });
// }

module.exports = router;
