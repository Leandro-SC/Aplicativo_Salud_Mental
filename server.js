// server.js
const express = require('express');
const db = require('./config/db'); // Conexión a la base de datos
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blog');
const chatRoutes = require('./routes/chat');
const appointmentRoutes = require('./routes/appointment');
const bookRoutes = require('./routes/book');
const professionalsRouter = require('./routes/professionals');



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rutas
app.use('/blog', blogRoutes);
app.use('/chat', chatRoutes);
app.use('/appointments', appointmentRoutes);
app.use('/books', bookRoutes);
app.use('/professionals', professionalsRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Mental Health App');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
