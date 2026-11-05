"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="space-y-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm text-rose-200">
      <p>Unable to render this screen.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-md border border-rose-400/40 bg-rose-500/20 px-3 py-1.5 text-xs"
      >
        Retry
      </button>
    </div>
  );
}
