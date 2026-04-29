const PILLARS = [
  {
    num: "01",
    title: "Cognitivo-conductual",
    body: "Para identificar pensamientos automáticos, trabajar conductas y construir nuevas herramientas prácticas."
  },
  {
    num: "02",
    title: "Psicodinámico",
    body: "Para mirar la historia, las heridas antiguas y los patrones inconscientes que siguen operando hoy."
  },
  {
    num: "03",
    title: "Humanista",
    body: "Para sostener un espacio seguro donde lo que sientes tiene lugar, sin prisa y sin juicio."
  }
] as const;

export function Approach() {
  return (
    <section
      id="enfoque"
      className="py-24 lg:py-32 bg-[#2D372B] text-[#FDFBF7] relative overflow-hidden"
      data-testid="approach-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 mb-20 items-end">
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.35em] uppercase text-[#CCD5AE] mb-5">
              Mi enfoque
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl leading-tight">
              Psicoterapia<span className="italic text-[#D4A373]"> integrativa</span>,
              porque ninguna persona cabe en una sola mirada.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[#CCD5AE] leading-relaxed font-light text-lg">
              Combino diversas escuelas y técnicas para ofrecer un acompañamiento flexible
              y personalizado. Cada persona llega con una historia única, y el proceso
              terapéutico debe poder adaptarse a ella, no al revés.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {PILLARS.map((p) => (
            <div
              key={p.num}
              className="border-t border-[#CCD5AE]/30 pt-8"
              data-testid={`pillar-${p.num}`}
            >
              <p className="font-serif text-5xl text-[#D4A373] mb-4">{p.num}</p>
              <h3 className="font-serif text-2xl mb-4">{p.title}</h3>
              <p className="text-[#CCD5AE] leading-relaxed font-light">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl">
          <p className="font-serif italic text-2xl lg:text-3xl text-[#FDFBF7] leading-relaxed">
            &quot;No aplico una técnica sobre ti. Escucho qué necesita tu proceso y
            construimos juntos/as el camino.&quot;
          </p>
        </div>
      </div>
    </section>
  );
}

