export function LoadingSpinner({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = { sm: "h-4 w-4", md: "h-8 w-8", lg: "h-12 w-12" }[size];
  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClass} animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]`}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]" />
        <p className="mt-4 text-[var(--text-secondary)]">Loading...</p>
      </div>
    </div>
  );
}
