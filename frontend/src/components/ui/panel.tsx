import { ReactNode } from "react";

type PanelProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  rightSlot?: ReactNode;
};

export function Panel({ title, subtitle, children, rightSlot }: PanelProps) {
  return (
    <section className="rounded-xl border border-slate-800/90 bg-slate-900/70 p-5 shadow-[0_8px_28px_rgba(3,8,20,0.45)]">
      {(title || subtitle || rightSlot) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
          </div>
          {rightSlot}
        </header>
      )}
      {children}
    </section>
  );
}
