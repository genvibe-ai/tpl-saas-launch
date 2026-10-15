import { footer, site } from "../../content";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line pt-16 sm:pt-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" aria-label={`${site.name} — back to top`} className="inline-flex rounded-full">
              <Logo />
            </a>
            <p className="mt-5 max-w-xs text-sm text-muted">{footer.tagline}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent/70 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {footer.status}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <p className="text-sm font-semibold text-fg">{column.title}</p>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm text-muted transition-colors hover:text-fg">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-faint">
            © {year} {site.legalName} All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul className="flex gap-5">
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-faint transition-colors hover:text-fg">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="flex gap-2">
              {footer.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-fg"
                  >
                    <social.icon aria-hidden className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Oversized faded wordmark */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] bg-linear-to-b from-fg/[0.09] to-transparent bg-clip-text text-center font-display text-[24vw] leading-[0.8] font-bold tracking-[-0.06em] text-transparent select-none"
      >
        {site.name}
      </p>
    </footer>
  );
}
