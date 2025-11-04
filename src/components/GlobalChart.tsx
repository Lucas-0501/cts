import { useState } from 'react';

interface RegionData {
  name: string;
  waste: number;
  percentage: number;
  color: string;
}

const regionData: RegionData[] = [
  { name: 'Asia', waste: 27.9, percentage: 45, color: 'from-red-400 to-red-600' },
  { name: 'Europa', waste: 14.3, percentage: 23, color: 'from-emerald-400 to-emerald-600' },
  { name: 'América', waste: 13.0, percentage: 21, color: 'from-blue-400 to-blue-600' },
  { name: 'África', waste: 7, percentage: 7, color: 'from-yellow-400 to-yellow-600' },
  { name: 'Oceanía', waste: 4, percentage: 4, color: 'from-cyan-400 to-cyan-600' },
];

function GlobalChart() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const maxWaste = Math.max(...regionData.map(r => r.waste));

  return (
    <div className="w-full">
      <div className="space-y-8">
        {regionData.map((region) => (
          <div
            key={region.name}
            onMouseEnter={() => setHoveredRegion(region.name)}
            onMouseLeave={() => setHoveredRegion(null)}
            className="transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex-1">
                <h4 className="font-poppins font-bold text-graphite-900">{region.name}</h4>
              </div>
              <div className={`text-right transition-all duration-300 ${hoveredRegion === region.name ? 'scale-110' : ''}`}>
                <p className="font-poppins font-bold text-emerald-600">{region.waste}M t</p>
                <p className="text-xs text-graphite-500">{region.percentage}% del total</p>
              </div>
            </div>

            <div className="h-12 bg-graphite-100 rounded-lg overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${region.color} transition-all duration-500 flex items-center justify-end pr-4 relative group hover:shadow-lg hover:shadow-emerald-400/50`}
                style={{ width: `${(region.waste / maxWaste) * 100}%` }}
              >
                {hoveredRegion === region.name && (
                  <div className="absolute -top-12 right-0 bg-graphite-900 text-white px-3 py-1 rounded text-xs whitespace-nowrap">
                    {region.waste} millones de toneladas
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
        <p className="font-poppins font-bold text-graphite-900 text-lg text-center">
         Estimaciones basadas en porcentaje regional del <span className="text-emerald-600"><a href="https://unitar.org/about/news-stories/press/global-e-waste-monitor-2024-electronic-waste-rising-five-times-faster-documented-e-waste-recycling">Global E-waste Monitor 2024.</a></span>
        </p>
      </div>
    </div>
  );
}

export default GlobalChart;
