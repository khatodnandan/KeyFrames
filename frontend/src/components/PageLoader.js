export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <span className="page-loader-spinner" />
      <span className="visually-hidden">Loading…</span>
    </div>
  );
}
