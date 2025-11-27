import { useEffect, useState, type MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

export const NAV_SECTIONS = [
  { id: 'que-son-residuos', label: '¿Qué son los residuos tecnológicos?' },
  { id: 'impacto-ambiental', label: 'Impacto Ambiental y Social' },
  { id: 'panorama-global', label: 'Panorama Global del E-Waste' },
  { id: 'residuos-espaciales', label: 'Residuos Tecnológicos Espaciales' },
  { id: 'cadena-e-waste', label: 'La Cadena del E-Waste' },
  { id: 'realidad-e-waste', label: 'Mira la Realidad del E-Waste' },
  { id: 'soluciones-sustentables', label: 'Soluciones Sustentables' },
  { id: 'argentina-latam', label: 'Argentina y América Latina' },
  { id: 'innovacion-futuro', label: 'Innovación y Futuro' }
] as const;

type NavbarProps = {
  activeSection?: string;
  onSectionClick?: (id: string) => void;
};

const linkBase =
  'relative inline-flex items-center px-3 py-2 text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400';

const mobileLinkBase =
  'relative flex w-full items-center px-4 py-3 text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400';

function Navbar({ activeSection, onSectionClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isCalculator = location.pathname === '/calculator';

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    if (isHome) {
      onSectionClick?.(id);
    } else {
      navigate(`/#${id}`);
    }
    setIsOpen(false);
  };

  const desktopLinkClass = (isActive: boolean) =>
    `${linkBase} ${isActive ? 'text-white after:absolute after:left-2 after:right-2 after:-bottom-[6px] after:h-[3px] after:rounded-full after:bg-emerald-400' : ''}`;

  const mobileLinkClass = (isActive: boolean) =>
    `${mobileLinkBase} ${isActive ? 'text-white after:absolute after:left-4 after:right-4 after:-bottom-[3px] after:h-[3px] after:rounded-full after:bg-emerald-400' : ''}`;

  return (
    <nav aria-label="Navegación principal" className="sticky top-0 z-50 w-full border-b border-white/10 bg-[rgba(12,12,12,0.82)] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-2">
        <div className="flex justify-end">
          <button
            type="button"
            aria-expanded={!isCollapsed}
            aria-controls="navbar-accordion"
            onClick={() => {
              setIsCollapsed((prev) => !prev);
              setIsOpen(false);
            }}
            className="flex items-center gap-2 rounded-full bg-[rgba(20,20,20,0.6)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100 border border-white/15 shadow-[0_4px_10px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          >
            <span>{isCollapsed ? 'Mostrar navegación' : 'Ocultar navegación'}</span>
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
        </div>

        <div
          id="navbar-accordion"
          className={`mt-2 overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-out ${
            isCollapsed ? 'max-h-0 opacity-0 -translate-y-2 pointer-events-none' : 'max-h-[600px] opacity-100 translate-y-0'
          }`}
        >
          <div className="mt-3 flex items-center justify-between rounded-full border border-white/10 bg-[rgba(20,20,20,0.18)] px-4 py-3 backdrop-blur-[6px] shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.15)] animate-pulse" aria-hidden="true" />
              <span>Proyecto CTS</span>
            </div>

            <div className="hidden items-center gap-2 md:flex">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={isHome ? `#${section.id}` : `/#${section.id}`}
                  onClick={(event) => handleSectionClick(event, section.id)}
                  className={desktopLinkClass(activeSection === section.id)}
                  aria-current={activeSection === section.id ? 'page' : undefined}
                >
                  {section.label}
                </a>
              ))}
              <Link
                to="/calculator"
                className={desktopLinkClass(isCalculator)}
                aria-current={isCalculator ? 'page' : undefined}
              >
                Línea de tiempo
              </Link>
            </div>

            <button
              type="button"
              role="button"
              aria-expanded={isOpen}
              aria-label="Abrir menú"
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-200 hover:border-emerald-400 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 md:hidden"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden">
              <div className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.88)] backdrop-blur-[8px] shadow-2xl">
                <div className="flex flex-col divide-y divide-white/5">
                  {NAV_SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={isHome ? `#${section.id}` : `/#${section.id}`}
                      onClick={(event) => handleSectionClick(event, section.id)}
                      className={mobileLinkClass(activeSection === section.id)}
                      aria-current={activeSection === section.id ? 'page' : undefined}
                    >
                      {section.label}
                    </a>
                  ))}
                  <Link
                    to="/calculator"
                    className={mobileLinkClass(isCalculator)}
                    aria-current={isCalculator ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    Línea de tiempo
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
