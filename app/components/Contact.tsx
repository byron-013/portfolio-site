export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-[#090d1a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Contact</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-4 leading-tight">
          Let&apos;s Connect
        </h2>
        <p className="text-[#94a3b8] mb-12 max-w-lg leading-relaxed">
          I&apos;m actively exploring opportunities in quantitative finance, financial analysis, and data science. If you&apos;re working on something interesting, I&apos;d like to hear about it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="mailto:byrondelaney.jr@outlook.com"
            className="flex items-center gap-3 px-7 py-4 bg-[#c9a84c] text-[#0a0f1e] font-semibold rounded hover:bg-[#e8c97e] transition-all duration-200 text-sm tracking-wide"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            byrondelaney.jr@outlook.com
          </a>
          <a
            href="https://linkedin.com/in/byron13"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-7 py-4 border border-[#c9a84c] text-[#c9a84c] font-semibold rounded hover:bg-[#c9a84c] hover:text-[#0a0f1e] transition-all duration-200 text-sm tracking-wide"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            linkedin.com/in/byron13
          </a>
        </div>
      </div>
    </section>
  );
}
