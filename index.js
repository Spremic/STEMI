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

app.get("/metal", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("jobs", metal, res, selectLanguage);
});

app.get("/about", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("about", about, res, selectLanguage);
});

app.get("/contact", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("contact", contact, res, selectLanguage);
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

app.get("/", (req, res) => {
  const selectLanguage = req.cookies.language || "srb";
  ejsFeedBack("index", index, res, selectLanguage);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
