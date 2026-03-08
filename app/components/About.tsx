const experience = [
  {
    company: "Hyve Solutions",
    role: "Repair Technician",
    period: "Feb 2025 – Present",
    bullets: [
      "Develop Python and Bash scripts to automate data collection and monitoring workflows.",
      "Analyze server performance logs to identify issues and optimize operational efficiency.",
    ],
  },
  {
    company: "Pixonomi",
    role: "Data Science Intern",
    period: "Jul 2024 – Jan 2025",
    bullets: [
      "Built ETL pipelines using Python, SQL, and Databricks to ingest and standardize data.",
      "Performed EDA and built visualizations using matplotlib and seaborn for stakeholder reporting.",
      "Collaborated in agile sprints with cross-functional teams.",
    ],
  },
  {
    company: "Independent Tutor",
    role: "Mathematics",
    period: "2020 – Present",
    bullets: [
      "Taught mathematics through calculus to students with diverse backgrounds.",
      "Native Spanish speaker — provided bilingual instruction when needed.",
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Top: Bio + Education cards */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-20">
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
              I&apos;m actively seeking roles in quantitative research, financial analysis, and data science where mathematical depth and computational execution both matter.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Degree", value: "B.S. Applied Mathematics" },
                { label: "Institution", value: "UC Berkeley" },
                { label: "Focus", value: "Quantitative Finance & ML" },
                { label: "Languages", value: "English & Spanish" },
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

            {/* Coursework */}
            <div className="bg-[#111827] border border-[#1a2235] rounded-lg p-5 hover:border-[#c9a84c]/30 transition-colors duration-200">
              <p className="text-[#c9a84c] text-xs tracking-widest uppercase mb-2 font-medium">
                Relevant Coursework
              </p>
              <p className="text-[#94a3b8] text-sm leading-relaxed">
                Probability Theory · Mathematical Economics · Financial Economics · Numerical Analysis · Abstract Linear Algebra · Financial &amp; Managerial Accounting
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Experience</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-10 leading-tight">
            Background
          </h2>

          <div className="flex flex-col gap-0">
            {experience.map((job, i) => (
              <div
                key={i}
                className="relative pl-8 pb-10 border-l border-[#1a2235] last:border-transparent last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <div>
                    <span className="text-[#f0f4ff] font-semibold">{job.company}</span>
                    <span className="text-[#94a3b8] mx-2">·</span>
                    <span className="text-[#c9a84c] text-sm">{job.role}</span>
                  </div>
                  <span className="text-[#94a3b8] text-xs tracking-wide">{job.period}</span>
                </div>

                <ul className="flex flex-col gap-1 mt-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#94a3b8]">
                      <span className="w-1 h-1 rounded-full bg-[#c9a84c] flex-shrink-0 mt-1.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
