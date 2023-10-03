const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(__dirname + "/static/css"));
app.use(express.static(__dirname + "/static/script"));
app.use(express.static(__dirname + "/static/img"));
app.use(express.static(__dirname + "/static/json/jobs"));
// app.use("/", express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(bodyParser.json());

const stolarija = __dirname + "/static/json/jobs/stolarija.json";
const tekstil = __dirname + "/static/json/jobs/tekstil.json";
const drvo = __dirname + "/static/json/jobs/drvo.json";
const metal = __dirname + "/static/json/jobs/metal.json";
const index =  __dirname + "/static/json/pages/index.json";

let selectedLanguage;

app.post("/api/language", async (req, res) => {
  const { language } = req.body;
  selectedLanguage = language;
});

function ejsFeedBack(document, filePath, res) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Greška pri čitanju fajla" });
    }

    try {
      const language = "fr";
      console.log(language);
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
  ejsFeedBack("jobs", metal, res);
});

app.get("/drvo", (req, res) => {
  ejsFeedBack("jobs", drvo, res);
});
app.get("/tekstil", (req, res) => {
  ejsFeedBack("jobs", tekstil, res);
});

app.get("/stolarija", (req, res) => {
  ejsFeedBack("jobs", stolarija, res);
});

app.get("/", (req, res) => {
  ejsFeedBack("index", index, res);
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "/static/contact.html"));
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
