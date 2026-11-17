
import express from "express";

import {
    createNote,
    getAllNotes,
    updateNote,
    deleteNote
} from "../controllers/notes.controller.js";

const router = express.Router();
router.post("/", createNote);
router.get("/", getAllNotes);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
