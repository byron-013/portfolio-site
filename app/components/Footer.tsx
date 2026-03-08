export default function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[#111827]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[#94a3b8] text-sm">
          © {new Date().getFullYear()} Byron Delaney Jr
        </p>
        <div className="flex gap-6">
          <a
            href="https://github.com/byron-013"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#c9a84c] transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/byron13"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#94a3b8] hover:text-[#c9a84c] transition-colors text-sm"
          >
            LinkedIn
          </a>
          <a
            href="mailto:byrondelaney.jr@outlook.com"
            className="text-[#94a3b8] hover:text-[#c9a84c] transition-colors text-sm"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
