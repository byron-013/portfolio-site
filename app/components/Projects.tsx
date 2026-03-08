type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
};

const projects: Project[] = [
  {
    title: "Credit Risk Scoring & Loan Default Prediction",
    description:
      "End-to-end ML pipeline predicting loan defaults on the German Credit Dataset. Implements three classifiers (Logistic Regression, Random Forest, XGBoost) with SHAP-based model explainability — critical for regulatory transparency in credit decisions. Feature engineering expanded the dataset from 20 to 67 variables, with SMOTE addressing class imbalance. Best model achieves 0.788 AUC.",
    tags: ["Python", "XGBoost", "SHAP", "scikit-learn", "SQLite", "pandas", "NumPy"],
    github: "https://github.com/byron-013/credit_risk_scoring",
  },
  {
    title: "Stock Portfolio Analysis Pipeline",
    description:
      "Automated ETL pipeline ingesting two years of equity data from Yahoo Finance into a normalized SQLite database, covering 8 financial stocks. Applies Modern Portfolio Theory and Monte Carlo simulation across 5,000 portfolio allocations to map the efficient frontier and identify the Sharpe ratio-optimal allocation — a workflow directly analogous to institutional portfolio construction.",
    tags: ["Python", "Modern Portfolio Theory", "Monte Carlo", "SQLite", "pandas", "NumPy", "matplotlib"],
    github: "https://github.com/byron-013/stock-portfolio-pipeline",
  },
  {
    title: "Personal Finance Analytics",
    description:
      "Financial transaction analysis system generating and analyzing 12 months of synthetic banking data stored in a 7-table normalized SQLite schema (3NF). Covers 10 analytical dimensions including budget variance analysis, cash flow projections, and anomaly detection, with state-specific tax brackets and cost-of-living adjustments for 10 US states.",
    tags: ["Python", "SQLite", "pandas", "matplotlib", "seaborn", "Faker"],
    github: "https://github.com/byron-013/personal_finance_analytics",
  },
  {
    title: "LDA Topic Modeling Algorithm",
    description:
      "Latent Dirichlet Allocation implemented from scratch using Gibbs Sampling — no high-level library shortcuts. Accepts PDFs and CSVs, runs a full NLP preprocessing pipeline, and performs hyperparameter grid search optimized by perplexity scoring. Demonstrates both the mathematical depth and engineering discipline expected in quantitative research roles.",
    tags: ["Python", "NumPy", "NLTK", "pandas", "matplotlib", "pdfplumber"],
    github: "https://github.com/byron-013/LDA-Algorithm",
  },
  {
    title: "Linear Regression from Scratch",
    description:
      "Single and multivariable linear regression implemented from first principles using only NumPy — no sklearn abstractions. Directly demonstrates mastery of the underlying matrix algebra and optimization mechanics that underpin most statistical and machine learning models used in quantitative finance.",
    tags: ["Python", "NumPy"],
    github: "https://github.com/byron-013/python-linear-regression-functions",
  },
  {
    title: "Simulated Annealing — Traveling Salesman Problem",
    description:
      "Simulated annealing optimization applied to the NP-hard Traveling Salesman Problem. Demonstrates practical command of metaheuristic optimization and combinatorial mathematics — disciplines with direct application to portfolio rebalancing, execution optimization, and operational research in financial contexts.",
    tags: ["Python", "NumPy", "Jupyter", "Optimization"],
    github: "https://github.com/byron-013/Simulated-Annealing",
  },
];

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs px-2.5 py-1 rounded bg-[#0a0f1e] border border-[#1a2235] text-[#94a3b8] font-medium tracking-wide">
      {label}
    </span>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-6 bg-[#090d1a]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase mb-3 font-medium">Work</p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#f0f4ff] mb-3 leading-tight">
          Selected Projects
        </h2>
        <p className="text-[#94a3b8] mb-14 max-w-xl">
          Quantitative and data science projects spanning credit risk, portfolio construction, NLP, and applied mathematics.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={i}
              className="bg-[#111827] border border-[#1a2235] rounded-lg p-6 flex flex-col hover:border-[#c9a84c]/30 hover:shadow-[0_0_24px_rgba(201,168,76,0.05)] transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-[#c9a84c]/40 text-4xl font-bold leading-none select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <svg
                  className="text-[#1a2235] group-hover:text-[#c9a84c]/30 transition-colors duration-300"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>

              <h3 className="text-[#f0f4ff] font-semibold text-base mb-3 leading-snug">
                {project.title}
              </h3>
              <p className="text-[#94a3b8] text-sm leading-relaxed mb-5 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} label={tag} />
                ))}
              </div>

              <div className="flex gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs py-2 px-3 border border-[#c9a84c] text-[#c9a84c] rounded hover:bg-[#c9a84c] hover:text-[#0a0f1e] transition-all duration-200 font-medium tracking-wide"
                >
                  View Code
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center text-xs py-2 px-3 border border-[#1a2235] text-[#94a3b8] rounded hover:border-[#94a3b8] hover:text-[#f0f4ff] transition-all duration-200 font-medium tracking-wide"
                >
                  Request Access
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
