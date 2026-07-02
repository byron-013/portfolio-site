export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-ink border-t border-paper/10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-paper/50 text-xs tracking-wide">
          © {new Date().getFullYear()} Byron Delaney Jr
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/byron-013"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/60 hover:text-paper transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/byron13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/60 hover:text-paper transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="mailto:byrondelaney.jr@outlook.com"
            className="text-paper/60 hover:text-paper transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
