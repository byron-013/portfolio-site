export type ProjectCategory = "finance-risk" | "machine-learning" | "applied-mathematics";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type TechItem = {
  name: string;
  group: string;
};

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  tagline: string;
  description: string;
  keyMetrics: ProjectMetric[];
  technicalApproach: { heading: string; body: string }[];
  techStack: TechItem[];
  galleryItems: { label: string; sublabel: string; imagePath?: string }[];
  github: string;
  isPrivate?: boolean;
  accessLink?: string;
};

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "finance-risk", label: "Finance & Risk" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "applied-mathematics", label: "Applied Mathematics" },
];

export const projects: Project[] = [
  {
    slug: "ktrm",
    title: "kTRM — Options Analytics Engine",
    shortTitle: "kTRM",
    category: "finance-risk",
    tagline:
      "Intraday vol surface calibration, skew monitoring, and arbitrage detection across SPX, VIX, SPY, QQQ, ES, and OEX — built from a native C++ solver up through interactive dashboards.",
    description:
      "A private derivatives analytics engine built for quant research workflows. Databento options data is ingested into Parquet, solved for implied volatility via a native C++ Jaeckel solver with OpenMP parallelism, and fitted to arbitrage-aware eSSVI surfaces. The full pipeline is exposed through a Textual terminal UI, a Dash/Plotly web dashboard, and a headless CSV/Parquet export mode.",
    keyMetrics: [
      { value: "9,500+", label: "Contracts per Session" },
      { value: "8", label: "Per-Tenor Diagnostics" },
      { value: "6", label: "Underlyings (SPX/VIX/ES...)" },
      { value: "3", label: "Output Modes (TUI/Web/Export)" },
    ],
    technicalApproach: [
      {
        heading: "C++ Implied Volatility Solver",
        body: "The Jaeckel method is implemented in native C++ with OpenMP threading and exposed to Python via zero-copy ctypes bindings. The solver processes 9,500+ option contracts per session across the full chain, converting raw prices to implied volatilities that feed directly into surface fitting.",
      },
      {
        heading: "eSSVI Surface Calibration",
        body: "Fitted surfaces use the extended Surface SVI parameterization with penalty terms that enforce no-arbitrage constraints — butterfly and calendar spread violations are penalized during optimization. Each tenor produces 8 diagnostic metrics (ATM IV, 25-delta risk reversal, 25-delta butterfly, skew, variance swap level, forward vol, IV spread, and R²) plus residual plots.",
      },
      {
        heading: "Data Pipeline",
        body: "Databento L1 options market data is fetched, validated, and stored as Parquet files through an integrated download manager. The pipeline maintains a contract hierarchy across SPX, OEX, VIX, SPY, QQQ, and ES with automatic expiry resolution and forward price computation.",
      },
      {
        heading: "Terminal UI + Web Dashboard",
        body: "The Textual TUI supports tenor navigation, four coordinate modes (IV, total variance, sigma-squared, ATM term structure), bid/ask/mid series toggles, CSV export, and an autocompleting command bar. The Dash web UI adds interactive Plotly charts, a 3D surface viewer, eSSVI fit overlays, strike-level inspection via ag-Grid, and a paginated arbitrage scanner that flagged 189 violations (185 butterfly, 4 calendar) on SPY alone.",
      },
    ],
    techStack: [
      { name: "C++", group: "Language" },
      { name: "Python", group: "Language" },
      { name: "OpenMP", group: "Performance" },
      { name: "ctypes", group: "Bindings" },
      { name: "Textual", group: "TUI" },
      { name: "Rich", group: "TUI" },
      { name: "Dash", group: "Web" },
      { name: "Plotly", group: "Web" },
      { name: "ag-Grid", group: "Web" },
      { name: "Databento", group: "Data" },
      { name: "Polars", group: "Data" },
      { name: "NumPy", group: "Data" },
    ],
    galleryItems: [
      { label: "Terminal UI — ATM Term Structure", sublabel: "TUI home tab showing tenor list, ASCII term structure chart, stats grid, and strike table for SPY", imagePath: "/demos/ktrm/tui_term_structure.png" },
      { label: "Web — Volatility Smile + eSSVI Fit", sublabel: "Dash dashboard with smile plot, eSSVI fit overlay, stats grid, and strike table for SPY 2025-01-16", imagePath: "/demos/ktrm/web_smile_fit.png" },
      { label: "Web — Smile Controls + Stats", sublabel: "Coordinate mode buttons, series toggles, ATM marker, export, and 8-metric stats grid", imagePath: "/demos/ktrm/web_smile_controls.png" },
      { label: "Web — Surface Diagnostics", sublabel: "3D eSSVI surface, selected-tenor fit slice, residuals, parameter terms, and fit quality by tenor", imagePath: "/demos/ktrm/web_surface_diagnostics.png" },
      { label: "Web — Strike Inspector", sublabel: "Strike table with per-row detail inspector showing moneyness, bid/ask IV, and validity status", imagePath: "/demos/ktrm/web_strike_inspector.png" },
      { label: "Web — Arbitrage Scan", sublabel: "189 violations detected (185 butterfly, 4 calendar) with type, expiration, and constraint details", imagePath: "/demos/ktrm/web_arbitrage_scan.png" },
    ],
    github: "https://github.com/byron-013/kTRM",
    isPrivate: true,
    accessLink: "#contact",
  },
  {
    slug: "credit-risk-scoring",
    title: "Credit Risk Scoring & Loan Default Prediction",
    shortTitle: "Credit Risk Scoring",
    category: "finance-risk",
    tagline: "End-to-end ML pipeline predicting loan defaults with SHAP explainability and 0.788 AUC.",
    description:
      "End-to-end ML pipeline predicting loan defaults on the German Credit Dataset. Three classifiers compared (Logistic Regression, Random Forest, XGBoost), SMOTE for class balance, SHAP explanations for regulatory transparency, and feature engineering that expanded 20 raw features to 67. Includes a CLI for training and inference.",
    keyMetrics: [
      { value: "0.788", label: "Best AUC Score" },
      { value: "67", label: "Engineered Features" },
      { value: "3", label: "Models Compared" },
      { value: "SMOTE", label: "Class Imbalance Method" },
    ],
    technicalApproach: [
      {
        heading: "Dataset & Preprocessing",
        body: "The German Credit Dataset presents a realistic class imbalance — a common challenge in credit scoring. SMOTE (Synthetic Minority Oversampling Technique) was applied to the training set to ensure the model learned meaningful default patterns rather than simply predicting the majority class.",
      },
      {
        heading: "Feature Engineering",
        body: "Raw features were expanded from 20 to 67 through interaction terms, polynomial features, and domain-driven transformations. This expansion gave tree-based models additional signal while the logistic regression benefited from the interaction terms directly.",
      },
      {
        heading: "Model Comparison",
        body: "Three classifiers were trained and evaluated — Logistic Regression, Random Forest, and XGBoost — each with cross-validated hyperparameter tuning. Logistic Regression achieved the best generalization at 0.788 AUC, outperforming the more complex tree ensembles on this dataset size.",
      },
      {
        heading: "Explainability with SHAP",
        body: "SHAP (SHapley Additive exPlanations) values were computed for the best model to produce both global feature importance rankings and individual prediction explanations. In credit risk contexts, model interpretability is not optional — regulators require lenders to justify adverse decisions. SHAP provides that audit trail.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "scikit-learn", group: "ML" },
      { name: "XGBoost", group: "ML" },
      { name: "SHAP", group: "ML" },
      { name: "pandas", group: "Data" },
      { name: "NumPy", group: "Data" },
      { name: "SQLite", group: "Storage" },
    ],
    galleryItems: [
      { label: "ROC Curves", sublabel: "Logistic Regression vs. Random Forest vs. XGBoost", imagePath: "/demos/credit-risk-scoring/roc_curves.png" },
      { label: "SHAP Summary Plot", sublabel: "Global feature importance across all predictions", imagePath: "/demos/credit-risk-scoring/shap_summary.png" },
      { label: "Confusion Matrix", sublabel: "Best model classification results on holdout set", imagePath: "/demos/credit-risk-scoring/confusion_matrix_final.png" },
      { label: "Model Comparison", sublabel: "AUC and F1 across all three classifiers", imagePath: "/demos/credit-risk-scoring/model_comparison.png" },
      { label: "Feature Importance", sublabel: "Top features driving default predictions", imagePath: "/demos/credit-risk-scoring/feature_importance.png" },
      { label: "Risk Distribution", sublabel: "Predicted probability distribution by outcome", imagePath: "/demos/credit-risk-scoring/risk_distribution.png" },
    ],
    github: "https://github.com/byron-013/credit_risk_scoring",
  },
  {
    slug: "stock-portfolio-pipeline",
    title: "Stock Portfolio Analysis Pipeline",
    shortTitle: "Portfolio Analysis Pipeline",
    category: "finance-risk",
    tagline: "Automated ETL + Monte Carlo simulation mapping the efficient frontier across 5,000 portfolio allocations.",
    description:
      "Automated ETL pipeline ingesting 2 years of stock data from Yahoo Finance into SQLite. Portfolio optimization using Modern Portfolio Theory, Monte Carlo simulation of 5,000 allocations to map the efficient frontier, and Sharpe ratio optimization across 8 financial stocks.",
    keyMetrics: [
      { value: "5,000", label: "Monte Carlo Simulations" },
      { value: "2 yrs", label: "Equity Data Ingested" },
      { value: "8", label: "Financial Stocks Tracked" },
      { value: "MPT", label: "Optimization Framework" },
    ],
    technicalApproach: [
      {
        heading: "ETL Pipeline Design",
        body: "Historical price data for 8 financial stocks was pulled from Yahoo Finance and ingested into a normalized SQLite database through an automated pipeline. The schema tracks prices, returns, and computed statistics separately to support analytical queries without recomputation.",
      },
      {
        heading: "Modern Portfolio Theory Implementation",
        body: "Portfolio optimization was implemented from first principles using MPT — computing expected returns, the covariance matrix of asset returns, and portfolio variance analytically. This forms the mathematical foundation for the efficient frontier calculation.",
      },
      {
        heading: "Monte Carlo Simulation",
        body: "5,000 random portfolio weight allocations were simulated and plotted in risk-return space to map the efficient frontier empirically. Each simulation computes annualized return, volatility, and Sharpe ratio, allowing visual identification of the optimal risk-adjusted allocation.",
      },
      {
        heading: "Sharpe Ratio Optimization",
        body: "The Sharpe-optimal portfolio — the point on the efficient frontier with the highest risk-adjusted return — was identified from the simulation results. This is the standard metric used by portfolio managers to compare strategies on a risk-normalized basis.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "pandas", group: "Data" },
      { name: "NumPy", group: "Data" },
      { name: "SQLite", group: "Storage" },
      { name: "matplotlib", group: "Visualization" },
      { name: "seaborn", group: "Visualization" },
      { name: "Yahoo Finance API", group: "Data Source" },
    ],
    galleryItems: [
      { label: "Efficient Frontier", sublabel: "5,000 simulated portfolios with Sharpe-optimal highlighted", imagePath: "/demos/stock-portfolio-pipeline/efficient_frontier.png" },
      { label: "Correlation Heatmap", sublabel: "Asset return correlations across the 8-stock universe", imagePath: "/demos/stock-portfolio-pipeline/correlation_heatmap.png" },
      { label: "Normalized Price History", sublabel: "All 8 stocks normalized to base 100 over 2 years", imagePath: "/demos/stock-portfolio-pipeline/price_history.png" },
      { label: "Returns Distribution (AAPL)", sublabel: "Daily return histogram with normal distribution overlay", imagePath: "/demos/stock-portfolio-pipeline/returns_distribution_AAPL.png" },
    ],
    github: "https://github.com/byron-013/stock-portfolio-pipeline",
  },
  {
    slug: "personal-finance-analytics",
    title: "Personal Finance Analytics",
    shortTitle: "Personal Finance Analytics",
    category: "finance-risk",
    tagline: "Normalized SQLite database with 10 analytical modules covering budget variance, cash flow, and anomaly detection.",
    description:
      "Financial transaction analysis system generating 12 months of synthetic banking data stored in a 7-table normalized SQLite schema (3NF). 10 analytical SQL queries covering budget variance, cash flow projections, and anomaly detection, with state-specific tax brackets and cost-of-living adjustments for 10 US states.",
    keyMetrics: [
      { value: "12 mo", label: "Synthetic Data Generated" },
      { value: "7", label: "Database Tables (3NF)" },
      { value: "10", label: "Analytical Dimensions" },
      { value: "10", label: "US States Modeled" },
    ],
    technicalApproach: [
      {
        heading: "Schema Design",
        body: "The database was designed in Third Normal Form (3NF) to eliminate redundancy and ensure data integrity. Seven tables separate concerns cleanly — transactions, accounts, categories, budgets, tax parameters, cost-of-living indices, and monthly summaries — enabling complex joins without data anomalies.",
      },
      {
        heading: "Synthetic Data Generation",
        body: "Twelve months of realistic banking transactions were generated using Faker with domain-specific rules — realistic merchant names, seasonal spending patterns, and category distributions consistent with actual household finance behavior. This approach produced analytically meaningful data without requiring real financial records.",
      },
      {
        heading: "Analytical Modules",
        body: "Ten SQL-driven analytical modules were implemented: budget variance tracking, rolling cash flow projections, anomaly detection (transactions outside 2σ of category norms), savings rate analysis, and discretionary vs. fixed expense ratios — a suite that mirrors reporting found in personal finance platforms.",
      },
      {
        heading: "State-Specific Modeling",
        body: "Tax brackets and cost-of-living indices were parameterized for 10 US states, allowing the system to compute after-tax income and normalize spending patterns geographically. This demonstrates an understanding of how macroeconomic context affects individual financial analysis.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "SQL", group: "Language" },
      { name: "SQLite", group: "Storage" },
      { name: "pandas", group: "Data" },
      { name: "matplotlib", group: "Visualization" },
      { name: "seaborn", group: "Visualization" },
      { name: "Faker", group: "Data Generation" },
    ],
    galleryItems: [
      { label: "Spending Trends", sublabel: "Monthly spending over time by category", imagePath: "/demos/personal-finance-analytics/spending_trends.png" },
      { label: "Budget Variance Dashboard", sublabel: "Monthly actuals vs. budgeted by category", imagePath: "/demos/personal-finance-analytics/budget_variance.png" },
      { label: "Income vs. Expenses", sublabel: "Monthly income and expense comparison", imagePath: "/demos/personal-finance-analytics/income_vs_expenses.png" },
      { label: "Savings Rate", sublabel: "Rolling savings rate over 12 months", imagePath: "/demos/personal-finance-analytics/savings_rate.png" },
      { label: "Category Breakdown", sublabel: "Spending distribution across categories", imagePath: "/demos/personal-finance-analytics/category_breakdown.png" },
      { label: "Top Merchants", sublabel: "Highest-spend merchants by transaction volume", imagePath: "/demos/personal-finance-analytics/top_merchants.png" },
    ],
    github: "https://github.com/byron-013/personal_finance_analytics",
  },
  {
    slug: "lda-topic-modeling",
    title: "LDA Topic Modeling Algorithm",
    shortTitle: "LDA Topic Modeling",
    category: "machine-learning",
    tagline: "Latent Dirichlet Allocation implemented from scratch via Gibbs Sampling with perplexity-optimized hyperparameter search.",
    description:
      "Latent Dirichlet Allocation implemented from scratch using Gibbs Sampling — no library shortcuts. Accepts PDFs and CSVs, runs a full NLP preprocessing pipeline, and performs hyperparameter grid search optimized by perplexity scoring with topic visualizations.",
    keyMetrics: [
      { value: "Scratch", label: "Implementation Depth" },
      { value: "Gibbs", label: "Sampling Method" },
      { value: "Perplexity", label: "Optimization Metric" },
      { value: "PDF + CSV", label: "Input Formats Supported" },
    ],
    technicalApproach: [
      {
        heading: "Mathematical Foundation",
        body: "LDA models each document as a mixture of latent topics, and each topic as a distribution over vocabulary. The generative process assumes documents are produced by sampling topics from a Dirichlet prior, then sampling words from those topic distributions. Implementing this from scratch required deriving the full posterior update equations.",
      },
      {
        heading: "Gibbs Sampling",
        body: "Collapsed Gibbs Sampling was used for posterior inference — iteratively resampling the topic assignment for each word token given all other assignments. This is the standard approach for LDA when an exact solution is intractable, and implementing it directly demonstrates command of Bayesian inference mechanics.",
      },
      {
        heading: "NLP Preprocessing Pipeline",
        body: "A full preprocessing pipeline handles tokenization, stopword removal, lemmatization, and minimum frequency filtering before fitting. Both PDF documents (via pdfplumber) and CSV corpora are supported as inputs, making the tool applicable to a broad range of document analysis tasks.",
      },
      {
        heading: "Hyperparameter Search",
        body: "The Dirichlet concentration parameters α and β, along with the number of topics K, were tuned via grid search scored by perplexity on a held-out document set. Lower perplexity indicates better generalization — the model is less surprised by unseen documents under its learned topic structure.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "NumPy", group: "Data" },
      { name: "pandas", group: "Data" },
      { name: "NLTK", group: "NLP" },
      { name: "matplotlib", group: "Visualization" },
      { name: "pdfplumber", group: "Parsing" },
    ],
    galleryItems: [
      { label: "Topic-Word Distributions", sublabel: "Top 10 words per discovered topic", imagePath: "/demos/lda-topic-modeling/top_words_per_topic.png" },
      { label: "Document-Topic Matrix", sublabel: "Topic mixture proportions across the corpus", imagePath: "/demos/lda-topic-modeling/document_topic_heatmap.png" },
    ],
    github: "https://github.com/byron-013/LDA-Algorithm",
  },
  {
    slug: "linear-regression",
    title: "Linear Regression from Scratch",
    shortTitle: "Linear Regression",
    category: "machine-learning",
    tagline: "Single and multivariable linear regression built from first principles using only NumPy.",
    description:
      "Single and multivariable linear regression implemented from scratch in Python using only NumPy — no sklearn. Demonstrates deep understanding of the underlying mathematics relevant to quantitative modeling.",
    keyMetrics: [
      { value: "0", label: "External ML Libraries" },
      { value: "NumPy", label: "Only Dependency" },
      { value: "2", label: "Implementations (Single + Multi)" },
      { value: "Matrix", label: "Solution Method" },
    ],
    technicalApproach: [
      {
        heading: "Normal Equation",
        body: "The closed-form solution β = (XᵀX)⁻¹Xᵀy was implemented directly using NumPy matrix operations. This gives the exact least-squares solution and requires a solid grasp of linear algebra — matrix transposition, inversion, and the geometric interpretation of orthogonal projection.",
      },
      {
        heading: "Gradient Descent",
        body: "An iterative gradient descent implementation was also built, updating weights by the gradient of the mean squared error at each step. This implementation handles the learning rate, convergence criteria, and loss history tracking that practitioners deal with when closed-form solutions are computationally infeasible.",
      },
      {
        heading: "Why This Matters for Quant Work",
        body: "Linear regression is the foundation of factor models, risk attribution, and a large portion of quantitative strategy research. Building it from scratch demonstrates that the mathematical mechanics are understood — not just the sklearn API call. Every regularization technique, covariance estimate, and OLS assumption traces back to this foundation.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "NumPy", group: "Data" },
    ],
    galleryItems: [
      { label: "Single Variable Regression Fit", sublabel: "Observed data, fitted line, and true line", imagePath: "/demos/linear-regression/single_variable_linear_regression.png" },
      { label: "Residual Analysis", sublabel: "Residuals vs. predicted values for multivariate model", imagePath: "/demos/linear-regression/multivariate_residual_plot.png" },
      { label: "Actual vs. Predicted", sublabel: "Multivariate regression prediction accuracy", imagePath: "/demos/linear-regression/multivariate_actual_vs_predicted.png" },
      { label: "Estimated Coefficients", sublabel: "Bar chart of fitted regression coefficients", imagePath: "/demos/linear-regression/multivariate_coefficients.png" },
    ],
    github: "https://github.com/byron-013/python-linear-regression-functions",
  },
  {
    slug: "simulated-annealing",
    title: "Simulated Annealing — Traveling Salesman Problem",
    shortTitle: "Simulated Annealing (TSP)",
    category: "applied-mathematics",
    tagline: "Metaheuristic optimization applied to the NP-hard TSP — with direct parallels to portfolio rebalancing and execution optimization.",
    description:
      "Simulated annealing optimization algorithm applied to the Traveling Salesman Problem. Demonstrates applied mathematics and combinatorial optimization with direct relevance to financial execution and operational research.",
    keyMetrics: [
      { value: "NP-Hard", label: "Problem Class" },
      { value: "SA", label: "Algorithm Type" },
      { value: "Metaheuristic", label: "Optimization Category" },
      { value: "Tuned", label: "Temperature Schedule" },
    ],
    technicalApproach: [
      {
        heading: "Simulated Annealing Mechanics",
        body: "The algorithm begins at a high 'temperature,' accepting worse solutions probabilistically to escape local optima. As temperature decreases according to a cooling schedule, the acceptance probability drops and the search converges toward a near-optimal solution. The balance between exploration and exploitation is controlled entirely by the temperature schedule.",
      },
      {
        heading: "Temperature Schedule Design",
        body: "The cooling schedule — how quickly temperature decreases — was tuned empirically to balance solution quality against runtime. Too fast and the algorithm gets trapped in local optima; too slow and convergence takes prohibitively long. The final schedule was validated against known TSP benchmarks.",
      },
      {
        heading: "The TSP as a Benchmark",
        body: "The Traveling Salesman Problem is a standard benchmark for combinatorial optimization because it is easy to state, NP-hard to solve exactly, and produces visual results that make convergence behavior intuitive to inspect. A working SA implementation on TSP demonstrates the algorithm is correctly implemented.",
      },
      {
        heading: "Applications in Finance",
        body: "Simulated annealing and related metaheuristics are used in quantitative finance for portfolio rebalancing under transaction costs, optimal trade execution scheduling, and index replication. The combinatorial structure of these problems mirrors TSP — many discrete decisions with complex interdependencies and no tractable exact solution.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "NumPy", group: "Data" },
      { name: "Jupyter", group: "Environment" },
      { name: "matplotlib", group: "Visualization" },
    ],
    galleryItems: [
      { label: "TSP: Before & After", sublabel: "Greedy initial tour vs SA-optimized route — 14.5% shorter", imagePath: "/demos/simulated-annealing/sa_tsp_comparison.png" },
      { label: "Convergence Curve", sublabel: "Tour length decreasing over iterations as temperature cools", imagePath: "/demos/simulated-annealing/sa_convergence_curve.png" },
      { label: "Acceptance Probability", sublabel: "P = exp(−Δ/T) — how the algorithm trades exploration for exploitation", imagePath: "/demos/simulated-annealing/sa_acceptance_probability.png" },
      { label: "City Distance Matrix", sublabel: "Pairwise city distances with optimized tour path overlaid", imagePath: "/demos/simulated-annealing/sa_distance_matrix.png" },
    ],
    github: "https://github.com/byron-013/Simulated-Annealing",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const idx = projects.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
}
