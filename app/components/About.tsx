const experience = [
  {
    company: "Coers Corporation",
    role: "Quantitative Researcher & Platform Architect",
    period: "Jul 2026 – Present",
    bullets: [
      "Design and validate the firm's volatility-signal set — variance risk premium, dealer gamma (GEX), skew, term structure, dispersion, and regime — computed against a deterministic C++ options-volatility engine (eSSVI) on Databento OPRA data.",
      "Build the signals service that turns raw OPRA options and FRED rates into a ~55-signal, six-family library, each signal scored for provenance and confidence.",
      "Backtest signals over historical replays to measure stability and predictive edge before they enter the production registry.",
      "Write the research memos that decide which signals ship to the product and which get cut.",
    ],
  },
  {
    company: "MaritAIme",
    role: "Solutions Architect",
    period: "Jun 2026 – Present",
    bullets: [
      "Design and own the data pipelines behind MaritAIme's analytics platform — ingesting vessel telemetry, port-call records, and client operational data into a unified store.",
      "Translate client requirements into integration architecture, then build the ETL and data-quality tooling that runs it in production.",
      "Set standards for pipeline monitoring and validation across ingestion jobs.",
    ],
  },
  {
    company: "Hyve Solutions",
    role: "Repair Engineer",
    period: "Feb 2025 – May 2026",
    bullets: [
      "Developed Python and Bash scripts to automate data collection and monitoring workflows.",
      "Analyzed server performance logs to identify issues and optimize operational efficiency.",
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
            <p className="font-mono text-accent text-xs tracking-[0.18em] uppercase mb-3">
              02 / About
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-6 leading-tight">
              Applied mathematics,<br />financial precision.
            </h2>
            <div className="w-12 h-px bg-accent mb-8" />
            <p className="text-body leading-relaxed mb-5">
              I studied Applied Mathematics at UC Berkeley, where I developed a strong foundation in statistical theory, linear algebra, and optimization — the mathematical backbone of modern quantitative finance.
            </p>
            <p className="text-body leading-relaxed mb-5">
              My work sits at the intersection of finance and machine learning. I build systems that model credit risk, optimize portfolios, and extract signal from complex financial datasets — always with a focus on rigor, interpretability, and practical impact.
            </p>
            <p className="text-body leading-relaxed">
              I&apos;m currently a Quantitative Researcher &amp; Platform Architect at Coers Corporation — building the research infrastructure and signals platform behind an options-volatility engine — while also a Solutions Architect at MaritAIme and pursuing an M.S. in Mathematics at CSU East Bay. I&apos;m open to roles in quantitative research, financial analysis, and data science where mathematical depth and computational execution both matter.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <figure className="bg-surface border border-line rounded-sm p-3">
              <img
                src="/headshot.jpg"
                alt="Byron Delaney Jr at UC Berkeley"
                className="w-full rounded-sm object-cover"
              />
              <figcaption className="font-mono text-muted text-[11px] tracking-wide mt-2.5 pl-1">
                UC Berkeley — B.S. Applied Mathematics
              </figcaption>
            </figure>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Degree", value: "B.S. Applied Mathematics — UC Berkeley" },
                { label: "Graduate Study", value: "M.S. Mathematics (in progress) — CSU East Bay" },
                { label: "Current Role", value: "Quantitative Researcher, Coers Corp" },
                { label: "Languages", value: "English & Spanish" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-surface border border-line rounded-sm p-5 hover:border-accent/50 transition-colors duration-200"
                >
                  <p className="font-mono text-accent text-[10px] tracking-[0.14em] uppercase mb-1.5">
                    {item.label}
                  </p>
                  <p className="text-ink text-sm font-medium">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Coursework */}
            <div className="bg-surface border border-line rounded-sm p-5 hover:border-accent/50 transition-colors duration-200">
              <p className="font-mono text-accent text-[10px] tracking-[0.14em] uppercase mb-2">
                Relevant Coursework
              </p>
              <p className="text-body text-sm leading-relaxed">
                Probability Theory · Mathematical Economics · Financial Economics · Numerical Analysis · Abstract Linear Algebra · Financial &amp; Managerial Accounting
              </p>
            </div>
          </div>
        </div>

        {/* Experience */}
        <div>
          <p className="font-mono text-accent text-xs tracking-[0.18em] uppercase mb-3">
            Experience
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-ink mb-10 leading-tight">
            Background
          </h2>

          <div className="flex flex-col gap-0">
            {experience.map((job, i) => (
              <div
                key={i}
                className="relative pl-8 pb-10 border-l border-line-strong last:border-transparent last:pb-0"
              >
                {/* Timeline marker */}
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-accent" />

                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <div>
                    <span className="text-ink font-semibold">{job.company}</span>
                    <span className="text-muted mx-2">·</span>
                    <span className="text-accent text-sm font-medium">{job.role}</span>
                  </div>
                  <span className="font-mono text-muted text-xs tracking-wide">{job.period}</span>
                </div>

                <ul className="flex flex-col gap-1.5 mt-2">
                  {job.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
                      <span className="w-1 h-1 bg-accent flex-shrink-0 mt-2" />
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
