
import notes from "../data/notes.js";

// 1. Create a new note
export const createNote = (req, res) => {
    const { title, content } = req.body;

    if (
        typeof title !== "string" ||
        typeof content !== "string" ||
        !title.trim() ||
        !content.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Title and content are required."
        });
    }

    const newNote = {
        id: Date.now(),
        title: title.trim(),
        content: content.trim()
    };

    notes.push(newNote);

    return res.status(201).json({
        success: true,
        message: "Note created successfully.",
        data: newNote
    });
};

// 2. Get all notes
export const getAllNotes = (req, res) => {
    return res.status(200).json({
        success: true,
        count: notes.length,
        data: notes
    });
};

// 3. Update a note
export const updateNote = (req, res) => {
    const noteId = Number(req.params.id);
    const { title, content } = req.body;

    const note = notes.find((item) => item.id === noteId);

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found."
        });
    }

    if (
        (title !== undefined &&
            (typeof title !== "string" || !title.trim())) ||
        (content !== undefined &&
            (typeof content !== "string" || !content.trim()))
    ) {
        return res.status(400).json({
            success: false,
            message: "Title and content must be non-empty strings."
        });
    }

    if (title !== undefined) {
        note.title = title.trim();
    }

    if (content !== undefined) {
        note.content = content.trim();
    }

    return res.status(200).json({
        success: true,
        message: "Note updated successfully.",
        data: note
    });
};

// 4. Delete a note
export const deleteNote = (req, res) => {
    const noteId = Number(req.params.id);

    const noteIndex = notes.findIndex((item) => item.id === noteId);

    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Note not found."
        });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];

    return res.status(200).json({
        success: true,
        message: "Note deleted successfully.",
        data: deletedNote
    });
};
