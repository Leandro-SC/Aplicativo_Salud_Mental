const express = require('express');
const db = require('../config/db');  // Importa la conexión a la base de datos
const router = express.Router();  // Crea un nuevo objeto router

// Ruta para obtener los slots disponibles
router.get('/available-slots', (req, res) => {
    const { professional_id, start, end } = req.query;

    const sql = `
        SELECT DATE_FORMAT(date, '%Y-%m-%dT%H:%i:%s') as start, 
               DATE_FORMAT(ADDTIME(date, SEC_TO_TIME(appointment_duration * 60)), '%Y-%m-%dT%H:%i:%s') as end
        FROM appointments
        WHERE professional_id = ? AND date >= ? AND date <= ? AND status = 'confirmed'
    `;

    db.query(sql, [professional_id, start, end], (err, results) => {
        if (err) {
            console.error('Error fetching slots:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve slots' });
        }
        const events = results.map(slot => ({
            title: 'Ocupado',
            start: slot.start,
            end: slot.end
        }));
        res.json(events);
    });
});


// routes/appointments.js
router.post('/schedule', async (req, res) => {
    const { professional_id, client_id, date, type } = req.body;

    // Inserta la cita
    const sql = 'INSERT INTO appointments (professional_id, client_id, date, type, status) VALUES (?, ?, ?, ?, "pending")';
    db.query(sql, [professional_id, client_id, date, type], async (err, result) => {
        if (err) {
            console.error('Error scheduling appointment:', err.message);
            return res.status(500).json({ error: 'Failed to schedule appointment' });
        }

        if (type === 'virtual') {
            // Genera el enlace de Google Meet
            const meetLink = await createGoogleMeetLink({ date });
            const sqlLink = 'INSERT INTO meet_links (appointment_id, meet_link) VALUES (?, ?)';
            db.query(sqlLink, [result.insertId, meetLink]);
        }

        res.json({ message: 'Appointment scheduled successfully' });
    });
});

module.exports = router;