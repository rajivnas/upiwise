---
title: "Monte Carlo VAR Calculation"
date: "2024-04-10"
category: "Risk Management"
excerpt: "Numerical methods for value-at-risk estimation"
---

## Simulation Setup

```python
import numpy as np
returns = np.random.normal(mu, sigma, (10000, n_assets))
portfolio_returns = returns @ weights
var_95 = np.percentile(portfolio_returns, 5)
```
