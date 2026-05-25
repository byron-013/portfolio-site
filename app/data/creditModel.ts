// Static logistic-regression scorecard for the Credit Risk Scorer widget.
//
// TODO — replace placeholders with the trained model from credit_risk_scoring.
// In the project notebook:
//
//   import joblib, json
//   model  = joblib.load("models/logreg.joblib")        # fitted LogisticRegression
//   scaler = joblib.load("models/scaler.joblib")        # fitted StandardScaler
//   feats  = list(model.feature_names_in_)
//   print("intercept =", float(model.intercept_[0]))
//   print("coefs =", dict(zip(feats, model.coef_[0].tolist())))
//   print("means =", dict(zip(feats, scaler.mean_.tolist())))
//   print("stds  =", dict(zip(feats, scaler.scale_.tolist())))
//
// Paste the values below. Feature order in FEATURES must match COEFFICIENTS.
// The widget standardizes raw inputs with the (mean, std) pair before applying
// the coefficient, exactly like StandardScaler in the training pipeline.

export type CreditFeature = {
  key: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  default: number;
  mean: number; // StandardScaler mean_
  std: number;  // StandardScaler scale_
  format?: (v: number) => string;
};

const usd0 = (v: number) => `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
const pct = (v: number) => `${v.toFixed(0)}%`;

export const FEATURES: CreditFeature[] = [
  {
    key: "annual_income",
    label: "Annual Income",
    unit: "USD",
    min: 20_000,
    max: 200_000,
    step: 1_000,
    default: 60_000,
    mean: 60_000,
    std: 30_000,
    format: usd0,
  },
  {
    key: "debt_to_income",
    label: "Debt-to-Income",
    unit: "%",
    min: 0,
    max: 80,
    step: 1,
    default: 35,
    mean: 35,
    std: 15,
    format: pct,
  },
  {
    key: "credit_utilization",
    label: "Credit Utilization",
    unit: "%",
    min: 0,
    max: 100,
    step: 1,
    default: 40,
    mean: 40,
    std: 25,
    format: pct,
  },
  {
    key: "delinquencies_2y",
    label: "Delinquencies (2y)",
    unit: "count",
    min: 0,
    max: 10,
    step: 1,
    default: 1,
    mean: 1,
    std: 1.5,
  },
  {
    key: "loan_amount",
    label: "Loan Amount",
    unit: "USD",
    min: 1_000,
    max: 50_000,
    step: 500,
    default: 15_000,
    mean: 15_000,
    std: 10_000,
    format: usd0,
  },
  {
    key: "employment_years",
    label: "Employment Years",
    unit: "yrs",
    min: 0,
    max: 30,
    step: 1,
    default: 5,
    mean: 5,
    std: 5,
  },
  {
    key: "open_credit_lines",
    label: "Open Credit Lines",
    unit: "count",
    min: 0,
    max: 25,
    step: 1,
    default: 8,
    mean: 8,
    std: 5,
  },
  {
    key: "credit_history_years",
    label: "Credit History",
    unit: "yrs",
    min: 0,
    max: 40,
    step: 1,
    default: 10,
    mean: 10,
    std: 7,
  },
];

// Logistic regression coefficients in standardized feature space
// (placeholder — see TODO above). Sign convention: positive = pushes default
// probability up, negative = pushes it down. Magnitudes are realistic for
// consumer credit defaults (delinquency history dominates, income & history
// length protective, DTI and utilization meaningfully predictive).
export const INTERCEPT = -1.0;

export const COEFFICIENTS: Record<string, number> = {
  annual_income:       -0.60,
  debt_to_income:      +0.90,
  credit_utilization:  +0.70,
  delinquencies_2y:    +1.20,
  loan_amount:         +0.30,
  employment_years:    -0.50,
  open_credit_lines:   +0.20,
  credit_history_years:-0.50,
};
