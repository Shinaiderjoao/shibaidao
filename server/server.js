const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());

app.post('/enviar-email', (req, res) => {
    const { assunto, email, mensagem } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'shinaidervictor17@gmail.com',
            pass: 'qgrt fuly fxeo fusv'
        }
    });

    const mailOptions = {
        from: email,
        to: '',
        subject: assunto,
        text: `De: ${email}\n\n${mensagem}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            res.status(500).json({ success: false, error: error.message });
        } else {
            console.log('E-mail enviado:', info.response);
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 