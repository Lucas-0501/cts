import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, ExternalLink, Globe2, ListChecks, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';

const promptText = `
**página web moderna, educativa y visualmente atractiva** titulada **“Impacto de los Residuos de Tecnología”**

**Estilo visual:**

- Fondo oscuro profesional con tonos **azul, gris y verde** (simbolizando tecnología y sostenibilidad).
- Tipografía moderna (tipo *Roboto* o *Poppins*).
- Íconos y fotos realistas de basura electrónica, fábricas, reciclaje, y componentes tecnológicos.
- Diseño limpio con secciones bien diferenciadas y botones interactivos.

**Estructura del sitio (mínimo 5 secciones):**

1. **Inicio:**
    - Título: *“Impacto de los Residuos de Tecnología”*
    - Subtítulo: *“La otra cara del progreso digital”*
    - Breve introducción con una imagen representativa del problema de la basura electrónica.
2. **Qué son los residuos tecnológicos:**
    - Espacio para poder definir que son los residuos electrónicos.
    - Grafico para ingresar cantidad de e-waste con formato barras horizontales con texto placeholder.
3. **Consecuencias e impacto social y ambiental:**
    - 3 Cards donde se podra modificar los titulos e información.
4. **Soluciones y alternativas sustentables:**
    - 5 secciones informativas con texto placeholder.
5. Footer con acceso a diferentes secciones de la pagina web, hipervinculos a fuentes de información.

**Extras :**

- Animaciones suaves al hacer scroll.
- Una seccion con frames de video.

Prompts de edicion de sitio web:

Editar la sección “La cadena del E-Waste” del sitio para que cada uno de los siguientes bloques:

- Consumo
- Descarte
- Recolección
- Exportación
- Contaminación

tenga un **sub-bloque dinámico** que aparece debajo del bloque principal cuando el usuario pasa el cursor por encima (hover).

REQUISITOS DEL SUB-BLOQUE:

- Debe estar inicialmente oculto (display: none / opacity: 0 / height: 0).
- Al hacer hover en el bloque principal, el sub-bloque debe aparecer con una animación:
    - slide-down (transición de height o transform: translateY)
    - fade-in (opacity)
    - duración recomendada: 250–350ms
    - easing: ease-out o cubic-bezier suave
- El sub-bloque debe tener estilo coherente con la estética de la página: colores oscuros, opacidad leve, bordes sutiles, y un efecto blur similar al resto de la web.
- Debe incluir **texto placeholder** (ejemplo: “Texto editable sobre esta etapa de la cadena del e-waste…”).
- El usuario debe poder reemplazar el texto fácilmente sin romper la estructura.

DETALLES DE DISEÑO:

- Borde sutil de 1px con rgba(255,255,255,0.08)
- Fondo semitransparente: rgba(20,20,20,0.35)
- Dentro del sub-bloque, usar padding de al menos 12–16px.
- Tipografía ligera, siguiendo la del resto del sitio.
- Mantener minimalismo, sin agregar pesos visuales.

---

---

---

Modificar la sección “¿Qué son los residuos tecnológicos?” para que los elementos:

- Celulares
- Computadoras
- Baterías
- Componentes

tengan un apartado dinámico que se despliegue automáticamente al pasar el mouse por arriba (hover).

FUNCIONAMIENTO:

- Cada ítem debe mostrar un “panel de información adicional” justo debajo cuando el usuario hace hover.
- El panel debe estar inicialmente oculto (opacity 0, height 0 o transform).
- Al hacer hover, debe desplegarse con animación:
    - slide-down (o translateY)
    - fade-in
    - duración entre 250–350ms
    - easing suave (ease-out / cubic-bezier)
- El panel debe cerrarse al retirar el cursor.

CONTENIDO:

- Cada panel debe contener **texto placeholder**, por ejemplo:
“Texto editable sobre los residuos tecnológicos relacionados con [Celulares/Computadoras/etc].”
- Ese texto debe ser fácilmente reemplazable más adelante.

ESTILO:

- Debe respetar la estética visual del sitio:
    - fondo semitransparente estilo glass: rgba(20,20,20,0.35)
    - borde fino: 1px rgba(255,255,255,0.08)
    - bordes redondeados
    - padding interno 12–16px
    - tipografía ligera
- Debe mantener coherencia con el diseño minimalista de la web.

---

---

---

---

Modificar la sección "Soluciones Sustentables" de la página referenciada para que **cada bloque muestre un segundo texto mediante un cross-fade al hacer hover**. El segundo texto debe ser un **PLACEHOLDER** claramente identificable para que el contenido pueda reemplazarse manualmente después.

- Mantener el diseño minimalista y la paleta oscura / acento verde menta de la referencia.
- Evitar reflows: la transición debe animar solo opacity y transform para mantener rendimiento.
- Soportar hover (mouse) y accesibilidad por teclado y touch (móviles).

REQUERIMIENTOS FUNCIONALES (cómo debe comportarse):

1. Cada bloque (p. ej. Reciclaje, Reuso, Diseño Circular, Políticas, Educación — usar 4–6 ejemplos) tendrá:
    - Texto principal (visible por defecto).
    - Texto secundario (placeholder) que aparecerá al hacer hover o al recibir focus/acción táctil.
2. Efecto visual:
    - Cross-fade: fade-out del texto principal + fade-in del texto secundario.
    - Duración recomendada: 200–300ms; easing: ease-out.
    - Mantener el flujo del layout (no cambiar tamaño del contenedor).
3. Accesibilidad:
    - Soporte para teclado: :focus-within o manejo de focus para activar el efecto.
    - Soporte para touch: primer toque muestra texto secundario; segundo toque vuelve al principal (puede usarse JS mínimo).
    - Marcar aria-hidden="true" en el texto no visible cuando corresponda.
4. Marcar claramente el placeholder en el HTML (ej: <!-- PLACEHOLDER: reemplazar texto aquí --> o prefijo PLACEHOLDER: en el contenido).

REQUERIMIENTOS DE DISEÑO (estética y estilos):

- Contenedor del bloque: position: relative.
- Textos: apilados con position: absolute; inset: 0; y centrados con padding.
- Fondo de cada bloque: rgba(20,20,20,0.35) con borde 1px solid rgba(255,255,255,0.06) y bordes redondeados.
- Transiciones: transition: opacity 240ms ease-out, transform 240ms ease-out.
- Evitar sombras pesadas o blur que afecten performance en móvil.

---

---

modificar la sección "Impacto Ambiental y Social" manteniendo exactamente la estructura y apariencia que ya tiene, pero agregando interactividad en cada bloque de texto.

INSTRUCCIÓN PRINCIPAL:
Cada bloque debe mostrar un efecto de transición suave (fade, degradado o desvanecido) que revele una versión MÁS DETALLADA del mismo contenido cuando el usuario pasa el mouse por encima. Ese texto más detallado debe ser un PLACEHOLDER para que yo lo reemplace manualmente.

DETALLES DEL COMPORTAMIENTO:

- El texto actual del bloque debe ser lo que se ve por defecto.
- Al hacer hover sobre un bloque:
• El texto original debe desvanecerse suavemente.
• Debe aparecer un texto ampliado, con más detalle sobre ese mismo tema.
- El texto ampliado debe ser un PLACEHOLDER claramente identificable.
- La transición debe ser tipo “cross-fade”: un contenido se va, el otro aparece.
- La animación debe durar entre 200 y 300ms, con un efecto suave (ease-out).
- El tamaño del bloque no debe cambiar en ningún momento.
- La disposición y estética general no deben alterarse.

ESTÉTICA Y ESTILO:

- Mantener el diseño visual actual tal como se ve en la referencia.
- La animación debe sentirse integrada al estilo minimalista: sutil, limpia, sin sombras excesivas.
- El cambio de texto debe sentirse elegante, no brusco.
- Debe respetar la paleta de colores y fondos translúcidos que ya tiene la página.
- Evitar cualquier movimiento que reacomode el layout; solo debe cambiar la opacidad y visibilidad del contenido.

ACCESIBILIDAD Y FUNCIONAMIENTO EXTRA:

- El mismo efecto debe activarse también cuando un bloque recibe “focus” por teclado.
- Para pantallas táctiles: un toque debe mostrar el texto ampliado y otro toque debe volver al texto original.
- El texto que no se está mostrando debe marcarse como oculto para tecnologías asistivas.

---

---

---

En la sección "Innovación y Futuro", mejorá la interacción de los elementos "Fairphone", "iFixit", "Back Market" y "Dell Circular".

Quiero que cada uno de estos apartados active un efecto de transición suave tipo fade-in / fade-out cuando el usuario pasa el mouse por encima.

Al hacer hover, debe aparecer un bloque de texto adicional con información extendida (yo luego voy a reemplazar ese texto placeholder manualmente).

El diseño debe mantenerse minimalista y limpio, sin agregar elementos innecesarios. El texto extra debe tener:
– un estilo ligeramente más tenue,
– buena legibilidad,
– un aspecto moderno y coherente con el resto de la página.

Asegurate de que la transición sea suave y consistente en los cuatro apartados.
`;

const documentSources = [
  {
    title: 'Observatorio internacional sobre residuos electrónicos 2024 - UNITAR',
    detail: 'Resumen ONU/UIT con cifras globales, tendencias y recomendaciones de politica para residuos electronicos.'
  },
  {
    title: 'Análisis de los efectos ambientales generados por los residuos electrónicos 2010 - Gottau, Verónica',
    detail: 'alternativas de negocio viables que reviertan su impacto en el ecosistema.'
  }
] as const;

const webSources = [
  {
    name: 'ONU - E-waste Monitor',
    url: 'https://ewastemonitor.info/',
    detail: 'Panel interactivo con mapas, datos abiertos y metodologias usadas para los indicadores globales.'
  },
  {
    name: 'Greenpeace - Riesgos de los residuos electronicos',
    url: 'https://www.greenpeace.org/argentina/el-peligro-de-los-residuos-electronicos',
    detail: 'Cobertura divulgativa sobre impacto ambiental, salud y consumo responsable.'
  },
  {
    name: 'IEEE Spectrum - Electronic Waste',
    url: 'https://spectrum.ieee.org/tag/electronic-waste',
    detail: 'Articulos sobre innovacion, reciclaje y politicas tecnologicas en torno al e-waste.'
  },
  {
    name: 'Ministerio de Ambiente Argentina - RAEE',
    url: 'https://www.argentina.gob.ar/sites/default/files/manual_raee.pdf',
    detail: 'Programas locales, puntos de gestion y estado de la normativa nacional.'
  }
] as const;

function Sources() {
  const navigate = useNavigate();
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-graphite-900 via-graphite-900 to-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" aria-hidden />
        <div className="absolute bottom-10 left-1/3 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" aria-hidden />
      </div>

      <div className="relative z-10">
        <header className="pt-6">
          <Navbar />
        </header>

        <main className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex items-center gap-3 pt-8">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100 transition hover:border-emerald-400 hover:text-white"
            >
              <ArrowLeft size={16} />
              Volver
            </button>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">Seccion de fuentes</span>
          </div>

          <section className="mt-6 rounded-3xl border border-white/10 bg-[rgba(20,20,20,0.55)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                  <Sparkles size={16} />
                  Transparencia de datos
                </p>
                <h1 className="font-poppins text-4xl font-bold text-white">Fuentes y trazabilidad</h1>
                <p className="mt-3 max-w-3xl text-sm text-graphite-200">
                  Reunimos las referencias que sustentan cada grafico, narrativa y recomendacion del sitio. Esta pagina se mantiene
                  en el mismo estilo visual para que la experiencia sea coherente y facil de navegar.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/calculator')}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-400/50 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(16,185,129,0.22)] transition hover:translate-y-[-2px] hover:border-emerald-300 hover:shadow-[0_14px_30px_rgba(16,185,129,0.3)]"
                >
                  <ListChecks size={18} />
                  Ver linea de tiempo
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-100"
                >
                  <Globe2 size={18} />
                  Ir al inicio
                </button>
              </div>
            </div>
          </section>

          <section className="mt-10 grid gap-10">
            <article className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-graphite-900/70 p-8 shadow-[0_18px_38px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-emerald-500 to-blue-500" aria-hidden />
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200">
                  <BookOpen size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Bloque 01</p>
                  <h2 className="font-poppins text-2xl font-bold text-white">Libros, textos y documentos</h2>
                </div>
              </div>
              <ol className="mt-6 grid gap-4 md:grid-cols-2">
                {documentSources.map((source, index) => (
                  <li
                    key={source.title}
                    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-emerald-400/50"
                  >
                    <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-emerald-500/10 blur-2xl transition group-hover:scale-110" aria-hidden />
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/25 text-lg font-bold text-white">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <p className="font-semibold text-white">{source.title}</p>
                        <p className="text-sm text-graphite-200 leading-relaxed">{source.detail}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-blue-400/30 bg-graphite-900/70 p-8 shadow-[0_18px_38px_rgba(0,0,0,0.35)]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-500" aria-hidden />
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/20 text-blue-200">
                  <Globe2 size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-blue-200">Bloque 02</p>
                  <h2 className="font-poppins text-2xl font-bold text-white">Fuentes de sitios webs informativos</h2>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {webSources.map((source) => (
                  <a
                    key={source.name}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:border-emerald-400/60 hover:shadow-[0_14px_32px_rgba(16,185,129,0.25)]"
                  >
                    <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl transition group-hover:scale-110" aria-hidden />
                    <div className="flex items-start gap-3">
                      <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/25 text-white">
                        <ExternalLink size={16} />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{source.name}</p>
                        <p className="text-sm text-graphite-200 leading-relaxed">{source.detail}</p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                      Abrir recurso
                      <ChevronRightIcon />
                    </span>
                  </a>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-emerald-500/10 via-graphite-900 to-blue-500/5 p-8 shadow-[0_18px_38px_rgba(0,0,0,0.35)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-200">
                  <Sparkles size={22} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Bloque 03</p>
                  <h2 className="font-poppins text-2xl font-bold text-white">Prompts usados para desarrolar la web</h2>
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-xl border border-white/15 bg-black/30">
                <button
                  type="button"
                  onClick={() => setIsPromptOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                  aria-expanded={isPromptOpen}
                >
                  <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                    {isPromptOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    Mostrar/ocultar prompt completo
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100">
                    Texto interno
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isPromptOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden px-4 pb-4 pt-1 text-sm text-emerald-100">
                    <pre className="whitespace-pre-wrap break-words font-mono leading-relaxed">{promptText}</pre>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </main>
      </div>
    </div>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      className="h-3 w-3 text-emerald-200"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 3l4 5-4 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default Sources;
