const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", (req, res) => {
  try {
    let rawdata = fs.readFileSync(__dirname + "/data.json");
    let data = JSON.parse(rawdata);
    res.render("pages/index", {
      title: "Page d'accueil",
      diligences: data.diligences,
    });
  } catch (error) {
    console.log("error on", error);
  }
});

router.get("/about", (req, res) => {
  res.render("pages/about", { title: "A propos" });
});

router.get("/services/:id", (req, res) => {
  let rawdata = fs.readFileSync(__dirname + "/data.json");
  let data = JSON.parse(rawdata);
  let diligence = {};

  data.diligences.forEach((e) => {
    if (e.diligence_id == req.params.id) {
      diligence = e;
    }
  });
  res.render("pages/services", {
    title: "Services",
    diligence: diligence,
    diligences: data.diligences,
  });
});

module.exports = router;
