import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  Instagram,
  Mail,
  Clock,
  MapPin,
  Shield,
  PenTool,
  Gauge,
  Award
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import ContactForm from './components/ContactForm';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&auto=format&fit=crop",
    title: "Excelência em Recuperação",
    description: "Tecnologia avançada para resultados precisos"
  },
  {
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1920&auto=format&fit=crop",
    title: "Qualidade Garantida",
    description: "Compromisso com a sua segurança"
  },
  {
    image: "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?q=80&w=1920&auto=format&fit=crop",
    title: "Equipe Especializada",
    description: "Profissionais altamente qualificados"
  }
];

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    });

    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(24, 24, 27, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.fillStyle = 'rgba(250, 204, 21, 0.2)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Mensagem de ${formData.name}`;
    const body = `Nome: ${formData.name}%0D%0AEmail: ${formData.email.value}%0D%0AMensagem: ${formData.message}`;
    const mailtoLink = `mailto:shinaidercarcacas@yahoo.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white relative">
      <ParticlesBackground />

      <header className="fixed w-full bg-zinc-900/80 backdrop-blur-sm z-50">
        <nav className="container mx-auto px-6 py-4">
          <ul className="flex items-center justify-end gap-8">
            <li>
              <a href="#sobre" className="hover:text-yellow-400 transition-colors">
                Sobre
              </a>
            </li>
            <li>
              <a href="#servicos" className="hover:text-yellow-400 transition-colors">
                Serviços
              </a>
            </li>
            <li>
              <a href="#contato" className="hover:text-yellow-400 transition-colors">
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="relative h-screen">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          speed={1000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} bg-yellow-400"></span>`;
            },
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-4 transform translate-y-10 opacity-0 transition-all duration-700 delay-300 slide-in">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl transform translate-y-10 opacity-0 transition-all duration-700 delay-500 slide-in">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Especialistas em <span className="text-yellow-400">Recuperação de Pontas de Eixo</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-8">
            Soluções profissionais e de alta qualidade para manutenção e recuperação de pontas de eixo.
            Garantimos excelência e durabilidade em cada serviço.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://wa.me/5568999989131"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-500 text-zinc-900 px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Phone size={20} />
              Ligar Agora
            </a>
            <a
              href="#contato"
              className="border border-yellow-400 hover:bg-yellow-400/10 text-yellow-400 px-6 py-3 rounded-lg transition-colors"
            >
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-zinc-800/50 p-6 rounded-lg text-center backdrop-blur-sm">
              <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Garantia de Qualidade</h3>
              <p className="text-zinc-400">Serviços com garantia e certificação de qualidade</p>
            </div>
            <div className="bg-zinc-800/50 p-6 rounded-lg text-center backdrop-blur-sm">
              <PenTool className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Equipamentos Modernos</h3>
              <p className="text-zinc-400">Tecnologia de ponta para melhor resultado</p>
            </div>
            <div className="bg-zinc-800/50 p-6 rounded-lg text-center backdrop-blur-sm">
              <Gauge className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Rapidez no Serviço</h3>
              <p className="text-zinc-400">Agilidade sem comprometer a qualidade</p>
            </div>
            <div className="bg-zinc-800/50 p-6 rounded-lg text-center backdrop-blur-sm">
              <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Experiência</h3>
              <p className="text-zinc-400">Anos de experiência no mercado</p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicos" className="relative py-20 px-6 bg-zinc-800/30 backdrop-blur-sm z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-800/50 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Recuperação de Pontas de Eixo</h3>
              <p className="text-zinc-400 mb-4">
                Serviço especializado de recuperação e manutenção de pontas de eixo para veículos
                leves e pesados, garantindo segurança e durabilidade.
              </p>
              <ul className="text-zinc-300 space-y-2">
                <li>• Análise detalhada do componente</li>
                <li>• Recuperação com tecnologia avançada</li>
                <li>• Testes de qualidade</li>
                <li>• Garantia do serviço</li>
              </ul>
            </div>
            <div className="bg-zinc-800/50 rounded-lg p-8 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4">Manutenção Preventiva</h3>
              <p className="text-zinc-400 mb-4">
                Serviços de inspeção e manutenção preventiva para evitar problemas futuros e garantir
                maior vida útil do componente.
              </p>
              <ul className="text-zinc-300 space-y-2">
                <li>• Inspeção completa</li>
                <li>• Diagnóstico preciso</li>
                <li>• Recomendações técnicas</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="relative py-20 px-6 z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Entre em Contato</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="text-yellow-400" size={24} />
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a
                    href="https://wa.me/5568999989131"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-yellow-400 transition-colors"
                  >
                    (68) 99998-9131
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Instagram className="text-yellow-400" size={24} />
                <div>
                  <h3 className="font-semibold">Instagram</h3>
                  <a
                    href="https://instagram.com/carcacas.shinaider"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-yellow-400 transition-colors"
                  >
                    @carcacas.shinaider
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-yellow-400" size={24} />
                <div>
                  <h3 className="font-semibold">E-mail</h3>
                  <p className="text-zinc-400">shinaidercarcacas@yahoo.com.br</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="text-yellow-400" size={24} />
                <div>
                  <h3 className="font-semibold">Horário de Funcionamento</h3>
                  <p className="text-zinc-400">Segunda a Sexta: 8h às 18h</p>
                  <p className="text-zinc-400">Sábado: 8h às 12h</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="text-yellow-400" size={24} />
                <div>
                  <h3 className="font-semibold">Endereço</h3>
                  <p className="text-zinc-400">Av Francisco Ribeiro, 296 - Rio Branco, AC</p>
                </div>
              </div>
            </div>
            <div className="bg-zinc-800/50 p-6 rounded-lg backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-8 px-6 text-center text-zinc-400 border-t border-zinc-800 z-10">
        <p>© 2025 Shinaider Carcaças. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default App;