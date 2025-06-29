import express from "express";
import db from "../db.js";
import adminAuth from "../middleware/adminauth.js";

const router = express.Router();

// POST /api/Cards
router.post("/", adminAuth, async (req, res) => {
  const { title, description } = req.body;
  try {
    const section = await db.query(
      "INSERT INTO Cards (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.status(201).json({ section: section.rows[0] });
  } catch (error) {
    console.error("Error creating section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/Cards/:id
router.put("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedSection = await db.query(
      "UPDATE Cards SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id]
    );

    if (updatedSection.rows.length === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({ section: updatedSection.rows[0] });
  } catch (error) {
    console.error("Error updating section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET /api/Cards
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM Cards");
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching Cards:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /api/Cards/:id
router.delete("/:id", adminAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query(
      "DELETE FROM Cards WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.json({
      message: "Section deleted successfully",
      section: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting section:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
