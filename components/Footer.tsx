import Link from "next/link";
import { Globe2, Instagram, Mail } from "lucide-react";
import { getInstagramLabel, getInstagramUrl } from "@/lib/social";

export function Footer() {
  const instagramUrl = getInstagramUrl();
  const instagramLabel = getInstagramLabel();

  return (
    <footer className="bg-[#2D372B] text-[#FDFBF7] mt-32" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid gap-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-serif text-4xl mb-4">Casa Uma</h3>
          <p className="text-[#CCD5AE] text-sm leading-relaxed max-w-sm font-light">
            Un espacio cálido y seguro para acompañarte en tu proceso. Psicoterapia
            integrativa para parejas, jóvenes y adultos/as.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#CCD5AE] mb-5">
            Contacto
          </p>
          <ul className="space-y-3 text-sm font-light">
            <li className="flex items-start gap-2">
              <Mail className="mt-1 size-[14px] text-[#D4A373]" aria-hidden />
              <a
                href="mailto:marucb03@gmail.com"
                className="hover:text-[#D4A373] transition-colors break-all"
                data-testid="footer-email"
              >
                marucb03@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-2">
              <Globe2 className="mt-1 size-[14px] text-[#D4A373]" aria-hidden />
              <span>Sesiones online · 45€</span>
            </li>
            {instagramUrl ? (
              <li className="flex items-start gap-2">
                <Instagram className="mt-1 size-[14px] text-[#D4A373]" aria-hidden />
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#D4A373] transition-colors"
                  data-testid="footer-instagram"
                >
                  {instagramLabel}
                </a>
              </li>
            ) : null}
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#CCD5AE] mb-5">
            Explorar
          </p>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <Link className="cu-link" href="/#sobre-mi">
                Sobre mí
              </Link>
            </li>
            <li>
              <Link className="cu-link" href="/#servicios">
                Servicios
              </Link>
            </li>
            <li>
              <Link className="cu-link" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="cu-link" href="/#contacto">
                Reservar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#5A6658]/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-[#CCD5AE]/80 font-light">
          <p>© {new Date().getFullYear()} Mariana Souto · Colegiada nº 36066</p>
          <p>Idiomas: Español · Portugués · Italiano · Catalán</p>
        </div>
      </div>
    </footer>
  );
}

