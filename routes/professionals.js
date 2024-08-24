// routes/professionals.js
const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Ruta para obtener la lista de profesionales
router.get('/list', (req, res) => {
    const sql = 'SELECT p.id, u.name, p.description FROM professionals p JOIN users u ON p.user_id = u.id';
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching professionals:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve professionals' });
        }
        res.json(results);
    });
});

// Ruta para obtener los detalles de un profesional específico
router.get('/details/:id', (req, res) => {
    const professionalId = req.params.id;
    const sql = 'SELECT p.id, u.name, p.description FROM professionals p JOIN users u ON p.user_id = u.id WHERE p.id = ?';
    db.query(sql, [professionalId], (err, results) => {
        if (err) {
            console.error('Error fetching professional details:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve professional details' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ error: 'Professional not found' });
        }
    });
});

router.post('/set-schedule', (req, res) => {
    const { user_id, available_from, available_to, appointment_duration } = req.body;
    const sql = 'INSERT INTO professionals (user_id, available_from, available_to, appointment_duration) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE available_from = ?, available_to = ?, appointment_duration = ?';
    db.query(sql, [user_id, available_from, available_to, appointment_duration, available_from, available_to, appointment_duration], (err, result) => {
        if (err) {
            console.error('Error setting schedule:', err.message);
            return res.status(500).json({ error: 'Failed to set schedule' });
        }
        res.json({ message: 'Schedule updated successfully' });
    });
});

module.exports = router;
