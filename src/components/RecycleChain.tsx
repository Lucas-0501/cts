import { useState } from 'react';
import { ShoppingCart, Trash2, Truck, Globe, Zap } from 'lucide-react';

interface ChainStep {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: ChainStep[] = [
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: 'Consumo',
    description: 'Compramos nuevos dispositivos constantemente, muchas veces innecesariamente'
  },
  {
    icon: <Trash2 className="w-8 h-8" />,
    title: 'Descarte',
    description: 'Más de 45 millones de toneladas de e-waste no se reciclan adecuadamente cada año.'
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Recolección',
    description: 'Según ONU, solo el 17,4 % se recolecta formalmente para reciclaje'
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Exportación',
    description: 'Países en desarrollo reciben el e-waste de naciones ricas'
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: 'Contaminación',
    description: 'Metales pesados contaminan agua, suelo y afectan comunidades'
  }
];

function RecycleChain() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-yellow-500 to-red-600" />

      {/* Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredStep(index)}
            onMouseLeave={() => setHoveredStep(null)}
            className={`relative transition-all duration-300 ${
              index % 2 === 0 ? 'ml-0 pl-0 pr-0 text-right' : 'ml-auto'
            }`}
          >
            <div className={`${index % 2 === 0 ? 'mr-auto w-5/12' : 'ml-auto w-5/12'}`}>
              <div
                className={`bg-white rounded-lg p-6 border-2 transition-all duration-300 ${
                  hoveredStep === index
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/50 scale-105'
                    : 'border-graphite-200 hover:border-graphite-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`text-emerald-500 transition-transform ${hoveredStep === index ? 'scale-125' : ''}`}>
                    {step.icon}
                  </div>
                  <h3 className="font-poppins font-bold text-graphite-900">{step.title}</h3>
                </div>
                <p className="text-graphite-700 text-sm">{step.description}</p>
              </div>
            </div>

            {/* Center Circle */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-6 w-6 h-6 bg-white border-4 transition-all duration-300 ${
                hoveredStep === index ? 'border-emerald-600 scale-150' : 'border-emerald-500'
              } rounded-full z-10`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecycleChain;
