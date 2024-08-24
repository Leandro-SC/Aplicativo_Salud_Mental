// server.js
const express = require('express');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blog');
const chatRoutes = require('./routes/chat');
const appointmentRoutes = require('./routes/appointment');
const bookRoutes = require('./routes/book');
const cors = require('cors');

const app = express();
app.use(express.static('public'));
dotenv.config();

// Habilitar CORS para todas las rutas
app.use(cors());


const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/blog', blogRoutes);
app.use('/chat', chatRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/books', bookRoutes);
app.use('/professionals', require('./routes/professionals'));


app.get('/', (req, res) => {
    res.send('Welcome to the Mental Health App');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

