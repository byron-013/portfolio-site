export type ProjectCategory = "finance-risk" | "machine-learning" | "applied-mathematics";

export type ProjectMetric = {
  value: string;
  label: string;
};

export type TechItem = {
  name: string;
  group: string;
};

export type InteractiveWidget = "EfficientFrontier" | "CreditRiskScorer";

export type CaseStudy = {
  problem: string;
  approach: string;
  decision: string;
  result: string;
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
  interactiveWidget?: InteractiveWidget;
  caseStudy?: CaseStudy;
};

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "finance-risk", label: "Finance & Risk" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "applied-mathematics", label: "Applied Mathematics" },
];

export const projects: Project[] = [
  {
    slug: "vega-lab",
    title: "vega-lab — Options Volatility Analytics Engine",
    shortTitle: "vega-lab",
    category: "finance-risk",
    tagline:
      "Live implied-volatility surfaces from raw options data — a native C++ Jäckel solver, arbitrage-free eSSVI calibration, and full smile diagnostics across SPX, VIX, SPY, QQQ, ES, and OEX, surfaced through a terminal UI and a web dashboard.",
    description:
      "A vertically integrated derivatives analytics engine for quant research. Databento OPRA options data is ingested into Parquet, solved for implied volatility by a native C++ Jäckel (\"Let's Be Rational\") solver with OpenMP batch parallelism, and fitted to arbitrage-free eSSVI surfaces. Per-expiry forwards and discount factors are recovered by an inverse-spread-weighted put-call parity regression. Results are exposed through a Textual terminal UI, a Dash/Plotly web dashboard, and a headless CSV/Parquet export mode.",
    keyMetrics: [
      { value: "8.2M", label: "Contracts / Second" },
      { value: "8", label: "Per-Tenor Diagnostics" },
      { value: "6", label: "Underlyings (SPX/VIX/ES...)" },
      { value: "3", label: "Output Modes (TUI/Web/Export)" },
    ],
    technicalApproach: [
      {
        heading: "Native C++ Implied-Volatility Solver",
        body: "The Jäckel rational-function method (\"Let's Be Rational\") is implemented in C++17, compiled with -O3 -march=native and OpenMP, and exposed to Python via zero-copy ctypes over NumPy arrays. Scalar and batch entry points converge in two or three iterations per contract; the batch path processes roughly 8.2 million contracts per second across the full chain, feeding surface fitting directly.",
      },
      {
        heading: "Arbitrage-Free eSSVI Calibration",
        body: "Surfaces use the extended SSVI parameterization fitted by a nested optimizer — an outer L-BFGS-B pass over the global (η, γ, ρ) parameters wraps an inner per-slice θ solve, parallelized across expiries. Butterfly (convexity) and calendar (non-decreasing total variance) no-arbitrage constraints enter as penalty terms, so fitted surfaces are arbitrage-free by construction.",
      },
      {
        heading: "Forward Extraction & Smile Diagnostics",
        body: "Per-expiry forwards and discount factors are recovered from a put-call parity regression weighted by inverse bid-ask spread, with an R² confidence score. Each tenor then yields eight diagnostics — ATM IV, 25-delta risk reversal, 25-delta butterfly, skew, a model-free variance-swap rate (trapezoidal integration of OTM prices), forward vol, IV spread, and fit R².",
      },
      {
        heading: "Data Pipeline, Terminal UI & Web Dashboard",
        body: "Databento OPRA data is fetched, validated, and stored as Parquet across a contract hierarchy spanning index, volatility-index, equity, and futures options (SPX, OEX, VIX, SPY, QQQ, ES). The Textual TUI offers tenor navigation, four coordinate modes (IV, total variance, σ², ATM term structure), series toggles, CSV export, and an arbitrage scanner; the Dash web UI adds a 3D surface viewer, eSSVI fit overlays, ag-Grid strike inspection, and a paginated arbitrage scan that flagged 189 violations (185 butterfly, 4 calendar) on SPY alone.",
      },
    ],
    techStack: [
      { name: "C++", group: "Language" },
      { name: "Python", group: "Language" },
      { name: "OpenMP", group: "Performance" },
      { name: "ctypes", group: "Bindings" },
      { name: "SciPy", group: "Optimization" },
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
      { label: "Terminal UI — ATM Term Structure", sublabel: "TUI home tab showing tenor list, ASCII term structure chart, stats grid, and strike table for SPY", imagePath: "/demos/vega-lab/tui_term_structure.png" },
      { label: "Web — Volatility Smile + eSSVI Fit", sublabel: "Dash dashboard with smile plot, eSSVI fit overlay, stats grid, and strike table for SPY 2025-01-16", imagePath: "/demos/vega-lab/web_smile_fit.png" },
      { label: "Web — Smile Controls + Stats", sublabel: "Coordinate mode buttons, series toggles, ATM marker, export, and 8-metric stats grid", imagePath: "/demos/vega-lab/web_smile_controls.png" },
      { label: "Web — Surface Diagnostics", sublabel: "3D eSSVI surface, selected-tenor fit slice, residuals, parameter terms, and fit quality by tenor", imagePath: "/demos/vega-lab/web_surface_diagnostics.png" },
      { label: "Web — Strike Inspector", sublabel: "Strike table with per-row detail inspector showing moneyness, bid/ask IV, and validity status", imagePath: "/demos/vega-lab/web_strike_inspector.png" },
      { label: "Web — Arbitrage Scan", sublabel: "189 violations detected (185 butterfly, 4 calendar) with type, expiration, and constraint details", imagePath: "/demos/vega-lab/web_arbitrage_scan.png" },
    ],
    github: "https://github.com/byron-013/vega-lab",
    isPrivate: true,
    accessLink: "#contact",
    caseStudy: {
      problem:
        "Quants need a fast feedback loop between raw options market data and a usable volatility surface. Off-the-shelf tools either solve implied vol slowly in pure Python or hide the calibration behind a black box, leaving no way to inspect arbitrage violations strike by strike.",
      approach:
        "Built a vertically integrated stack: a native C++ Jäckel solver with OpenMP threading handles implied vol, Python wraps it via zero-copy ctypes, eSSVI surface fitting enforces no-arbitrage through penalty terms, and a Textual TUI plus a Dash/Plotly web dashboard surface the results. Databento OPRA data flows in through a managed Parquet pipeline, and forwards come from a spread-weighted parity regression.",
      decision:
        "Pushed the solver to native C++ rather than staying in NumPy. The Jäckel method is iterative and runs millions of times per session — keeping it in Python would have made the interactive dashboards unusable. The ctypes bridge takes minutes to write and pays for itself the first time you scan the full SPX chain.",
      result:
        "Roughly 8.2 million contracts per second through the solver, eight per-tenor diagnostics computed live, and 189 arbitrage violations flagged on SPY alone (185 butterfly, 4 calendar) in the first full-chain scan.",
    },
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
    interactiveWidget: "CreditRiskScorer",
    caseStudy: {
      // REVIEW: the "decision" paragraph is the one to make your own — pick the
      // call that actually mattered most when you were building this (SMOTE, the
      // model choice, the SHAP integration, etc.) and explain why.
      problem:
        "Lenders need credit models that are both predictive and auditable. Regulators require an explanation for every adverse decision, which rules out black-box ensembles unless you can attach feature-level reasoning to each score. The German Credit dataset adds a realistic twist: defaults are the minority class, so naive models just predict 'pay back' for everyone.",
      approach:
        "Trained three classifiers — Logistic Regression, Random Forest, and XGBoost — under cross-validated hyperparameter tuning. Engineered 20 raw features into 67 via interactions and polynomial terms, applied SMOTE to the training fold only (never the holdout), and attached SHAP explanations to the winning model for per-prediction attribution.",
      decision:
        "Picked Logistic Regression over the tree ensembles even though XGBoost is the default reach in credit work. On this dataset size the logistic generalized best (0.788 AUC vs. lower out-of-sample for the trees), and the regulatory story is far cleaner: every coefficient is a one-line explanation, and SHAP values reduce to signed feature contributions a credit officer can read.",
      result:
        "0.788 AUC on the holdout set with full SHAP attribution, deployed as a CLI for batch scoring. The interactive widget on this page runs the same logistic structure live so you can see how each feature pushes the default probability.",
    },
  },
  {
    slug: "stock-portfolio-pipeline",
    title: "Stock Portfolio Analysis Pipeline",
    shortTitle: "Portfolio Analysis Pipeline",
    category: "finance-risk",
    tagline: "Automated ETL + risk engine mapping the efficient frontier via a native C Monte Carlo kernel and an analytic SciPy optimizer.",
    description:
      "Automated ETL pipeline ingesting 2 years of equity and S&P 500 benchmark data into a normalized SQLite database. A native C Monte Carlo kernel and a SciPy SLSQP optimizer both solve for the efficient frontier, backed by a full risk engine — VaR, CVaR, Sortino ratio, drawdown, and beta/alpha against the market.",
    keyMetrics: [
      { value: "5,000", label: "Monte Carlo Simulations" },
      { value: "1.56", label: "Analytic Max-Sharpe" },
      { value: "8", label: "Financial Stocks Tracked" },
      { value: "C Kernel", label: "Native Monte Carlo Engine" },
    ],
    technicalApproach: [
      {
        heading: "ETL & Benchmark Ingestion",
        body: "Historical price data for 8 financial stocks and the SPY benchmark is pulled from Yahoo Finance into a normalized SQLite database, with retry/backoff, price validation, and incremental fetch so re-runs only pull new dates. The schema separates prices, returns, and portfolio holdings so analytics never touch the network path.",
      },
      {
        heading: "Native C Monte Carlo Kernel",
        body: "The efficient frontier's 5,000-portfolio simulation runs through a C kernel (xoshiro256+ RNG) called via a zero-copy ctypes bridge, with a vectorized NumPy implementation as an automatic fallback when the native library isn't built. A parity test holds both paths to the same result within 1e-12.",
      },
      {
        heading: "Analytic Optimization",
        body: "Alongside the Monte Carlo cloud, a SciPy SLSQP solver finds the exact long-only max-Sharpe and min-volatility portfolios rather than settling for the best random draw — it consistently beats the 5,000-portfolio simulation's best Sharpe ratio (1.56 analytic vs. 1.50 from the simulated cloud).",
      },
      {
        heading: "Quantitative Risk Engine",
        body: "A dedicated risk module computes historical and parametric VaR, CVaR/expected shortfall, max drawdown, Sortino ratio, and beta/alpha against SPY — each metric independently tested against known values, not just eyeballed against a chart.",
      },
    ],
    techStack: [
      { name: "Python", group: "Language" },
      { name: "C", group: "Language" },
      { name: "pandas", group: "Data" },
      { name: "NumPy", group: "Data" },
      { name: "SciPy", group: "Optimization" },
      { name: "ctypes", group: "Bindings" },
      { name: "SQLite", group: "Storage" },
      { name: "Streamlit", group: "Dashboard" },
      { name: "Plotly", group: "Dashboard" },
      { name: "matplotlib", group: "Visualization" },
      { name: "seaborn", group: "Visualization" },
      { name: "Yahoo Finance API", group: "Data Source" },
    ],
    galleryItems: [
      { label: "Efficient Frontier", sublabel: "5,000 simulated portfolios with Sharpe-optimal highlighted", imagePath: "/demos/stock-portfolio-pipeline/efficient_frontier.png" },
      { label: "Drawdown (Underwater Plot)", sublabel: "Portfolio's percentage decline from its running peak", imagePath: "/demos/stock-portfolio-pipeline/drawdown.png" },
      { label: "VaR / CVaR Tail Risk", sublabel: "Return distribution with historical VaR and expected shortfall marked", imagePath: "/demos/stock-portfolio-pipeline/var_tail.png" },
      { label: "Rolling Risk", sublabel: "21-day rolling volatility and 63-day rolling Sharpe, twin-axis", imagePath: "/demos/stock-portfolio-pipeline/rolling_risk.png" },
      { label: "Correlation Heatmap", sublabel: "Asset return correlations across the 8-stock universe", imagePath: "/demos/stock-portfolio-pipeline/correlation_heatmap.png" },
      { label: "Normalized Price History", sublabel: "All 8 stocks normalized to base 100 over 2 years", imagePath: "/demos/stock-portfolio-pipeline/price_history.png" },
    ],
    github: "https://github.com/byron-013/stock-portfolio-pipeline",
    interactiveWidget: "EfficientFrontier",
    caseStudy: {
      // REVIEW: the "decision" paragraph is generic; rewrite once you've actually
      // run the pipeline against a non-financial-sector universe and have a
      // concrete observation to anchor the call on.
      problem:
        "Modern Portfolio Theory is taught with closed-form min-variance solutions and a few neat illustrations, but real construction needs an honest view of the risk-return cloud — including all the suboptimal allocations a manager could land on if they wing it. Without that, a single 'optimal' portfolio looks correct in isolation but tells you nothing about how sensitive it is.",
      approach:
        "Built an end-to-end pipeline: pull two years of daily prices for 8 financial stocks from Yahoo Finance into a normalized SQLite schema, compute annualized returns and the covariance matrix in pandas, then run 5,000 Monte Carlo allocations in risk-return space to map the empirical frontier. Solved the analytical min-variance and max-Sharpe portfolios in closed form for comparison.",
      decision:
        "Stored prices and returns as separate tables instead of recomputing returns on every analysis run. The recompute path was cheap for 8 tickers but would have become the bottleneck the moment the universe grew. Normalizing the schema upfront kept the analytical layer SQL-native and made it trivial to swap in new tickers without touching the optimizer code.",
      result:
        "Full efficient frontier mapped across 5,000 portfolios and the Sharpe-optimal allocation identified analytically. The interactive widget on this page runs the same MPT math live in your browser — drag the risk-free rate slider and the max-Sharpe portfolio rebalances in real time.",
    },
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
