import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';

interface YearData {
  year: number;
  waste: number;
  devicesApprox: string;
  description: string;
  context: string;
  image: string;
  highlights: string[];
}

const historicalData: YearData[] = [
  {
    year: 2000,
    waste: 20.5,
    devicesApprox: '~290 M',
    description: 'Los albores de la era digital',
    context: 'Comienza la masificacion de la informatica personal. Monitores CRT, telefonos de tapa y primeros portatiles dominan un mercado sin regulaciones ni estadisticas sobre e-waste.',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '20.5 Mt de residuos (~290 M dispositivos)',
      'Base 0 % frente a 2000',
      'Basura electronica sin regulaciones ni estadisticas',
      'Fuente: Global E-waste Monitor 2020'
    ]
  },
  {
    year: 2001,
    waste: 21.5,
    devicesApprox: '~307 M',
    description: 'Auge post Y2K',
    context: 'Tras el efecto 2000 la industria digital retoma impulso. Internet domestico y las PC fomentan la sustitucion temprana de equipos.',
    image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '21.5 Mt de residuos (~307 M dispositivos)',
      '+5 % respecto a 2000',
      'Internet domestico impulsa nuevas compras',
      'Fuente: ITU - History of ICT Development 2000-2001'
    ]
  },
  {
    year: 2002,
    waste: 22.6,
    devicesApprox: '~324 M',
    description: 'Expansion digital',
    context: 'Las PC se vuelven habituales en hogares y oficinas. Camaras digitales y reproductores MP3 reemplazan dispositivos analogicos sin un reciclaje formal establecido.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '22.6 Mt de residuos (~324 M dispositivos)',
      '+10 % respecto a 2000',
      'PC comunes en hogares y oficinas',
      'Fuente: United Nations University - Historical E-waste Trends 2013'
    ]
  },
  {
    year: 2003,
    waste: 23.7,
    devicesApprox: '~339 M',
    description: 'Convergencia tecnologica',
    context: 'La convergencia de telefono, camara y musica acelera la obsolescencia. Crece el volumen de desechos informales en Asia.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '23.7 Mt de residuos (~339 M dispositivos)',
      '+16 % respecto a 2000',
      'Telefonia, camara y musica convergen',
      'Fuente: OECD - Digital Economy Outlook 2004'
    ]
  },
  {
    year: 2004,
    waste: 24.9,
    devicesApprox: '~356 M',
    description: 'Explosion de gadgets',
    context: 'Las redes Wi-Fi y los reproductores portatiles se masifican. La directiva WEEE entra en vigor para regular los residuos electronicos en Europa.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '24.9 Mt de residuos (~356 M dispositivos)',
      '+21 % respecto a 2000',
      'Directiva WEEE regula residuos electronicos',
      'Fuente: European Commission - Directive 2002/96/EC'
    ]
  },
  {
    year: 2005,
    waste: 26.1,
    devicesApprox: '~373 M',
    description: 'Boom tecnologico',
    context: 'Las ventas de camaras y reproductores MP3 alcanzan records. Empresas reemplazan hardware analogico sin sistemas de reciclaje adecuados.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '26.1 Mt de residuos (~373 M dispositivos)',
      '+27 % respecto a 2000',
      'Boom de camaras y reproductores MP3',
      'Fuente: UNEP - E-waste Volume 1 (2005)'
    ]
  },
  {
    year: 2006,
    waste: 27.3,
    devicesApprox: '~391 M',
    description: 'Revolucion de pantallas planas',
    context: 'El paso masivo de CRT a LCD y plasma genera millones de televisores desechados. Surge el debate sobre responsabilidad extendida del productor.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '27.3 Mt de residuos (~391 M dispositivos)',
      '+33 % respecto a 2000',
      'Cambio masivo de CRT a LCD y plasma',
      'Fuente: UNEP - E-waste Africa Project Baseline 2007'
    ]
  },
  {
    year: 2007,
    waste: 28.5,
    devicesApprox: '~408 M',
    description: 'Nacimiento del smartphone',
    context: 'El lanzamiento del iPhone marca el nacimiento del smartphone moderno. Los ciclos de vida se acortan y la chatarra electronica se multiplica.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '28.5 Mt de residuos (~408 M dispositivos)',
      '+39 % respecto a 2000',
      'Nacimiento de la era smartphone',
      'Fuente: Apple Keynote 2007 y UN E-waste Data 2010'
    ]
  },
  {
    year: 2008,
    waste: 30.0,
    devicesApprox: '~429 M',
    description: 'Crisis y resiliencia tecnologica',
    context: 'La crisis financiera global no detiene el consumo digital. Paises desarrollados exportan e-waste a Asia y Africa con fuertes impactos sanitarios.',
    image: 'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '30.0 Mt de residuos (~429 M dispositivos)',
      '+46 % respecto a 2000',
      'Exportacion de e-waste hacia Asia y Africa',
      'Fuente: BAN - Exporting Harm 2008'
    ]
  },
  {
    year: 2009,
    waste: 31.5,
    devicesApprox: '~451 M',
    description: 'Era 3G',
    context: 'La adopcion de redes 3G y nuevos smartphones aumenta el volumen de baterias y placas descartadas en todo el mundo.',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '31.5 Mt de residuos (~451 M dispositivos)',
      '+54 % respecto a 2000',
      'Redes 3G disparan ciclos de reemplazo',
      'Fuente: ITU - Mobile Broadband Growth Stats 2009'
    ]
  },
  {
    year: 2010,
    waste: 33.8,
    devicesApprox: '~484 M',
    description: 'Inicio de la decada digital',
    context: 'Primer ano con medicion global oficial de e-waste. Se reconoce el problema como prioridad ambiental y se amplian las iniciativas multilaterales.',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '33.8 Mt de residuos (~484 M dispositivos)',
      '+65 % respecto a 2000',
      'Primer inventario global oficial de e-waste',
      'Fuente: Global E-waste Monitor 2020'
    ]
  },
  {
    year: 2011,
    waste: 35.5,
    devicesApprox: '~508 M',
    description: 'Movilidad global',
    context: 'La movilidad y la computacion en la nube se consolidan. Empresas y usuarios reemplazan equipos funcionales por modelos mas nuevos.',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '35.5 Mt de residuos (~508 M dispositivos)',
      '+73 % respecto a 2000',
      'Movilidad y nube reemplazan equipos funcionales',
      'Fuente: OECD - Digital Economy 2011'
    ]
  },
  {
    year: 2012,
    waste: 37.0,
    devicesApprox: '~529 M',
    description: 'Internet de las Cosas incipiente',
    context: 'Surgen los primeros hogares inteligentes. El aumento de dispositivos conectados complica el reciclaje y la trazabilidad de componentes.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '37.0 Mt de residuos (~529 M dispositivos)',
      '+80 % respecto a 2000',
      'Primeras soluciones de hogar inteligente',
      'Fuente: UNU - E-waste Statistics Partnership 2012'
    ]
  },
  {
    year: 2013,
    waste: 40.2,
    devicesApprox: '~575 M',
    description: 'Obsolescencia acelerada',
    context: 'Las actualizaciones anuales de smartphones aceleran la obsolescencia y motivan campanas de concientizacion ambiental.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '40.2 Mt de residuos (~575 M dispositivos)',
      '+96 % respecto a 2000',
      'Actualizaciones anuales aceleran la obsolescencia',
      'Fuente: Right to Repair Europe - Origins 2013'
    ]
  },
  {
    year: 2014,
    waste: 44.4,
    devicesApprox: '~635 M',
    description: 'Consumo desbordado',
    context: 'El volumen global de e-waste supera las 40 Mt mientras el reciclaje formal permanece por debajo del 15 %.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '44.4 Mt de residuos (~635 M dispositivos)',
      '+117 % respecto a 2000',
      'Reciclaje formal global por debajo del 15 %',
      'Fuente: Global E-waste Monitor 2020'
    ]
  },
  {
    year: 2015,
    waste: 46.0,
    devicesApprox: '~659 M',
    description: 'Pico de ventas electronicas',
    context: 'Los dispositivos portatiles dominan el mercado y se instala el debate sobre economia circular aplicada a la tecnologia.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '46.0 Mt de residuos (~659 M dispositivos)',
      '+124 % respecto a 2000',
      'Economia circular entra al debate tecnologico',
      'Fuente: Ellen MacArthur Foundation - Circular Economy 2015'
    ]
  },
  {
    year: 2016,
    waste: 47.6,
    devicesApprox: '~681 M',
    description: 'Preocupacion ambiental global',
    context: 'El Acuerdo de Paris expone la necesidad de reducir residuos y emisiones derivados de la produccion tecnologica.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '47.6 Mt de residuos (~681 M dispositivos)',
      '+132 % respecto a 2000',
      'Acuerdo de Paris integra objetivos de residuos',
      'Fuente: UNFCCC - Paris Agreement 2016'
    ]
  },
  {
    year: 2017,
    waste: 49.1,
    devicesApprox: '~703 M',
    description: 'IoT en expansion',
    context: 'La expansion del IoT y de asistentes domesticos de IA incrementa el consumo energetico y la generacion de chatarra digital.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '49.1 Mt de residuos (~703 M dispositivos)',
      '+140 % respecto a 2000',
      'IoT y asistentes de IA aumentan consumo',
      'Fuente: ITU - Measuring the Information Society 2017'
    ]
  },
  {
    year: 2018,
    waste: 51.2,
    devicesApprox: '~732 M',
    description: 'Conciencia social emergente',
    context: 'ONG y documentales visibilizan el problema del e-waste mientras el movimiento Right to Repair gana fuerza global.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '51.2 Mt de residuos (~732 M dispositivos)',
      '+150 % respecto a 2000',
      'ONG y documentales visibilizan el problema',
      'Fuente: Greenpeace - Guide to Greener Electronics 2018'
    ]
  },
  {
    year: 2019,
    waste: 53.6,
    devicesApprox: '~767 M',
    description: 'Ano record de e-waste',
    context: 'Los datos ONU muestran que solo el 17.4 % del e-waste se recicla formalmente y la brecha gestion-generacion sigue creciendo.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '53.6 Mt de residuos (~767 M dispositivos)',
      '+161 % respecto a 2000',
      'Solo 17.4 % se recicla formalmente',
      'Fuente: Global E-waste Monitor 2020'
    ]
  },
  {
    year: 2020,
    waste: 55.9,
    devicesApprox: '~799 M',
    description: 'Pandemia y teletrabajo',
    context: 'La pandemia y el teletrabajo disparan la demanda de tecnologia domestica, multiplicando la renovacion de equipos.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '55.9 Mt de residuos (~799 M dispositivos)',
      '+173 % respecto a 2000',
      'Teletrabajo multiplica la demanda de tecnologia',
      'Fuente: WEF - COVID-19 and E-waste 2020'
    ]
  },
  {
    year: 2021,
    waste: 58.4,
    devicesApprox: '~836 M',
    description: 'Escasez de chips',
    context: 'La escasez de semiconductores ralentiza la produccion nueva pero no reduce el volumen de residuos acumulados.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '58.4 Mt de residuos (~836 M dispositivos)',
      '+185 % respecto a 2000',
      'Escasez de chips no frena el descarte',
      'Fuente: OECD - Semiconductor Shortage 2021'
    ]
  },
  {
    year: 2022,
    waste: 62.0,
    devicesApprox: '~887 M',
    description: 'Punto critico global',
    context: 'Dato ONU oficial indica que solo el 22.3 % del e-waste se recicla y se proyectan 82 Mt para 2030 si no cambian las tendencias.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '62.0 Mt de residuos (~887 M dispositivos)',
      '+202 % respecto a 2000',
      'Proyeccion de 82 Mt para 2030',
      'Fuente: Global E-waste Monitor 2024'
    ]
  },
  {
    year: 2023,
    waste: 64.6,
    devicesApprox: '~924 M',
    description: 'IA y energia digital',
    context: 'El auge de la inteligencia artificial aumenta la demanda de GPUs y centros de datos, elevando consumo energetico y residuos de hardware.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '64.6 Mt de residuos (~924 M dispositivos)',
      '+215 % respecto a 2000',
      'IA eleva demanda de GPUs y centros de datos',
      'Fuente: IEA - Data Centres and AI Energy 2023'
    ]
  },
  {
    year: 2024,
    waste: 66.2,
    devicesApprox: '~956 M',
    description: 'El momento de actuar',
    context: 'La Union Europea implementa leyes de reparabilidad y reciclaje obligatorio, impulsando diseno modular y reuso corporativo.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '66.2 Mt de residuos (~956 M dispositivos)',
      '+226 % respecto a 2000',
      'Leyes europeas impulsan reparabilidad y reciclaje',
      'Fuente: European Commission - Right to Repair Directive 2024'
    ]
  },
  {
    year: 2025,
    waste: 69.5,
    devicesApprox: '~995 M',
    description: 'Futuro inmediato',
    context: 'Las proyecciones ONU muestran que las nuevas regulaciones frenan el crecimiento, aunque la recuperacion de metales criticos sigue por debajo del 25 %.',
    image: 'https://images.pexels.com/photos/373543/computer-chip-electronics-technology-373543.jpeg?auto=compress&cs=tinysrgb&w=1920',
    highlights: [
      '69.5 Mt de residuos (~995 M dispositivos)',
      '+239 % respecto a 2000',
      'Casi 1 Mt nueva se agrega cada ano',
      'Fuente: Global E-waste Monitor 2024 - Projections to 2030'
    ]
  }
];

const maxWaste = Math.max(...historicalData.map((data) => data.waste));
const minWaste = Math.min(...historicalData.map((data) => data.waste));
const wasteRange = maxWaste - minWaste;

const getBarHeight = (waste: number) => {
  if (wasteRange === 0) {
    return '100%';
  }

  const ratio = (waste - minWaste) / wasteRange;
  const minPercent = 20;
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const height = minPercent + clampedRatio * (100 - minPercent);

  return `${height}%`;
};


function Calculator() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentData = historicalData.find(d => d.year === selectedYear) || historicalData[historicalData.length - 1];
  const progress = ((selectedYear - 2000) / (2025 - 2000)) * 100;

  const handleYearChange = (year: number) => {
    setIsAnimating(true);
    setSelectedYear(year);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const getWasteColor = (waste: number) => {
    if (waste < 30) return 'text-yellow-500';
    if (waste < 45) return 'text-orange-500';
    if (waste < 55) return 'text-red-500';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-graphite-50 via-white to-graphite-100 font-inter">
      {/* Header */}
      <header className="bg-white border-b border-graphite-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            Volver
          </button>
          <h1 className="font-poppins text-2xl md:text-3xl font-bold text-graphite-900">
            Línea de Tiempo del E-Waste
          </h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Year Selector */}
        <div className="bg-white rounded-xl border border-graphite-200 p-8 mb-12 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-poppins text-xl font-bold text-graphite-900">Selecciona un año:</h2>
            <div className="flex items-center gap-3">
              <Calendar className="text-emerald-500" size={24} />
              <span className="font-poppins text-4xl font-bold text-emerald-600">{selectedYear}</span>
            </div>
          </div>

          <div className="relative mb-6">
            <input
              type="range"
              min="2000"
              max="2025"
              value={selectedYear}
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="w-full h-2 bg-graphite-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between mt-3 text-xs text-graphite-500 font-semibold">
              <span>2000</span>
              <span>2005</span>
              <span>2010</span>
              <span>2015</span>
              <span>2020</span>
              <span>2025</span>
            </div>
          </div>
        </div>

        {/* Data Display */}
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          {/* Stats Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-xl p-8 border border-graphite-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-graphite-600 font-semibold mb-2">Residuos Globales</p>
              <p className={`font-poppins text-4xl font-bold ${getWasteColor(currentData.waste)} mb-2`}>
                {currentData.waste}
              </p>
              <p className="text-graphite-500 text-sm">millones de toneladas</p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-graphite-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-graphite-600 font-semibold mb-2">Equivalente a</p>
              <p className="font-poppins text-4xl font-bold text-emerald-600 mb-2">
                {currentData.devicesApprox}
              </p>
              <p className="text-graphite-500 text-sm">dispositivos aprox.</p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-graphite-200 shadow-sm hover:shadow-md transition-shadow">
              <p className="text-graphite-600 font-semibold mb-2">Crecimiento vs 2000</p>
              <p className="font-poppins text-4xl font-bold text-emerald-500 mb-2">
                +{((currentData.waste - 20.5) / 20.5 * 100).toFixed(0)}%
              </p>
              <p className="text-graphite-500 text-sm">incremento acumulado</p>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Image */}
            <div className="relative h-96 rounded-xl overflow-hidden group shadow-lg">
              <img
                src={currentData.image}
                alt={`E-waste ${currentData.year}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-graphite-900/80 via-graphite-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="font-poppins text-2xl font-bold mb-2">{currentData.description}</p>
                <p className="font-semibold text-emerald-300">{currentData.year}</p>
              </div>
            </div>

            {/* Context */}
            <div className="bg-white rounded-xl p-8 border border-graphite-200 shadow-sm flex flex-col justify-center">
              <h3 className="font-poppins text-xl font-bold text-graphite-900 mb-4">Contexto Histórico</h3>
              <p className="text-graphite-700 leading-relaxed text-lg">
                {currentData.context}
              </p>
            </div>
          </div>

          {/* Highlights */}
          <div className="bg-white rounded-xl p-8 border border-graphite-200 shadow-sm">
            <h3 className="font-poppins text-xl font-bold text-graphite-900 mb-6 flex items-center gap-2">
              <TrendingUp className="text-emerald-500" size={24} />
              Puntos Destacados de {currentData.year}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {currentData.highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg border border-emerald-100 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-graphite-700">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="mt-12 bg-white rounded-xl p-8 border border-graphite-200 shadow-sm">
            <h3 className="font-poppins text-xl font-bold text-graphite-900 mb-6">Evolución del E-Waste (2000-2025)</h3>
            <div className="relative h-64 flex items-end justify-between gap-1">
              {historicalData.map((data) => (
                <div key={data.year} className="flex-1 flex flex-col items-center group">
                  <div className="relative h-48 w-full flex items-end justify-center">
                    <span
                      className={`absolute -top-6 text-xs font-semibold px-2 py-1 rounded-full transition-all ${
                        selectedYear === data.year
                          ? 'bg-emerald-500 text-white shadow-md ring-2 ring-emerald-300'
                          : 'bg-white text-graphite-700 border border-emerald-100 group-hover:bg-emerald-50'
                      }`}
                    >
                      {data.waste}
                    </span>
                    <div
                      className={`absolute bottom-0 w-2.5 sm:w-3 md:w-4 rounded-t-lg transition-all duration-300 cursor-pointer ${
                        selectedYear === data.year
                          ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-lg'
                          : 'bg-gradient-to-t from-emerald-200 via-emerald-100 to-emerald-50 group-hover:from-emerald-300 group-hover:via-emerald-200'
                      }`}
                      style={{ height: getBarHeight(data.waste) }}
                      onClick={() => handleYearChange(data.year)}
                    />
                  </div>
                  <p className={`text-xs font-semibold mt-6 transition-colors ${selectedYear === data.year ? 'text-emerald-600' : 'text-graphite-500'}`}>
                    {data.year % 5 === 0 ? data.year : ''}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Message */}
          <div className="mt-12 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-xl p-10 border border-emerald-200 text-center">
            <p className="font-lora text-2xl md:text-3xl font-semibold text-graphite-900">
              "El futuro depende de lo que hagamos hoy"
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-graphite-900 border-t border-graphite-700 py-8 px-6 mt-16">
        <div className="max-w-7xl mx-auto text-center text-graphite-400 font-inter text-sm">
          <p>Cada acción cuenta para un futuro más limpio • 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default Calculator;
