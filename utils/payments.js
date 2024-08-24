// routes/payments.js
const mercadopago = require('mercadopago');
mercadopago.configure({ access_token: process.env.MP_ACCESS_TOKEN });

router.post('/create-payment', (req, res) => {
    const { appointment_id, amount, email } = req.body;

    const payment_data = {
        transaction_amount: amount,
        description: 'Cita Médica',
        payment_method_id: 'visa', // o el método de pago seleccionado
        payer: { email }
    };

    mercadopago.payment.create(payment_data)
        .then(response => {
            // Almacena la transacción en la base de datos
            const sql = 'INSERT INTO transactions (appointment_id, amount, payment_method, status) VALUES (?, ?, ?, ?)';
            db.query(sql, [appointment_id, amount, payment_data.payment_method_id, response.body.status]);
            res.json(response.body);
        })
        .catch(error => {
            console.error('Error creating payment:', error.message);
            res.status(500).json({ error: 'Payment failed' });
        });
});
