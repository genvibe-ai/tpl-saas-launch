/** Fixed page backdrop: film grain + the two vertical "rails" framing the content column. */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <div className="grain absolute inset-0 opacity-[0.035]" />
      <div className="mx-auto hidden h-full max-w-7xl border-x border-line min-[1340px]:block" />
    </div>
  );
}
