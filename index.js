const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(__dirname + "/static/css"));
app.use(express.static(__dirname + "/static/script"));
app.use(express.static(__dirname + "/static/img"));
app.use(express.static(__dirname + "/static/catalog"));

app.use(express.static(__dirname + "/static/json/jobs"));
app.use(express.static(__dirname + "/static"));
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(cookieParser());
app.set("view engine", "ejs");

const stolarija = __dirname + "/static/json/jobs/stolarija.json";
const tekstil = __dirname + "/static/json/jobs/tekstil.json";
const drvo = __dirname + "/static/json/jobs/drvo.json";
const metal = __dirname + "/static/json/jobs/metal.json";
const kamen = __dirname + "/static/json/jobs/kamen.json";

const index = __dirname + "/static/json/pages/index.json";
const contact = __dirname + "/static/json/pages/contact.json";
const about = __dirname + "/static/json/pages/about.json";

function ejsFeedBack(document, filePath, res, selectLanguage) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Greška pri čitanju fajla" });
    }

    try {
      const language = selectLanguage;
      const parseJson = JSON.parse(data);
      const jsonPodaci = parseJson[language];
      res.setHeader("Content-Type", "text/html");

      res.render(document, { jsonPodaci });
    } catch (parseError) {
      res.status(500).json({ error: "Greška pri parsiranju JSON-a" });
    }
  });
}

app.get("/", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("index", index, res, selectLanguage);
});

app.get("/about", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("about", about, res, selectLanguage);
});

app.get("/contact", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("contact", contact, res, selectLanguage);
});

app.get("/kamen", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("jobs", kamen, res, selectLanguage);
});

app.get("/metal", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("jobs", metal, res, selectLanguage);
});

app.get("/drvo", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("jobs", drvo, res, selectLanguage);
});

app.get("/tekstil", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("jobs", tekstil, res, selectLanguage);
});

app.get("/stolarija", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("jobs", stolarija, res, selectLanguage);
});

app.get("/legal", (req, res) => {
  res.render("legal");
});

app.post("/api/sendMail", async (req, res) => {
  const { nameLastname, email, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "djordjefrontdev@gmail.com",
      pass: "qlshnkbkcvilkshf",
    },
  });

  const mailOptions = {
    from: email,
    to: "office@ste-mi.com",
    subject: `Poruka sa sajta od ${nameLastname}`,
    html: `<p><strong>Poruka od:</strong> ${nameLastname},</p>
<p><strong>Email adresa:</strong> ${email}.</p>

<p><strong>Poruka:</strong></p>


<p>${text}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.json({ status: "err" });
    } else {
      return res.json({ status: "ok" });
    }
  });
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
