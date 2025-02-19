import React, { useState } from 'react';

function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('Enviando...');

        try {
            const response = await fetch('/.netlify/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    assunto: `Mensagem de ${formData.name}`,
                    mensagem: formData.message
                })
            });

            const data = await response.json();

            if (data.success) {
                setStatus('Email enviado com sucesso!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(`Erro ao enviar email: ${data.error || 'Tente novamente mais tarde.'}`);
            }
        } catch (error) {
            console.error('Erro:', error);
            setStatus('Erro ao enviar email. Por favor, tente novamente mais tarde.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:outline-none"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-mail
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:outline-none"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem
                </label>
                <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 rounded-lg bg-zinc-700 border border-zinc-600 focus:border-yellow-400 focus:outline-none"
                />
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-yellow-400 hover:bg-yellow-500 text-zinc-900 py-2 rounded-lg transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
            {status && (
                <p className={`text-center text-sm ${
                    status.includes('sucesso') ? 'text-green-400' : 'text-red-400'
                }`}>
                    {status}
                </p>
            )}
        </form>
    );
}

export default ContactForm; 