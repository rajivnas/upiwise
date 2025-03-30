---
title: "Explainable AI for Credit Risk Assessment"
date: "2024-04-03"
category: "Banking"
excerpt: "SHAP values for interpretable loan approvals"
---

## Model Interpretation Framework

```python
import shap
explainer = shap.TreeExplainer(xgboost_model)
shap_values = explainer.shap_values(X_test)

shap.summary_plot(shap_values, X_test)
```
