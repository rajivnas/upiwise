---
title: "Constrained Portfolio Optimization with CVXPY"
date: "2024-04-07"
category: "Investment"
excerpt: "Quadratic programming for efficient frontiers"
---

## Optimization Problem

```python
import cvxpy as cp
weights = cp.Variable(n_assets)
risk = cp.quad_form(weights, Sigma)
prob = cp.Problem(cp.Minimize(risk),
                 [cp.sum(weights) == 1,
                  weights >= 0])
```
