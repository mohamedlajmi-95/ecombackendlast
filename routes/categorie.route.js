const express = require("express");
const router = express.Router();
const Categorie = require("../models/categorie");
const { verifyToken } = require("../middleware/Verify-token");
const { authorizeRoles } = require("../middleware/authorizeRole");

router.post("/", verifyToken,authorizeRoles("admin","user"), async (req, res) => {
  const cat1 = new Categorie(req.body);
  try {
    await cat1.save();
    res.status(200).json(cat1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/",verifyToken, async (req, res) => {
  try {
    const cat = await Categorie.find({}, null, { sort: { _id: -1 } });
    res.status(200).json(cat);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
  const cat = Categorie.find();
});

router.put("/:id",verifyToken, async (req, res) => {
  try {
    const cat1 = await Categorie.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(cat1);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// find by Id
router.get("/:id", async (req, res) => {
  try {
    const cat = await Categorie.findById(req.params.id);
    res.status(200).json(cat);
  } catch {
    res.status(404).json({ message: error.message });
  }
});

// Supprimer une catégorie

router.delete("/:categorieId", async (req, res) => {
  const id = req.params.categorieId;
  try {
    await Categorie.findByIdAndDelete(id);
    res.json({ message: "category deleted successfully" });
  } catch {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
