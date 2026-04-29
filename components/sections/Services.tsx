import { Heart, User, Users } from "lucide-react";

const SERVICES = [
  {
    title: "Parejas",
    description:
      "Un espacio para mirar juntos/as lo que ya no está funcionando y reencontrar formas más sanas de estar en relación.",
    icon: Heart,
    image:
      "https://images.unsplash.com/photo-1714973768302-6b7e90b5a2f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxzZXJlbmUlMjBuYXR1cmUlMjB0ZWElMjBjdXAlMjBib29rcyUyMHJlbGF4aW5nfGVufDB8fHx8MTc3NzM2OTE2OHww&ixlib=rb-4.1.0&q=85"
  },
  {
    title: "Jóvenes",
    description:
      "Acompaño a adolescentes y jóvenes adultos/as en la construcción de identidad, autoestima y manejo emocional.",
    icon: Users,
    image:
      "https://images.pexels.com/photos/5806982/pexels-photo-5806982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    title: "Adultos/as",
    description:
      "Procesos individuales de autoconocimiento profundo, duelo, ansiedad y transformación personal.",
    icon: User,
    image:
      "https://images.unsplash.com/photo-1762770622112-4a708ce0d731?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzN8MHwxfHNlYXJjaHw0fHxjb3p5JTIwaG9tZSUyMGludGVyaW9yJTIwc29mdCUyMG5hdHVyYWwlMjBsaWdodCUyMHBsYW50c3xlbnwwfHx8fDE3NzczNjkxNjh8MA&ixlib=rb-4.1.0&q=85"
  }
] as const;

const TOPICS = [
  "Ansiedad",
  "Duelo",
  "Gestión emocional",
  "Relaciones interpersonales",
  "Autoconocimiento",
  "Autoestima",
  "Heridas emocionales",
  "Estilos de apego"
] as const;

export function Services() {
  return (
    <section id="servicios" className="py-24 lg:py-32" data-testid="services-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-[#5A6658] mb-5">
            Servicios
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2D372B] leading-tight">
            Acompañamiento<span className="italic text-[#B2845A]"> adaptado</span> a
            cada momento de la vida.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group bg-[#FDFBF7] border border-[#F4EAD5] rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:border-[#D4A373]"
              data-testid={`service-card-${s.title.toLowerCase()}`}
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={s.title}
                  className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-105"
                  src={s.image}
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="w-10 h-10 rounded-full bg-[#E9EDC9] flex items-center justify-center mb-5">
                  <s.icon className="size-[18px] text-[#5A6658]" aria-hidden />
                </div>
                <h3 className="font-serif text-3xl text-[#2D372B] mb-3">
                  {s.title}
                </h3>
                <p className="text-[#5A6658] leading-relaxed font-light">
                  {s.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 bg-[#CCD5AE]/30 rounded-[2rem] p-10 lg:p-16">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.35em] uppercase text-[#5A6658] mb-4">
                Áreas de trabajo
              </p>
              <h3 className="font-serif text-3xl lg:text-4xl text-[#2D372B] leading-tight">
                Temas que acompaño
                <br />
                con frecuencia.
              </h3>
            </div>
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-3">
                {TOPICS.map((t) => (
                  <span
                    key={t}
                    className="px-5 py-2.5 bg-[#FDFBF7] border border-[#F4EAD5] rounded-full text-sm text-[#2D372B] font-light tracking-wide"
                    data-testid={`topic-${t.toLowerCase().replaceAll(" ", "-")}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-sm text-[#5A6658] font-light">
                Sesiones online · <span className="text-[#2D372B] font-medium">45€</span>{" "}
                · 50 minutos
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

