import express from "express";
import db from "../db.js";
import adminAuth from "../middleware/adminauth.js";
const router = express.Router();

// POST /api/sections
router.post("/", adminAuth, async (req, res) => {
  const { title, content } = req.body;
  const section = await db.query(
    "INSERT INTO sections (title, content) VALUES ($1, $2) RETURNING *",
    [title, content]
  );
  res.status(201).json({ section: section.rows });
});
// PUT /api/sections/:id
router.put("/:title", adminAuth, async (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  try {
    const updatedSection = await db.query(
      "UPDATE sections SET content = $1 WHERE title = $2 RETURNING *",
      [content, title]
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

// GET /api/sections
router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM sections");
  res.json(result.rows);
});

export default router;
