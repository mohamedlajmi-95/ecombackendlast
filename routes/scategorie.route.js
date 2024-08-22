const express = require("express");
const router = express.Router();
const Scategorie = require("../models/scategorie");

router.post("/", async (req, res) => {
  const scat1 = new Scategorie(req.body);
  try {
    await scat1.save();
    res.status(200).json(scat1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const scat = await Scategorie.find({}, null, {
      sort: { _id: -1 },
    }).populate("categorieID");
    res.status(200).json(scat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  const scat = Scategorie.find();
});

router.put("/:id", async (req, res) => {
  try {
    const scat1 = await Scategorie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(scat1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// find by Id
router.get("/:id", async (req, res) => {
  try {
    const scat = await Scategorie.findById(req.params.id);
    res.status(200).json(scat);
  } catch {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer une catégorie

router.delete("/:scategorieId", async (req, res) => {
  const id = req.params.scategorieId;
  try {
    await Scategorie.findByIdAndDelete(id);
    res.json({ message: "categorie deleted successfully" });
  } catch {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
