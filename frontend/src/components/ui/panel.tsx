import { ReactNode } from "react";

type PanelProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  rightSlot?: ReactNode;
};

export function Panel({ title, subtitle, children, rightSlot }: PanelProps) {
  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/75 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.35)]">
      {(title || subtitle || rightSlot) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-200">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
          </div>
          {rightSlot}
        </header>
      )}
      {children}
    </section>
  );
}
