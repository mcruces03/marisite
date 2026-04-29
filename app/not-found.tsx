import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-cream">
      <div className="container-page py-16">
        <h1 className="font-serif text-4xl font-semibold">Página no encontrada</h1>
        <p className="mt-4 text-forest/85">
          El enlace puede estar roto o la página ya no existe.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream hover:bg-peach"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

