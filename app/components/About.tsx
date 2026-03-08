export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-6 leading-tight">
              Applied Mathematics.<br />Financial Precision.
            </h2>
            <div className="w-12 h-px bg-[#c9a84c] mb-8" />
            <p className="text-[#94a3b8] leading-relaxed mb-5">
              I studied Applied Mathematics at UC Berkeley, where I developed a strong foundation in statistical theory, linear algebra, and optimization — the mathematical backbone of modern quantitative finance.
            </p>
            <p className="text-[#94a3b8] leading-relaxed mb-5">
              My work sits at the intersection of finance and machine learning. I build systems that model credit risk, optimize portfolios, and extract signal from complex financial datasets — always with a focus on rigor, interpretability, and practical impact.
            </p>
            <p className="text-[#94a3b8] leading-relaxed">
              I&apos;m drawn to roles in quantitative research, financial analysis, and data science where mathematical depth and computational execution both matter.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Degree", value: "B.S. Applied Mathematics" },
              { label: "Institution", value: "UC Berkeley" },
              { label: "Focus", value: "Quantitative Finance & ML" },
              { label: "Location", value: "United States" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-[#111827] border border-[#1a2235] rounded-lg p-5 hover:border-[#c9a84c]/30 transition-colors duration-200"
              >
                <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-1 font-medium">
                  {item.label}
                </p>
                <p className="text-[#f0f4ff] text-sm font-medium">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
