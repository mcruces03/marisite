import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden" data-testid="hero-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <p
              className="text-xs tracking-[0.35em] uppercase text-[#5A6658] mb-8 rise-in rise-in-1"
              data-testid="hero-eyebrow"
            >
              Psicoterapia Integrativa · Col. 36066
            </p>
            <h1
              className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#2D372B] rise-in rise-in-2"
              data-testid="hero-title"
            >
              Un lugar donde
              <span className="italic text-[#B2845A]"> habitarte </span>
              <br className="hidden sm:block" />
              con calma.
            </h1>
            <p
              className="mt-8 text-lg text-[#5A6658] leading-relaxed max-w-xl font-light rise-in rise-in-3"
              data-testid="hero-description"
            >
              Casa Uma es un espacio de psicoterapia cálido y seguro, pensado como un
              encuentro en nuestra casa. Acompaño a parejas, jóvenes y adultos/as en
              procesos de autoconocimiento, ansiedad, duelo, gestión emocional y
              vínculos.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 rise-in rise-in-4">
              <Link className="cu-btn-primary" data-testid="hero-cta-book" href="/#contacto">
                Reservar primera sesión <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                className="cu-btn-secondary"
                data-testid="hero-cta-approach"
                href="/#enfoque"
              >
                Conocer mi enfoque
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-4 max-w-md rise-in rise-in-4">
              <div>
                <p className="font-serif text-3xl text-[#2D372B]">45€</p>
                <p className="text-xs text-[#5A6658] mt-1 tracking-wider">
                  Sesión online
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[#2D372B]">4</p>
                <p className="text-xs text-[#5A6658] mt-1 tracking-wider">Idiomas</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-[#2D372B]">∞</p>
                <p className="text-xs text-[#5A6658] mt-1 tracking-wider">Cuidado</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2 relative">
            <div className="relative rise-in rise-in-2">
              <div
                className="absolute -inset-4 bg-[#E9EDC9]/60 rounded-[2rem] -rotate-2"
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Interior cálido con plantas y luz natural"
                className="relative rounded-[2rem] w-full h-[420px] lg:h-[560px] object-cover shadow-sm"
                data-testid="hero-image"
                src="https://images.pexels.com/photos/5806981/pexels-photo-5806981.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-[#FDFBF7]/95 backdrop-blur rounded-2xl px-5 py-4 border border-[#F4EAD5]">
                <p className="font-serif italic text-[#2D372B] text-lg leading-snug">
                  &quot;Sanar no es volver a ser quien eras. Es descubrir quién puedes
                  ser.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

