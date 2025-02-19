const nodemailer = require('nodemailer');

exports.handler = async function(event, context) {
  // Habilitar CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Responder a requisições OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { assunto, email, mensagem } = JSON.parse(event.body);

    // Log para debug
    console.log('Dados recebidos:', { assunto, email, mensagem });
    console.log('Variáveis de ambiente:', {
      user: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"Formulário de Contato" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: assunto,
      text: `De: ${email}\n\nMensagem:\n${mensagem}`,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true,
        message: 'Email enviado com sucesso!'
      })
    };
  } catch (error) {
    console.error('Erro detalhado:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
}; 