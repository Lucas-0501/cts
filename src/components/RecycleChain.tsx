import { useState, type ReactNode } from 'react';
import { ShoppingCart, Trash2, Truck, Globe, Zap } from 'lucide-react';

interface ChainStep {
  icon: ReactNode;
  title: string;
  description: string;
  detail: string;
}

const steps: ChainStep[] = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: 'Consumo',
    description: 'Compramos nuevos dispositivos constantemente, muchas veces sin necesidad real.',
    detail: 'Compramos dispositivos nuevos sin necesidad real, impulsados por el marketing y la obsolescencia percibida, generando más demanda, producción y futuros residuos electrónicos.'
  },
  {
    icon: <Trash2 className="w-8 h-8" />,
    title: 'Descarte',
    description: 'Mas de 45 millones de toneladas de e-waste no se reciclan adecuadamente cada ano.',
    detail: 'La mayoría de los dispositivos se tira incorrectamente, terminando en basurales donde liberan sustancias tóxicas y se pierde la oportunidad de reciclar materiales valiosos.'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Recoleccion',
    description: 'Segun ONU, solo el 17,4 % se recolecta formalmente para reciclaje.',
    detail: 'Solo una pequeña parte del e-waste llega a sistemas formales de reciclaje, por falta de infraestructura y conciencia, dificultando recuperar materiales y reducir contaminación.'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Exportacion',
    description: 'Paises en desarrollo reciben el e-waste de naciones ricas.',
    detail: 'Gran cantidad de e-waste se envía a países pobres, donde se maneja sin protección, afectando a trabajadores y contaminando comunidades vulnerables.'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Contaminacion',
    description: 'Metales pesados contaminan agua, suelo y afectan comunidades.',
    detail: 'El manejo informal libera metales peligrosos que contaminan aire, agua y suelo, generando graves riesgos para la salud humana y el ambiente.'
  }
];

function RecycleChain() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const isActive = (index: number) => hoveredStep === index;

  return (
    <div className="relative">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-yellow-500 to-red-600" />

      <div className="space-y-12 sm:space-y-14">
        {steps.map((step, index) => (
          <div
            key={step.title}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
            className={`relative transition-all duration-300 sm:text-left ${
              index % 2 === 0 ? 'md:ml-0 md:pl-0 md:pr-0 md:text-right' : 'md:ml-auto'
            }`}
          >
            <div className={`${index % 2 === 0 ? 'mr-auto w-full md:w-5/12' : 'ml-auto w-full md:w-5/12'}`}>
              <div
                className={`group bg-white rounded-lg p-6 border-2 transition-all duration-300 ${
                  isActive(index) ? 'border-emerald-500 shadow-lg shadow-emerald-500/50 scale-105' : 'border-graphite-200 hover:border-graphite-300'
                }`}
                tabIndex={0}
                onFocus={() => setHoveredStep(index)}
                onBlur={() => setHoveredStep(null)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-emerald-500 transition-transform ${isActive(index) ? 'scale-125' : ''}`}>{step.icon}</div>
                  <h3 className="font-poppins font-bold text-graphite-900">{step.title}</h3>
                </div>
                <p className="text-graphite-700 text-sm">{step.description}</p>
                <div
                  className={`overflow-hidden rounded-xl border border-white/10 bg-[rgba(20,20,20,0.35)] backdrop-blur-md text-emerald-50 text-sm leading-relaxed transition-all duration-300 ease-out ${
                    isActive(index) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  style={{
                    maxHeight: isActive(index) ? '200px' : '0px',
                    marginTop: isActive(index) ? '1rem' : '0rem'
                  }}
                >
                  <div className="px-4 py-3">
                    {step.detail}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`absolute left-1/2 -translate-x-1/2 top-6 w-6 h-6 bg-white border-4 transition-all duration-300 ${
                isActive(index) ? 'border-emerald-600 scale-150' : 'border-emerald-500'
              } rounded-full z-10`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecycleChain;
