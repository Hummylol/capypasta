import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import notesRouter from './routes/notes.js'; // Import the notes routes

const app = express();

app.use(cors());
app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://humaid:humaid@notes.gvwblbp.mongodb.net/?retryWrites=true&w=majority&appName=Notes');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

connectDB();

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello' });
});

app.use('/api', notesRouter); 

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
