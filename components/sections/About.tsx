export function About() {
  return (
    <section
      id="sobre-mi"
      className="py-24 lg:py-32 bg-[#F4EAD5]/40"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-12 gap-14 lg:gap-20 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="relative">
              <div
                className="absolute -inset-3 bg-[#D4A373]/20 rounded-[2rem] rotate-3"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Mariana Souto, psicoterapeuta"
                className="relative rounded-[2rem] w-full aspect-[3/4] object-cover object-top"
                data-testid="about-image"
                src="/mariana.jpg"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.35em] uppercase text-[#5A6658] mb-6">
              Sobre mí
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2D372B] leading-tight mb-10">
              Soy Mariana Souto.
              <br />
              <span className="italic text-[#B2845A]">Acompañar procesos</span>,
              <br />
              de forma genuina,
              <br />
              es lo que me mueve.
            </h2>
            <span className="cu-divider mb-8" aria-hidden="true" />

            <div className="space-y-6 text-[#2D372B] text-lg leading-relaxed font-light max-w-2xl">
              <p>
                Nací y me crié en una familia con muchas mujeres, donde la educación y
                la salud mental siempre fueron temas presentes en casa, nombrados desde
                que era pequeña. Crecí escuchando hablar de Freud, Piaget, Vigotsky; la
                psicología fue parte del paisaje cotidiano.
              </p>
              <p>
                De adolescente emigré a España. Atravesar ese proceso en carne propia
                —el desarraigo, la adaptación, la construcción de una nueva identidad—
                me acercó aún más a esta disciplina. Entendí que lo emocional no es un
                lujo: es el suelo donde todo lo demás se sostiene.
              </p>
              <p>
                He viajado mucho, he roto muchos patrones, y todo eso me ha dado una
                mirada abierta y flexible. Acompaño en español, portugués, italiano y
                catalán, porque sé que las emociones a veces se dicen mejor en la lengua
                en que se sintieron por primera vez.
              </p>
            </div>

            <div className="mt-12 grid sm:grid-cols-2 gap-6 max-w-xl">
              <div
                className="bg-[#FDFBF7] border border-[#F4EAD5] rounded-2xl p-6"
                data-testid="about-card-collegiate"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-[#5A6658] mb-2">
                  Colegiada
                </p>
                <p className="font-serif text-2xl text-[#2D372B]">Nº 36066</p>
              </div>
              <div
                className="bg-[#FDFBF7] border border-[#F4EAD5] rounded-2xl p-6"
                data-testid="about-card-languages"
              >
                <p className="text-xs tracking-[0.25em] uppercase text-[#5A6658] mb-2">
                  Idiomas
                </p>
                <p className="font-serif text-xl text-[#2D372B] leading-snug">
                  ES · PT · IT · CAT
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

