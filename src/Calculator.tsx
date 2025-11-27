import { useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react';
import Navbar from './components/Navbar';

interface YearData {
  year: number;
  waste: number;
  devicesApprox: string;
  description: string;
  context: string;
  image: string;
  highlights: string[];
}

const SOURCE_LINKS: Record<string, string> = {
  'Global E-waste Monitor 2020': 'https://ewastemonitor.info/',
  'Global E-waste Monitor 2024': 'https://ewastemonitor.info/global-e-waste-monitor-2024/',
  'Global E-waste Monitor 2024 - Projections to 2030': 'https://ewastemonitor.info/global-e-waste-monitor-2024/',
  'ITU - History of ICT Development 2000-2001': 'https://www.itu.int/en/history/Pages/default.aspx',
  'ITU - Mobile Broadband Growth Stats 2009': 'https://www.itu.int/en/ITU-D/Statistics/Pages/default.aspx',
  'ITU - Measuring the Information Society 2017': 'https://www.itu.int/en/ITU-D/Statistics/Pages/publications/mis/MIS2017.aspx',
  'United Nations University - Historical E-waste Trends 2013': 'https://unu.edu/publications/articles/historical-e-waste-trends.html',
  'UNU - E-waste Statistics Partnership 2012': 'https://unu.edu/projects/global-e-waste-statistics-partnership.html',
  'OECD - Digital Economy Outlook 2004': 'https://www.oecd.org/digital/ieconomy/33988045.pdf',
  'OECD - Digital Economy 2011': 'https://www.oecd.org/digital/digital-economy-outlook.htm',
  'OECD - Semiconductor Shortage 2021': 'https://www.oecd.org/coronavirus/policy-responses/chip-shortage-highlights-need-for-resilient-and-sustainable-supply-chains-3b466f3d/',
  'European Commission - Directive 2002/96/EC': 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX%3A32002L0096',
  'European Commission - Right to Repair Directive 2024': 'https://single-market-economy.ec.europa.eu/sectors/retail/right-repair_en',
  'UNEP - E-waste Volume 1 (2005)': 'https://wedocs.unep.org/handle/20.500.11822/8709',
  'UNEP - E-waste Africa Project Baseline 2007': 'https://www.unep.org/resources/report/baseline-survey-e-waste-management-africa',
  'BAN - Exporting Harm 2008': 'https://www.ban.org/library/exporting-harm-the-high-tech-trashing-of-asia',
  'Apple Keynote 2007': 'https://www.apple.com/newsroom/archive/2007/',
  'UN E-waste Data 2010': 'https://www.un.org/en/',
  'Apple Keynote 2007 y UN E-waste Data 2010': 'https://www.apple.com/newsroom/archive/2007/',
  'Right to Repair Europe - Origins 2013': 'https://repair.eu/about/',
  'Ellen MacArthur Foundation - Circular Economy 2015': 'https://ellenmacarthurfoundation.org/circular-economy-concept',
  'UNFCCC - Paris Agreement 2016': 'https://unfccc.int/process-and-meetings/the-paris-agreement/the-paris-agreement',
  'Greenpeace - Guide to Greener Electronics 2018': 'https://www.greenpeace.org/international/publication/16436/guide-to-greener-electronics-2017/',
  'WEF - COVID-19 and E-waste 2020': 'https://www.weforum.org/agenda/2020/05/covid-19-pandemic-e-waste/',
  'IEA - Data Centres and AI Energy 2023': 'https://www.iea.org/reports/data-centres-and-data-transmission-networks'
};

const formatHighlight = (highlight: string): ReactNode => {
  if (!highlight.startsWith('Fuente: ')) {
    return highlight;
  }

  const sourceText = highlight.replace('Fuente: ', '').trim();
  const parts = sourceText.includes(' y ') ? sourceText.split(/\s+y\s+/i) : [sourceText];

  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    const trimmed = part.trim();
    const url = SOURCE_LINKS[trimmed] ?? SOURCE_LINKS[sourceText] ?? null;

    if (index > 0) {
      nodes.push(' y ');
    }

    if (url) {
      nodes.push(
        <a
          key={`${trimmed}-${index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 hover:text-emerald-500 underline decoration-dotted"
        >
          {trimmed}
        </a>
      );
    } else {
      nodes.push(trimmed);
    }
  });

  return (
    <>
      Fuente: {nodes}
    </>
  );
};

const historicalData: YearData[] = [
  {
    year: 2000,
    waste: 20.5,
    devicesApprox: '~290 M',
    description: 'Los albores de la era digital',
    context: 'Comienza la masificacion de la informatica personal. Monitores CRT, telefonos de tapa y primeros portatiles dominan un mercado sin regulaciones ni estadisticas sobre e-waste.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSClRKV2qP7xCiYKG5MaoQ57rveunlD7i9vA&s',
    highlights: [
      '20.5 Mt de residuos (~290 M dispositivos)',
      'Base 0 % frente a 2000',
      'Basura electrónica sin regulaciones ni estadisticas',
      'Fuente: Global E-waste Monitor 2020'
    ]
  },
  {
    year: 2001,
    waste: 21.5,
    devicesApprox: '~307 M',
    description: 'Auge post Y2K',
    context: 'Tras el efecto 2000 la industria digital retoma impulso. Internet domestico y las PC fomentan la sustitucion temprana de equipos.',
    image: 'https://m.media-amazon.com/images/S/pv-target-images/eb010b02aee28f629369d84dd800fe190dbfeb0b9402c8ff1c72641d4736aa74._SX1080_FMjpg_.jpg',
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
    image: 'https://weppa.cloud/wp-content/uploads/2021/01/MapaMundi-Server-01.jpg',
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
    image: 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2019/11/hipertextual-microsoft-contra-eric-lundgren-rey-reciclaje-electronico-2019416472.jpg?fit=1920%2C1440&quality=70&strip=all&ssl=1',
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
    context: 'Las redes Wi-Fi y los reproductores portatiles se masifican. La directiva WEEE entra en vigor para regular los residuos electrónicos en Europa.',
    image: 'https://neubox.com/blog/wp-content/uploads/2024/02/860x436-NOSTALGIA-2.webp',
    highlights: [
      '24.9 Mt de residuos (~356 M dispositivos)',
      '+21 % respecto a 2000',
      'Directiva WEEE regula residuos electrónicos',
      'Fuente: European Commission - Directive 2002/96/EC'
    ]
  },
  {
    year: 2005,
    waste: 26.1,
    devicesApprox: '~373 M',
    description: 'Boom tecnológico',
    context: 'Las ventas de camaras y reproductores MP3 alcanzan records. Empresas reemplazan hardware analogico sin sistemas de reciclaje adecuados.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ08_9siR1eUwobj_60fHp3CDKS2cFaH9m1A&s',
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
    image: 'https://i0.wp.com/circuitcellar.com/wp-content/uploads/2023/07/390-Rahman-lead-scaled.jpg?fit=2560%2C1280&ssl=1',
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
    context: 'El lanzamiento del iPhone marca el nacimiento del smartphone moderno. Los ciclos de vida se acortan y la chatarra electrónica se multiplica.',
    image: 'https://www.greenpeace.org/static/planet4-argentina-stateless/2019/03/24ce7b84-smart_cuerpo.jpg',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn_C1t9T575EiXCJl2j6v_iug8tk6vZCS8bg&s',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp5ILQAm7BKndwzlaAqKUwp6Gt3Yb-BF2qXazF7ygXR6n-eziU1SMpBweuzAy9hR026Wk&usqp=CAU',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZfKB3LchP7_gbGyE8GGBoWdF1n4aUUvup6g&s',
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
    image: 'https://tynmagazine.com/wp-content/uploads/sites/3/2017/11/IoT-e1555434619145.jpg',
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
    image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg48rh_6igK_tq1nhyphenhyphenYoG6FJf4V7U7LQSkcWlZxhlQt7RKod0NMxJbThRDH0hS-KedyZsZXiS3NxV-HY-nR5jGEeneefCy0U9v8i8SJOt2S1waBN5wkcYrUUvr_1c0YXiarGIRrl8TF6w/s2048/ewaste.jpeg',
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
    image: 'https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/noticias/onu-la-basura-electronica-aumenta-cinco-veces-mas-rapido-que-su-reciclaje/11845921-1-esl-MX/ONU-la-basura-electronica-aumenta-cinco-veces-mas-rapido-que-su-reciclaje.jpg',
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
    description: 'Pico de ventas electrónicas',
    context: 'Los dispositivos portatiles dominan el mercado y se instala el debate sobre economia circular aplicada a la tecnologia.',
    image: 'https://www.verifiedmarketreports.com/images/blogs/11-23/Top%207%20Trends%20In%20E-commerce%20of%20Consumer%20Electronics%20Products.png',
    highlights: [
      '46.0 Mt de residuos (~659 M dispositivos)',
      '+124 % respecto a 2000',
      'Economia circular entra al debate tecnológico',
      'Fuente: Ellen MacArthur Foundation - Circular Economy 2015'
    ]
  },
  {
    year: 2016,
    waste: 47.6,
    devicesApprox: '~681 M',
    description: 'Preocupacion ambiental global',
    context: 'El Acuerdo de Paris expone la necesidad de reducir residuos y emisiones derivados de la produccion tecnologica.',
    image: 'https://storage.googleapis.com/msgsndr/Ww6k6uHghan61OfsMdfi/media/67d7b7a51b97ac8cb2021b71.webp',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjhDje0gFuOzvg_SNlfQLITmn5Ay1vuO3HoRsMAnGLmjJ9mXNvaZwOoqMjyTmTIoRKJk8&usqp=CAU',
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
    image: 'https://charterhousemuller.com/wp-content/uploads/2024/03/CHM_Blog_e-waste.png',
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
    image: 'https://www.goodthingsguy.com/wp-content/uploads/2023/07/ewastefeatured.jpg',
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
    image: 'https://images.newscientist.com/wp-content/uploads/2021/06/09100741/09-june_un-ewaste.jpg?crop=4:3,smart&width=1200&height=900&upscale=true',
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
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ztZrUTeuZoMlbGBdPSOzhgjtu8CmkfQYyw&s',
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
    image: 'https://scontent.faep14-2.fna.fbcdn.net/v/t51.75761-15/463189323_18025906220433175_7659885340030047894_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_ohc=t0QjXRqYETEQ7kNvwEmycvB&_nc_oc=AdmGw86BImo_rxaVBzn4HSdpViwR2iAlyS8zs-F31YyfJPfkP-bU0jQrlQUJeQGhp0E&_nc_zt=23&_nc_ht=scontent.faep14-2.fna&_nc_gid=azZyKWXA4rYjNVusnioP9A&oh=00_AfgNRqDvEzC7Hv1HXRg_sAMQL_HEgKUk6gsrLXPIM_MZUw&oe=69106599',
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
    image: 'https://miro.medium.com/0*gD8fhMG5C2Xl98sY',
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
    context: 'La Union Europea implementa leyes de reparabilidad y reciclaje obligatorio, impulsando Diseño modular y reuso corporativo.',
    image: 'https://compucycle.com/wp-content/uploads/2021/12/categories-of-e-waste-recycling.jpg',
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
    image: 'https://blog.emb.global/wp-content/uploads/2024/01/20-Emerging-Technologies-That-Will-Change-Our-World.webp',
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
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            onClick={() => navigate('/#hero')}
            className="flex items-center gap-2 self-start rounded-full border border-emerald-100 px-4 py-2 text-emerald-700 transition-colors duration-200 hover:border-emerald-300 hover:text-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            <ArrowLeft size={18} />
            Volver al Home
          </button>
          <div className="md:text-center">
            <h1 className="font-poppins text-2xl md:text-3xl font-bold text-graphite-900">Línea de Tiempo del E-Waste</h1>
            <p className="mt-2 text-sm text-graphite-500">Evolución del problema y las respuestas globales</p>
          </div>
          <div className="w-20" />
        </div>
        <div className="mb-10 h-1 w-full rounded-full bg-graphite-200/70">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
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
                  <p className="text-graphite-700">{formatHighlight(highlight)}</p>
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
