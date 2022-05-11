var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");

let mail;
let name;

//create code
function createCode(codeLength) {
  let code = "";
  for (let i = 0; i < codeLength; i++) {
    let rand = String.fromCharCode(Math.floor(Math.random() * 58) + 33);
    code += rand;
  }
  return code;
}

//mail author info
const email = {
  // "host":"smtp.mailtrap.io",
  // "port":"2525",
  // "secure":false,
  service: "Gmail",
  auth: {
    user: "ryu8701@gmail.com",
    pass: "tkfkd706",
  },
};

//send mail
const send = async (data) => {
  nodemailer.createTransport(email).sendMail(data, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
      return info.response;
    }
  });
};

router.get("/", function (req, res, next) {
  name = req.query.sendName;
  mail = req.query.sendMail;

  const key = createCode(8);

  //email content
  const content = {
    from: "ryu8701@gmail.com",
    to: mail,
    subject: "[Cafe Community] 본인 인증을 위한 인증코드 안내메일입니다.",
    text: "본인 확인을 위해 아래의 인증코드를 화면에 입력해주세요.\n" + key,
  };

  console.log(name, mail);
  res.send(key);
  console.log(key);

  //send mail
  send(content);
});

//get address
const getAddress = function (address) {
  content.to = mail;
  send(content);
};

module.exports = router;
