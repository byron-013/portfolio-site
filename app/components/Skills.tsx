type SkillGroup = {
  category: string;
  icon: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "{ }",
    skills: ["Python", "SQL", "C/C++", "TypeScript"],
  },
  {
    category: "Quantitative Finance",
    icon: "◈",
    skills: [
      "Modern Portfolio Theory",
      "Monte Carlo Simulation",
      "Credit Risk Modeling",
      "Options & Vol Surfaces",
      "VaR / CVaR",
      "Sharpe Ratio Analysis",
    ],
  },
  {
    category: "ML & Statistics",
    icon: "∑",
    skills: ["scikit-learn", "XGBoost", "SHAP", "NumPy", "pandas", "NLTK", "Gibbs Sampling"],
  },
  {
    category: "Data Engineering",
    icon: "⇉",
    skills: ["ETL Pipeline Design", "SQLite", "Parquet", "Databricks", "Data Validation"],
  },
  {
    category: "Tools & Web",
    icon: "</>",
    skills: ["Git", "Jupyter", "Streamlit", "Plotly", "React", "Next.js"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-surface border-y border-line">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-accent text-xs tracking-[0.18em] uppercase mb-3">
          03 / Toolkit
        </p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-ink mb-14 leading-tight">
          Skills &amp; competencies
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-paper border border-line rounded-sm p-6 hover:border-accent/50 transition-colors duration-200"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-accent text-lg font-mono font-semibold">{group.icon}</span>
                <h3 className="text-ink font-semibold text-sm tracking-wide">
                  {group.category}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2.5 text-sm text-body">
                    <span className="w-1 h-1 bg-accent flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
