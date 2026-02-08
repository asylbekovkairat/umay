export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex w-full max-w-dashboard flex-wrap items-center justify-between gap-2 px-4 py-4 text-sm">
        <span className="text-muted">Powered by Polygon</span>
        <a className="text-foreground hover:opacity-70" href="#">
          Developed by{" "}
          <a
            href="https://kairat-asylbekov-dev.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kairat Asylbekov
          </a>{" "}
          ·{" "}
          <a
            href="https://t.me/kairat_asylbekov"
            target="_blank"
            rel="noopener noreferrer"
          >
            @kairat_asylbekov
          </a>
        </a>
      </div>
    </footer>
  );
}
