type SkillGroup = {
  category: string;
  icon: string;
  skills: string[];
};

const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    icon: "{ }",
    skills: ["Python", "SQL", "TypeScript"],
  },
  {
    category: "ML & Data Science",
    icon: "∑",
    skills: ["scikit-learn", "XGBoost", "SHAP", "NumPy", "pandas", "NLTK", "Gibbs Sampling"],
  },
  {
    category: "Quantitative Finance",
    icon: "◈",
    skills: [
      "Modern Portfolio Theory",
      "Monte Carlo Simulation",
      "Credit Risk Modeling",
      "Portfolio Optimization",
      "Efficient Frontier",
      "Sharpe Ratio Analysis",
    ],
  },
  {
    category: "Tools & Platforms",
    icon: "⌬",
    skills: ["SQLite", "Git", "Jupyter", "matplotlib", "seaborn", "Databricks"],
  },
  {
    category: "Web",
    icon: "</>",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#d4a853] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Expertise</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-14 leading-tight">
          Skills &amp; Competencies
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-[#111827] border border-[#1a2235] rounded-lg p-6 hover:border-[#d4a853]/40 hover:shadow-[0_6px_24px_rgba(212,168,83,0.12)] hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[#d4a853] text-lg font-mono font-bold">{group.icon}</span>
                <h3 className="text-[#f0f4ff] font-semibold text-sm tracking-wide">
                  {group.category}
                </h3>
              </div>
              <ul className="flex flex-col gap-2">
                {group.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm text-[#aab8cc]">
                    <span className="w-1 h-1 rounded-full bg-[#d4a853] flex-shrink-0" />
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
