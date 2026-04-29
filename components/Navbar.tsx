import Link from "next/link";
import { Menu } from "lucide-react";

/** Same order + test ids as the original CRA Navbar (`site.html`). */
const navItems = [
  { label: "Inicio", href: "/", testId: "nav-inicio" },
  { label: "Sobre mí", href: "/#sobre-mi", testId: "nav-sobre-mi" },
  { label: "Servicios", href: "/#servicios", testId: "nav-servicios" },
  { label: "Enfoque", href: "/#enfoque", testId: "nav-enfoque" },
  { label: "Blog", href: "/blog", testId: "nav-blog" },
  { label: "Contacto", href: "/#contacto", testId: "nav-contacto" }
] as const;

export function Navbar() {

  return (
    <header
      className="sticky top-0 z-50 border-b border-[#F4EAD5]/70 bg-cream shadow-[0_1px_0_rgba(45,55,43,0.04)]"
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between gap-4 py-5">
        <Link href="/" className="flex items-baseline gap-2 shrink-0" data-testid="logo-link">
          <span className="font-serif text-3xl tracking-tight text-[#2D372B]">
            Casa Uma
          </span>
          <span className="hidden sm:inline text-xs tracking-[0.3em] uppercase text-[#5A6658]">
            psicoterapia
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-8">
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="cu-link text-sm tracking-wide text-[#2D372B]"
                data-testid={item.testId}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">

            <Link
              href="/#contacto"
              className="hidden lg:inline-flex cu-btn-primary"
              data-testid="nav-book-session-btn"
            >
              Reservar sesión
            </Link>

            <button
              className="lg:hidden p-2 text-[#2D372B]"
              aria-label="Menú"
              data-testid="mobile-menu-toggle"
              type="button"
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

