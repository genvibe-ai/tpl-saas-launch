import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { nav, site } from "../../content";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { cx } from "../../lib/cx";
import { EASE_OUT } from "../../lib/motion";
import { ButtonLink } from "../ui/Button";
import { Logo } from "../ui/Logo";

/** Sticky glass navbar: floating pill with smooth-scroll anchors and a mobile menu. */
export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on Escape or when the viewport grows to desktop.
  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const elevated = scrolled || open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <motion.nav
        aria-label="Main"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className={cx(
          "mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border pr-2 pl-4 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500",
          elevated ? "border-line bg-canvas/75 shadow-float" : "border-fg/[0.06] bg-canvas/25",
        )}
      >
        <a href="#top" aria-label={`${site.name} — back to top`} className="shrink-0 rounded-full">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => {
            const isActive = active !== null && link.href === `#${active}`;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "location" : undefined}
                  className={cx(
                    "relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-300",
                    isActive ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-fg/[0.08] ring-1 ring-fg/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <a
            href={nav.signIn.href}
            className="hidden rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:text-fg sm:block"
          >
            {nav.signIn.label}
          </a>
          <ButtonLink href={nav.cta.href} size="sm" icon={ArrowRight}>
            {nav.cta.label}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-fg/10 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            className="mx-auto mt-2 max-w-6xl origin-top rounded-3xl border border-line bg-canvas/90 p-2 shadow-float backdrop-blur-xl md:hidden"
          >
            <ul>
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium text-fg transition-colors hover:bg-fg/5"
                  >
                    {link.label}
                    <ArrowUpRight aria-hidden className="size-4 text-faint" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-1 border-t border-line p-2 pt-3">
              <ButtonLink
                href={nav.signIn.href}
                variant="secondary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {nav.signIn.label}
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
