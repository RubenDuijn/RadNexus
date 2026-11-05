import { ReactNode } from "react";

type PanelProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  rightSlot?: ReactNode;
};

export function Panel({ title, subtitle, children, rightSlot }: PanelProps) {
  return (
    <section className="rn-card p-5 lg:p-6">
      {(title || subtitle || rightSlot) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="text-sm font-semibold uppercase tracking-[0.13em] text-slate-700">{title}</h3>}
            {subtitle && <p className="mt-1 text-sm rn-muted">{subtitle}</p>}
          </div>
          {rightSlot}
        </header>
      )}
      {children}
    </section>
  );
}
