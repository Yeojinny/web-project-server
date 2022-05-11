var express = require("express");
var router = express.Router();
const getConnection = require("../modules/db");
//const maria = require("../modules/db");
const multer = require("multer");
const fs = require("fs");
const dayjs = require("dayjs");
let serverImagePath = "C:\\Users\\yjseo\\Desktop\\project\\clientImage";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //서버에 저장될 위치
    cb(null, serverImagePath);
  },
  filename: (req, file, cb) => {
    //파일명 설정을 돕기 위해 요청정보(req)와 파일(file)에 대한 정보를 전달함
    //동일한 파일명이 존재할 수 있기 때문에 시간 정보를 추가
    let saveName = `${Date.now()}_${file.originalname}`;
    cb(null, saveName);
  },
});

const upload = multer({ storage: storage });

//게시판 목록 가져오기 SELECT 쿼리
router.get("/", function (req, res, next) {
  // let data = fs.readFileSync("./dummy/board.json", "utf-8");
  // res.send(data);
  getConnection((conn) => {
    conn.query("SELECT * FROM test.board", function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err:" + err);
        res.send(err);
      }
    });
    conn.release();
  });

  //res.send(JSON.stringify(data.board));
  // maria.query("SELECT * FROM test.board", function (err, rows, fields) {
  //   if (!err) {
  //     console.log(rows);
  //     res.send(rows);
  //   } else {
  //     console.log("err:" + err);
  //     res.send(err);
  //   }
  // });
});

//게사판 글쓰기 insert쿼리
router.post("/save", upload.array("files"), function (req, res, next) {
  //console.log(req.files);
  //저장한 파일 이름 리스트를 만든다.
  let fileNameList = [];
  req.files.forEach((item) => {
    fileNameList.push(item.filename);
  });

  const sql = `INSERT INTO test.board (boardName,boardContent,starFood,starService,starPrice,
  starMood,createTime,updateTime,userID,cafeName,cafeAddress) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
  const params = [];
  let now = dayjs();
  params.push(req.body["boardName"]);
  params.push(req.body["boardContent"]);
  params.push(req.body["starFood"]);
  params.push(req.body["starService"]);
  params.push(req.body["starPrice"]);
  params.push(req.body["starMood"]);
  params.push(now.format("YYYY-MM-DD HH:mm:ss"));
  params.push(now.format("YYYY-MM-DD HH:mm:ss"));
  params.push(req.body["userID"]);
  params.push(req.body["cafeName"]);
  params.push(req.body["cafeAddress"]);
  console.log(params);

  getConnection((conn) => {
    conn.query(sql, params, function (err, results, fields) {
      if (!err) {
        //첨부파일이 존재하지 않으면 connect 반납 후 response
        if (!fileNameList.length) {
          conn.release();
          res.send("save");
          return;
        }
        //auto_increment 설정된 칼럼의 번호를 얻어온다.
        let boardID = results.insertId;
        //attach 테이블 insert
        const sql = `INSERT INTO test.attach (boardID, imagePath) VALUES ?`;
        let params = [];
        for (let i = 0; i < fileNameList.length; i++) {
          let item = [boardID, fileNameList[i]];
          params.push(item);
        }
        console.log(params);
        conn.query(sql, [params], (err, results) => {
          if (err) {
            console.log(err);
            res.send("err:" + err);
          } else {
            res.send("save");
          }
          conn.release();
        });
      } else {
        console.log("err:" + err);
        res.send(err);
      }
    });
  });

  // maria.query(sql, params, function (err, rows, fields) {
  //   if (!err) {
  //     res.send("서버 저장 완료");
  //   } else {
  //     res.send("error:" + err);
  //   }
  // });
});

router.get("/attach", function (req, res, next) {
  let sql = "SELECT * FROM test.attach";
  getConnection((conn) => {
    conn.query(sql, function (err, rows, fields) {
      if (!err) {
        res.send(rows);
      } else {
        console.log("err:" + err);
        res.send(err);
      }
      conn.release();
    });
  });
});

module.exports = router;
