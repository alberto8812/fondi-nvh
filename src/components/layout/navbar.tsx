import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { EASE } from "@/components/motion";

// Navbar lives in the shared Layout and persists across routes, so every
// in-page anchor needs the leading "/" to keep resolving to the home sections
// (e.g. from /careers) instead of appending the hash to the current route.
const NAV_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Montos", href: "/#montos" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Trabajá con nosotros", href: "/careers" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) {
      setOverHero(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry.isIntersecting),
      { rootMargin: "-71px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
    // Navbar persists across route changes (it lives in the shared Layout), but
    // #hero belongs to HomePage and unmounts/remounts with the route — re-run on
    // pathname change so the observer always targets the current #hero node.
  }, [pathname]);

  const transparent = pathname === "/" && overHero && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-brand-900 border-b border-brand-800"
      }`}
    >
      <div className="h-[70px] flex items-center justify-between px-5 sm:px-8 md:px-10">
        {/* Logo — larger over the transparent hero, settles smaller once the solid bar takes over */}
        <Link to="/#hero" className="flex items-center no-underline">
          <img
            src="/images/balck-logo.png"
            alt="Fondi"
            className={`w-auto object-contain transition-[height] duration-300 ${
              transparent ? "h-15" : "h-10"
            }`}
          />
        </Link>

        {/* Nav links — desktop */}
        <nav className="hidden md:flex gap-[30px] items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-brand-300 hover:text-white transition-colors duration-300 no-underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* CTA — always visible so it's reachable even if the mobile menu's JS fails to mount */}
          <Link
            to="/#contacto"
            className="inline-flex text-sm font-semibold px-3 sm:px-[18px] py-2.5 rounded-md no-underline transition-colors duration-300 bg-brand-300 text-brand-900 hover:bg-brand-400"
          >
            <span className="sm:hidden">Solicitar</span>
            <span className="hidden sm:inline">Solicitar crédito →</span>
          </Link>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 -mr-2 rounded-md text-brand-300 hover:text-white transition-colors duration-300"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel — positions relative to the sticky header, slides/fades in */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: EASE }}
            className="md:hidden absolute left-0 right-0 top-full bg-brand-900 border-b border-brand-800"
          >
            <div className="flex flex-col px-5 py-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[15px] font-medium text-brand-300 hover:text-white transition-colors duration-300 no-underline py-3 border-b border-brand-800 last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
