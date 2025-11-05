import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Smartphone, Laptop, Battery, Zap, Heart, Users, RefreshCw, Shield, BookOpen, ExternalLink, Play, TrendingUp } from 'lucide-react';
import CountUp from './components/CountUp';
import Carousel from './components/Carousel';
import GlobalChart from './components/GlobalChart';
import RecycleChain from './components/RecycleChain';

function Home() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalScroll) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const wasteCarouselItems = [
    {
      id: 1,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Montañas de E-Waste',
      description: 'Millones de dispositivos descartados sin reciclar'
    },
    {
      id: 2,
      image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Componentes Electrónicos',
      description: 'Materiales valiosos que pueden recuperarse'
    },
    {
      id: 3,
      image: 'https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=1920',
      title: 'Reciclaje Responsable',
      description: 'Soluciones sostenibles para el futuro'
    }
  ];

  const impactSlides = [
    {
      id: 'environmental',
      title: 'Contaminación Ambiental',
      icon: '🌍',
      stats: ['Aunque los desechos electrónicos solo representan el 2% de la basura sólida mundial, también pueden significar hasta el 70% de los residuos peligrosos que acaban en vertederos.', 'Contamina agua subterránea', 'Afecta ecosistemas durante décadas'],
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'health',
      title: 'Riesgos para la Salud',
      icon: '⚕️',
      stats: ['Cáncer y daño neurológico', 'Millones de recicladores informales afectados', 'Exposición a sustancias tóxicas'],
      color: 'from-yellow-500 to-red-500'
    },
    {
      id: 'social',
      title: 'Brecha Digital y Desigualdad',
      icon: '💬',
      stats: ['Obsolescencia programada amplía desigualdad', 'Países pobres reciben e-waste de ricos', 'Comunidades excluidas del acceso'],
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const innovations = [
    { name: 'Fairphone', logo: '📱', desc: 'Teléfono ético y reparable' },
    { name: 'iFixit', logo: '🔧', desc: 'Guías de reparación para todos' },
    { name: 'Back Market', logo: '♻️', desc: 'Marketplace de electrónica reciclada' },
    { name: 'Dell Circular', logo: '🔄', desc: 'Diseño circular desde cero' }
  ];

  return (
    <div className="min-h-screen bg-graphite-50 font-inter">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Scroll to Top Button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg transition-all z-40 animate-bounce"
        >
          <ArrowRight size={24} className="rotate-[-90deg]" />
        </button>
      )}

      {/* ========== HERO SECTION ========== */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1537090/pexels-photo-1537090.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite-900/80 via-graphite-800/70 to-graphite-900/80" />

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-emerald-400 rounded-full float-particles"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="mb-6 inline-block">
            <span className="text-emerald-400 font-semibold animate-pulse">Conoce la realidad</span>
          </div>

          <h1 className="font-poppins text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight fade-in">
            Impacto de los Residuos de Tecnología
          </h1>

          <p className="font-lora text-2xl md:text-3xl text-emerald-200 mb-8 italic fade-in" style={{ animationDelay: '0.2s' }}>
            La otra cara del progreso digital
          </p>

          <p className="text-lg text-graphite-200 mb-12 max-w-2xl mx-auto leading-relaxed fade-in" style={{ animationDelay: '0.4s' }}>
            Cada segundo se desechan alrededor de 800 portátiles en todo el mundo.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={() => scrollToSection('definition')}
              className="group px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-poppins font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-500/50"
            >
              Explorar
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/calculator')}
              className="px-8 py-4 bg-graphite-700 hover:bg-graphite-600 text-white font-poppins font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
            >
              Ver Línea de Tiempo
              <TrendingUp size={20} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 fade-in" style={{ animationDelay: '1s' }}>
          <div className="text-emerald-400 animate-bounce">
            <ChevronDown size={32} />
          </div>
        </div>
      </section>

      {/* ========== DEFINITION SECTION ========== */}
      <section id="definition" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-graphite-900 mb-4">¿Qué son los residuos tecnológicos?</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-lg text-graphite-700 leading-relaxed mb-6">
                Los <span className="font-bold text-emerald-600">residuos electrónicos (e-waste)</span> son dispositivos que han llegado al final de su vida útil.
              </p>
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 border-l-4 border-emerald-500 p-8 rounded-lg mb-6">
                <div className="text-4xl font-poppins font-bold text-emerald-600 mb-2">
                  <CountUp end={57} suffix="M" />
                </div>
                <p className="text-graphite-700">toneladas de e-waste generadas anualmente</p>
              </div>
            </div>

            <Carousel items={wasteCarouselItems} autoPlay={true} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Smartphone, label: 'Celulares' },
              { icon: Laptop, label: 'Computadoras' },
              { icon: Battery, label: 'Baterías' },
              { icon: Zap, label: 'Componentes' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-graphite-50 to-graphite-100 p-6 rounded-lg border border-graphite-200 hover:border-emerald-400 hover:shadow-lg transition-all group">
                <item.icon className="w-8 h-8 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-graphite-800">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== IMPACT SECTION ========== */}
      <section id="impact" className="py-24 px-6 bg-graphite-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-white mb-4">Impacto Ambiental y Social</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {impactSlides.map((slide, index) => (
              <div
                key={slide.id}
                onMouseEnter={() => setActiveTab(index)}
                className={`bg-gradient-to-br ${slide.color} p-1 rounded-xl transition-transform hover:scale-105 cursor-pointer`}
              >
                <div className="bg-graphite-900 p-8 rounded-lg h-full">
                  <div className="text-4xl mb-4">{slide.icon}</div>
                  <h3 className="font-poppins text-xl font-bold text-white mb-4">{slide.title}</h3>
                  <ul className="space-y-2">
                    {slide.stats.map((stat, i) => (
                      <li key={i} className="flex gap-2 text-graphite-300">
                        <span className="text-emerald-400">•</span>
                        <span>{stat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== GLOBAL PANORAMA SECTION ========== */}
      <section id="global" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-graphite-900 mb-4">Panorama Global del E-Waste</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto" />
          </div>

          <GlobalChart />
        </div>
      </section>

      {/* ========== RECYCLE CHAIN SECTION ========== */}
      <section id="chain" className="py-24 px-6 bg-graphite-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-graphite-900 mb-4">La Cadena del E-Waste</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto" />
            <p className="text-xl text-graphite-600 max-w-3xl mx-auto mt-6">Del consumo a la contaminación: el ciclo que debemos romper</p>
          </div>

          <RecycleChain />
        </div>
      </section>

      {/* ========== VIDEO SECTION ========== */}
      <section id="video" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-graphite-900 mb-4">Mira la Realidad del E-Waste</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto" />
          </div>

          <div className="bg-graphite-900 rounded-xl overflow-hidden shadow-2xl border border-graphite-700 mb-8">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/mWSwRneTNYo?si=e7hhXPVWYk0DIgPY"
                title="E-Waste Impact Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Impacto Global', desc: 'Entiende la escala mundial' },
              { title: 'Soluciones Prácticas', desc: 'Acciones que puedes tomar hoy' },
              { title: 'Futuro Sostenible', desc: 'Tecnología responsable' }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-lg border border-emerald-200">
                <Play className="w-5 h-5 text-emerald-600 mb-3" />
                <h3 className="font-bold text-graphite-900 mb-2">{item.title}</h3>
                <p className="text-sm text-graphite-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOLUTIONS SECTION ========== */}
      <section id="solutions" className="py-24 px-6 bg-graphite-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-graphite-900 mb-4">Soluciones Sustentables</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: RefreshCw, title: 'Economía Circular', desc: 'Diseño pensado en reutilización', color: 'from-emerald-400 to-emerald-600' },
              { icon: Shield, title: 'Tecnología Verde', desc: 'Innovación con impacto mínimo', color: 'from-blue-400 to-blue-600' },
              { icon: Heart, title: 'Proyectos Sociales', desc: 'Impacto ambiental + social', color: 'from-yellow-400 to-yellow-600' },
              { icon: Users, title: 'Reciclaje Responsable', desc: 'Procesos certificados y seguros', color: 'from-purple-400 to-purple-600' }
            ].map((item, i) => (
              <div key={i} className="group">
                <div className={`bg-gradient-to-br ${item.color} p-1 rounded-xl transition-transform group-hover:scale-105`}>
                  <div className="bg-white p-8 rounded-lg">
                    <item.icon className="w-8 h-8 text-emerald-600 mb-4" />
                    <h3 className="font-bold text-graphite-900 mb-2 text-lg">{item.title}</h3>
                    <p className="text-graphite-700">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARGENTINA SECTION ========== */}
      <section id="argentina" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-poppins text-5xl font-bold text-graphite-900 mb-4">Argentina y América Latina</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto" />
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-emerald-50 border-2 border-emerald-200 p-12 rounded-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-2xl text-graphite-900 mb-6">El Desafío Local</h3>
                <ul className="space-y-4">
                  {[
                    '6,7 kg de e-waste por habitante/año en LATAM, Promedio regional (2019) según UNITAR/ONU.',
                    'Menos del 3 % se recicla formalmente (UNITAR 2022)',
                    'Falta de normativa nacional unificada',
                    'Riesgos sociales y ambientales crecientes'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-graphite-700">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-2xl text-graphite-900 mb-6">Iniciativas Regionales</h3>
                <div className="space-y-4">
                  {[
                    { org: 'CloEE', desc: 'Plataforma regional para impulsar el reciclaje responsable de electrónicos en Latinoamérica.' },
                    { org: 'Fundación Equidad', desc: 'ONG argentina que reacondiciona computadoras y promueve acceso tecnológico sostenible.' },
                    { org: 'ECOTIC', desc: 'Red latinoamericana de recicladores y gestores certificados de residuos electrónicos.' }
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-lg border border-emerald-200">
                      <p className="font-bold text-graphite-900">{item.org}</p>
                      <p className="text-sm text-graphite-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== INNOVATION SECTION ========== */}
      <section id="innovation" className="py-24 px-6 bg-graphite-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-poppins text-5xl font-bold text-white mb-4">Innovación y Futuro</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-blue-400 mx-auto" />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {innovations.map((innovation, i) => (
              <div
                key={i}
                className="bg-graphite-800 border border-graphite-700 p-8 rounded-lg hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/50 transition-all text-center group"
              >
                <div className="text-6xl mb-4 group-hover:scale-125 transition-transform">{innovation.logo}</div>
                <h3 className="font-bold text-white mb-2">{innovation.name}</h3>
                <p className="text-graphite-300 text-sm">{innovation.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-400/50 p-12 rounded-xl text-center">
            <p className="font-lora text-3xl md:text-4xl font-semibold text-white">
              "El futuro depende de cómo tratemos nuestra basura del presente"
            </p>
          </div>
        </div>
      </section>

      {/* ========== CTS REFLECTION ========== */}
      <section id="reflection" className="py-24 px-6 bg-gradient-to-r from-blue-900 via-emerald-900 to-graphite-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-poppins text-5xl font-bold text-white mb-12">Ciencia, Tecnología y Sociedad</h2>

          <p className="font-lora text-3xl md:text-4xl font-semibold text-emerald-200 mb-8">
            "El progreso no se mide en gigabytes, sino en conciencia"
          </p>

          <div className="bg-white/10 backdrop-blur-sm p-12 rounded-xl border border-emerald-400/30">
            <p className="text-lg text-graphite-100 leading-relaxed mb-6">
              El desarrollo tecnológico ha transformado el mundo, pero este progreso viene acompañado de responsabilidades que no podemos evadir.
            </p>
            <p className="text-lg text-graphite-100 leading-relaxed">
              La <span className="text-emerald-300 font-bold">Ciencia</span> nos muestra el impacto ambiental. La <span className="text-blue-300 font-bold">Tecnología</span> nos proporciona soluciones sostenibles. Y la <span className="text-yellow-300 font-bold">Sociedad</span> debe exigir responsabilidad. Juntos podemos diseñar un futuro donde el progreso y la sostenibilidad caminan de la mano.
            </p>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-graphite-900 border-t border-graphite-700 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-8 pb-8 border-b border-graphite-700">
            <div>
              <h4 className="font-bold text-emerald-400 mb-3">Proyecto</h4>
              <p className="text-graphite-400 text-sm">
                Iniciativa educativa sobre el impacto ambiental de la tecnología basada en principios de CTS
              </p>
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 mb-3">Navegación Rápida</h4>
              <ul className="space-y-2 text-graphite-400 text-sm">
                <li><button onClick={() => scrollToSection('hero')} className="hover:text-emerald-400">Inicio</button></li>
                <li><button onClick={() => navigate('/calculator')} className="hover:text-emerald-400">Línea de Tiempo</button></li>
                <li><button onClick={() => scrollToSection('innovation')} className="hover:text-emerald-400">Innovación</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-emerald-400 mb-3">Fuentes</h4>
              <ul className="space-y-2 text-graphite-400 text-sm">
                <li>ONU - Global E-waste Monitor</li>
                <li>Greenpeace Electronics</li>
                <li>IEEE Sustainability</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-graphite-500 text-sm">
            <p>Cada acción cuenta para un futuro más limpio • 2025 • Proyecto CTS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
