import express from 'express';
import Note from '../models/Note.js'; 

const router = express.Router();

router.get('/allnotes', async (req, res) => {
  try {
    const { subject } = req.query;
    const query = subject ? { subject } : {};
    const notes = await Note.find(query);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const { title, content,subject } = req.body;
  const note = new Note({
    title,
    content,
    subject
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/allnotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Note.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: 'Note not found' });
    }

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
