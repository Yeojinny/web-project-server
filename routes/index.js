const express = require("express");
const router = express.Router();

//라우터 관리
const board = require("./board");
const search = require("./searchCafe");
const join = require("./join");
const home = require("./home");
const serverImagePath = "C:\\Users\\yjseo\\Desktop\\project\\clientImage";

router.use("/api/board", board);
router.use("/api/search", search);
router.use("/api/join", join);
router.use("/api/home", home);
router.use("/uploads", express.static(serverImagePath));

module.exports = router;
