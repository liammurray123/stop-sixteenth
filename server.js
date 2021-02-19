// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(express.static("pwaicons"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/home", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// app.get("/codeofconduct", (request, response) => {
//   response.sendFile(__dirname + "/CODE-OF-CONDUCT.md");
// });

app.get("/license", (request, response) => {
  response.sendFile(__dirname + "/LICENSE.md");
});

// app.get("/sw.js", (request, response) => {
//   response.sendFile(__dirname + "/sw.js");
// });

// app.get("/manifest.json", (request, response) => {
//   response.sendFile(__dirname + "/manifest.json");
// });

app.get("*", (request, response) => {
  response.sendFile(__dirname + "/views/404.html");
});

// async..await is not allowed in global scope, must use a wrapper
app.post("/", function(req, res) {
  
  const smtpTransport = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASS,
      },
    });
    

  const mailContent = {
    from: process.env.OUTLOOK_USER,
    to: process.env.ORDER_EMAIL,
    subject: `${req.body.name} contacted you`,
    generateTextFromHTML: true,
    html: `<b>Name</b>: ${req.body.name}<br>
<b>Email</b>: ${req.body.email}<br><br>
<b>Message</b>: ${req.body.message}`
  };

  smtpTransport.sendMail(mailContent, (err, response) => {
    //error ? console.log(error) : response.send("Your message has been sent!");
    if (err) {
      //response.send("Sorry, this form was not sent. Try again later?");
      console.error(err);
      var status = { status: "404" };
      response.send(status);
      console.log("Error!");
    } else {
      var status = { status: "200" };
      response.send(status);
      console.log("Sucess!");
    }
    smtpTransport.close();
  });

  res.redirect("/success");
});



// listen for requests :)
// TODO Change to process.env.PORT
const listener = app.listen(5000, () => { 
  console.log("Your app is listening on port " + listener.address().port);
});