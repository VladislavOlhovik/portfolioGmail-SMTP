const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let login = process.env.SMTP_LOGIN || '';
let pass = process.env.SMTP_PASSWORD || '';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: login,
    pass: pass,
  },
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.post("/sendMessage", async function (req, res) {
  let {name, email, message} = req.body
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "HR", // sender address
    to: "alkhovikvlad@gmail.com", // list of receivers
    subject: "HR want me", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Message from portfolio</b>
    <div> 
    name: ${name}
    </div>
    <div> 
    e-mail: ${email}
    </div>
    <div> 
    message: ${message}
    </div>
    `, // html body
  });

  res.send("ok");
});

let port = process.env.PORT || 3003;

app.listen(port, function () {
  console.log("Example app listening on port 3003!");
});
