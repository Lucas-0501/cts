import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronDown, Smartphone, Laptop, Battery, Zap, Heart, Users, RefreshCw, Shield, BookOpen, ExternalLink, Play, TrendingUp } from 'lucide-react';
import CountUp from './components/CountUp';
import Carousel from './components/Carousel';
import GlobalChart from './components/GlobalChart';
import RecycleChain from './components/RecycleChain';

interface DemonTextController {
  stop: () => void;
  setStage: (stage: number) => void;
}

const DEMON_SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEXTAREA', 'OPTION', 'CODE', 'PRE']);
const GLITCH_BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const GLITCH_SYMBOLS = ['Δ', 'Ξ', 'Ж', 'Ѱ', 'ψ', 'Ʃ', 'Ϟ', '☠', '✶', '♆', '⛧', '⚡', '♱', '☾', '☽', '⛓'];
const ZALGO_COMBINERS = [
  '\u0300',
  '\u0301',
  '\u0302',
  '\u0303',
  '\u0304',
  '\u0305',
  '\u0306',
  '\u0307',
  '\u0308',
  '\u0309',
  '\u030A',
  '\u030B',
  '\u030C',
  '\u030D',
  '\u030E',
  '\u030F',
  '\u0310',
  '\u0311',
  '\u0312',
  '\u0313',
  '\u0314',
  '\u0315',
  '\u031B',
  '\u031F',
  '\u0320',
  '\u0323',
  '\u0324',
  '\u0325',
  '\u0326',
  '\u0327',
  '\u0328',
  '\u032C',
  '\u032D',
  '\u032E',
  '\u032F',
  '\u0330',
  '\u0331',
  '\u0334',
  '\u0335',
  '\u0336',
  '\u0337',
  '\u0338',
  '\u0339',
  '\u033A',
  '\u033B',
  '\u033C',
  '\u0346',
  '\u0347',
  '\u0348',
  '\u0349',
  '\u034F',
  '\u0350',
  '\u0351',
  '\u0352',
  '\u0357',
  '\u035B',
  '\u035C',
  '\u035D',
  '\u035E',
  '\u0360',
  '\u0361',
  '\u0362',
  '\u0489'
];
const ZALGO_PREFIXES = ['\u0315', '\u031B', '\u033D', '\u034F', '\u0352', '\u0357', '\u0361', '\u0489'];
const DEMON_TARGET_SELECTORS = ['h1', 'h2', '[data-demon-target="true"]'] as const;
const DEMON_TARGET_SELECTOR = DEMON_TARGET_SELECTORS.join(',');

const randomChoice = <T,>(list: readonly T[]): T => list[Math.floor(Math.random() * list.length)];
const getNow = () => (typeof performance !== 'undefined' ? performance.now() : Date.now());

const createGlitchGlyph = (intensity: number, originalChar: string): string => {
  const normalized = Math.min(1.8, Math.max(0.35, intensity));
  const baseRoll = Math.random();
  let base = originalChar;

  if (baseRoll < 0.3) {
    base = originalChar.toUpperCase();
  } else if (baseRoll < 0.55) {
    base = GLITCH_BASE_CHARS[Math.floor(Math.random() * GLITCH_BASE_CHARS.length)];
  } else if (baseRoll < 0.85) {
    base = randomChoice(GLITCH_SYMBOLS);
  }

  const accentTotal = Math.min(5, 1 + Math.floor(normalized * 2) + Math.floor(Math.random() * 3));
  let result = base;
  for (let i = 0; i < accentTotal; i += 1) {
    result += randomChoice(ZALGO_COMBINERS);
  }

  if (normalized > 1 && Math.random() < 0.4) {
    result = `${randomChoice(ZALGO_PREFIXES)}${result}`;
  }

  return result;
};

const startDemonTextEffect = (initialStage: number): DemonTextController => {
  if (typeof document === 'undefined') {
    return {
      stop: () => {},
      setStage: () => {}
    };
  }

  const body = document.body;
  if (!body) {
    return {
      stop: () => {},
      setStage: () => {}
    };
  }

  const targetElements = Array.from(document.querySelectorAll(DEMON_TARGET_SELECTOR)) as HTMLElement[];

  if (targetElements.length === 0) {
    return {
      stop: () => {},
      setStage: () => {}
    };
  }

  const records: Array<{
    node: Text;
    original: string;
    host: HTMLElement;
    start: number;
    speed: number;
  }> = [];
  const parentInfo = new Map<HTMLElement, { original: string; prevAriaLabel: string | null }>();
  const seenNodes = new Set<Text>();

  targetElements.forEach((target) => {
    if (target.closest('[data-demon-ignore="true"]')) {
      return;
    }

    const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      const textNode = node as Text;

      if (seenNodes.has(textNode)) {
        node = walker.nextNode();
        continue;
      }

      const content = textNode.textContent ?? '';
      if (!content.trim()) {
        node = walker.nextNode();
        continue;
      }

      const parent = textNode.parentElement;
      if (!parent) {
        node = walker.nextNode();
        continue;
      }

      if (DEMON_SKIP_TAGS.has(parent.tagName) || parent.closest('[data-demon-ignore="true"]') || parent.closest('svg')) {
        node = walker.nextNode();
        continue;
      }

      const hostElement = (parent.closest(DEMON_TARGET_SELECTOR) as HTMLElement) ?? target;

      records.push({
        node: textNode,
        original: content,
        host: hostElement,
        start: getNow() + Math.random() * 900,
        speed: 0.85 + Math.random() * 0.6
      });

      if (!parentInfo.has(hostElement)) {
        parentInfo.set(hostElement, {
          original: hostElement.textContent ?? '',
          prevAriaLabel: hostElement.hasAttribute('aria-label') ? hostElement.getAttribute('aria-label') : null
        });
      }

      seenNodes.add(textNode);
      node = walker.nextNode();
    }
  });

  if (records.length === 0) {
    return {
      stop: () => {},
      setStage: () => {}
    };
  }

  parentInfo.forEach((info, host) => {
    host.classList.add('demon-text-active');
    host.setAttribute('data-demon-text', 'active');
    const trimmed = info.original.trim();
    if (!host.hasAttribute('aria-label') && trimmed.length > 0) {
      host.setAttribute('aria-label', trimmed);
    }
  });

  let currentStage = initialStage;
  let rafId = 0;
  let lastFrameTime = 0;
  let chunkIndex = 0;
  const chunkSize = Math.max(6, Math.ceil(records.length / 8));
  const cycleDuration = 3000;

  const tick = (time: number) => {
    if (time - lastFrameTime >= 90) {
      const endIndex = Math.min(records.length, chunkIndex + chunkSize);
      for (let idx = chunkIndex; idx < endIndex; idx += 1) {
        const record = records[idx];

        if (!record.node.isConnected) {
          continue;
        }

        const loopTime = ((time - record.start) * record.speed) / cycleDuration;
        const loopProgress = loopTime - Math.floor(loopTime);
        const revealProgress = Math.pow(loopProgress, 0.62);
        const revealCount = Math.floor(record.original.length * revealProgress);
        const intensityBase = currentStage >= 3 ? 1.2 : currentStage === 2 ? 0.9 : 0.6;
        const glitchIntensity = intensityBase + loopProgress * 0.9;
        let buffer = '';

        for (let charIndex = 0; charIndex < record.original.length; charIndex += 1) {
          const char = record.original[charIndex];

          if (/\s/.test(char)) {
            buffer += char;
            continue;
          }

          if (charIndex < revealCount && loopProgress > 0.18) {
            const flickerChance = loopProgress > 0.6 ? 0.2 + intensityBase * 0.15 : 0.05;
            buffer += Math.random() < flickerChance ? createGlitchGlyph(glitchIntensity, char) : char;
          } else {
            buffer += createGlitchGlyph(glitchIntensity, char);
          }
        }

        record.node.textContent = buffer;
      }

      chunkIndex = endIndex >= records.length ? 0 : endIndex;
      lastFrameTime = time;
    }

    rafId = window.requestAnimationFrame(tick);
  };

  if (records.length > 0) {
    rafId = window.requestAnimationFrame(tick);
  }

  const stop = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }

    records.forEach((record) => {
      if (record.node.isConnected) {
        record.node.textContent = record.original;
      }
    });

    parentInfo.forEach((info, host) => {
      host.classList.remove('demon-text-active');
      host.removeAttribute('data-demon-text');

      if (info.prevAriaLabel === null) {
        host.removeAttribute('aria-label');
      } else {
        host.setAttribute('aria-label', info.prevAriaLabel);
      }
    });
  };

  const setStage = (stage: number) => {
    currentStage = stage;
  };

  return {
    stop,
    setStage
  };
};

function Home() {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [isChaosActive, setIsChaosActive] = useState(false);
  const [chaosStage, setChaosStage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const demonTextControllerRef = useRef<DemonTextController | null>(null);
  const chaosAudioSrc = '/audio/War_meme.mp3';
  const chaosVideoSrc = '/video/chaos-mode-placeholder.mp4';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / totalScroll) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isChaosActive) {
      setChaosStage(0);
      return;
    }

    setChaosStage(1);
    const stageTimers = [
      window.setTimeout(() => setChaosStage(2), 1800),
      window.setTimeout(() => setChaosStage(3), 3600)
    ];

    return () => {
      stageTimers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [isChaosActive]);

  useEffect(() => {
    if (!audioRef.current) {
      const audioElement = new Audio(chaosAudioSrc);
      audioElement.loop = true;
      audioElement.volume = 0.85;
      audioRef.current = audioElement;
    }

    return () => {
      audioRef.current?.pause();
    };
  }, [chaosAudioSrc]);

  useEffect(() => {
    if (!audioRef.current) {
      const audioElement = new Audio(chaosAudioSrc);
      audioElement.loop = true;
      audioElement.volume = 0.85;
      audioRef.current = audioElement;
    }

    const audioElement = audioRef.current;

    if (!audioElement) {
      return;
    }

    if (isChaosActive) {
      audioElement.currentTime = 0;
      audioElement.play().catch(() => {});
    } else {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
  }, [isChaosActive, chaosAudioSrc]);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement) {
      return;
    }

    if (isChaosActive) {
      videoElement.currentTime = 0;
      videoElement.play().catch(() => {});
    } else {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  }, [isChaosActive, chaosVideoSrc]);

  useEffect(() => {
    if (isChaosActive) {
      demonTextControllerRef.current?.stop();
      demonTextControllerRef.current = startDemonTextEffect(chaosStage);
    } else {
      demonTextControllerRef.current?.stop();
      demonTextControllerRef.current = null;
    }

    return () => {
      demonTextControllerRef.current?.stop();
      demonTextControllerRef.current = null;
    };
  }, [isChaosActive]);

  useEffect(() => {
    if (isChaosActive && demonTextControllerRef.current) {
      demonTextControllerRef.current.setStage(chaosStage);
    }
  }, [chaosStage, isChaosActive]);

  useEffect(() => {
    return () => {
      videoRef.current?.pause();
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChaos = () => {
    setIsChaosActive((prev) => !prev);
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
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4i7Q4a9G5f84HIeiiWpWIlWmHslVuq2vm-B_IBmwqrk6Pq5xdMfnegV8f30RxAfmTCJ4kZVRedF_8gWu41NylIiVV0OB5YiYhPK4RkA&s=10',
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

  const videoHighlights = [
    {
      title: 'Impacto Global',
      desc: 'Entiende la escala mundial',
      videoUrl: 'https://www.youtube.com/embed/mWSwRneTNYo?si=e7hhXPVWYk0DIgPY'
    },
    {
      title: 'Soluciones Prácticas',
      desc: 'Acciones que puedes tomar hoy',
      videoUrl: 'https://www.youtube.com/embed/zWhshVOf0Ng?si=d-opgrq20Qg14jnJ'
    },
    {
      title: 'Futuro Sostenible',
      desc: 'Tecnología responsable',
      videoUrl: 'https://www.youtube.com/embed/eiXTdXoWDlc?si=Pol5Nqen4zGmukYh'
    }
  ];

  const chaosClass = isChaosActive ? `chaos-mode chaos-stage-${chaosStage}` : '';

  return (
    <div className={`min-h-screen bg-graphite-50 font-inter ${chaosClass}`}>
      {isChaosActive && (
        <>
          <div className={`chaos-overlay ${chaosStage >= 2 ? 'chaos-overlay--intense' : ''}`} />
          {chaosStage >= 1 && <div className={`chaos-flare chaos-flare--stage-${chaosStage}`} />}
          {chaosStage >= 2 && <div className="chaos-cracks" />}
          {chaosStage >= 3 && (
            <div className="chaos-embers">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={`ember-${index}`}
                  className="chaos-ember"
                  style={{
                    animationDelay: `${index * 0.12}s`,
                    animationDuration: `${3.2 + (index % 4) * 0.4}s`,
                    left: `${(index * 9) % 100}%`
                  }}
                />
              ))}
            </div>
          )}
          <div className="chaos-video-container" data-demon-ignore="true">
            <video
              ref={videoRef}
              key={chaosVideoSrc}
              src={chaosVideoSrc}
              className="chaos-video-player"
              controls
              loop
              muted
              playsInline
              preload="metadata"
            >
              <track kind="captions" />
            </video>
            <div className="chaos-video-hint text-xs text-emerald-100/70">
              Reemplaza <code>chaosVideoSrc</code> con tu archivo para mostrar el video en modo caos.
            </div>
          </div>
        </>
      )}
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

      {/* ========== SPACE WASTE SECTION ========== */}
      <section
        id="space-waste"
        className="space-waste-section relative overflow-hidden py-24 px-6 text-white"
      >
        <div className="space-waste-parallax" aria-hidden="true" />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="space-y-6 text-white">
            <h2 className="font-poppins text-5xl font-bold mb-4">Residuos Tecnológicos Espaciales</h2>
            <p className="text-lg text-emerald-200/95 leading-relaxed">
              Además del e-waste que toca el suelo, la órbita está cargada con restos de satélites, etapas de cohetes y fragmentos
              que viajan a más de <span className="font-semibold text-emerald-300">28&nbsp;000&nbsp;km/h</span>. Cada pieza es una amenaza
              para las misiones futuras y para la infraestructura espacial que sostiene servicios esenciales en la Tierra.
            </p>
            <div className="bg-gradient-to-tr from-emerald-500/25 via-blue-500/10 to-transparent border border-emerald-400/45 rounded-xl p-6 space-y-4">
              <p className="font-poppins text-3xl font-semibold text-white">
                <span className="text-emerald-300">27&nbsp;000+</span> objetos rastreados
              </p>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Según la ESA, solo el <span className="font-semibold">11&nbsp;%</span> de los objetos en órbita continúa operativo.
                El resto es desecho que puede detonar el <span className="font-semibold text-emerald-200">efecto Kessler</span>,
                una cadena de colisiones que bloquearía corredores orbitales completos.
              </p>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4 text-sm text-emerald-100">
              <li className="bg-white/5 border border-emerald-400/30 rounded-lg p-4 leading-relaxed">
                <strong className="block text-emerald-300">Impacto terrestre</strong>
                Fragmentos reingresan a la atmósfera y pueden alcanzar zonas habitadas si no se desintegran por completo.
              </li>
              <li className="bg-white/5 border border-emerald-400/30 rounded-lg p-4 leading-relaxed">
                <strong className="block text-emerald-300">Diseño responsable</strong>
                Nuevos satélites incorporan sistemas de desorbitado y materiales que se queman con seguridad al finalizar su misión.
              </li>
            </ul>
          </div>
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
                src={videoHighlights[selectedVideoIndex].videoUrl}
                title={videoHighlights[selectedVideoIndex].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {videoHighlights.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setSelectedVideoIndex(index)}
                className={`text-left bg-gradient-to-br from-emerald-50 to-blue-50 p-6 rounded-lg border transition-all ${
                  selectedVideoIndex === index
                    ? 'border-emerald-400 shadow-emerald-200/60 shadow-lg ring-2 ring-emerald-300/60'
                    : 'border-emerald-200 hover:border-emerald-400 hover:shadow-lg'
                }`}
              >
                <Play className="w-5 h-5 text-emerald-600 mb-3" />
                <h3 className="font-bold text-graphite-900 mb-2">{item.title}</h3>
                <p className="text-sm text-graphite-700">{item.desc}</p>
              </button>
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
                <li>
                  <a
                    href="https://ewastemonitor.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    ONU - Global E-waste Monitor
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.greenpeace.org/argentina/el-peligro-de-los-residuos-electronicos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    Greenpeace Electronics
                  </a>
                </li>
                <li>
                  <a
                    href="https://spectrum.ieee.org/tag/electronic-waste"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    IEEE Sustainability
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center text-graphite-500 text-sm">
            <p>Cada acción cuenta para un futuro más limpio • 2025 • Proyecto CTS</p>
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={toggleChaos}
              id="no-tocar"
              aria-pressed={isChaosActive}
              className={`rounded-full border border-red-500 bg-red-600 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition-transform duration-300 ${
                isChaosActive ? 'scale-110 animate-pulse' : 'hover:scale-110'
              }`}
            >
              no tocar
            </button>
            <div className="text-[11px] text-graphite-400 italic">
              No toques, al menos que quieras descubrir lo que le pasaria al mundo si no cambiamos nada.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
