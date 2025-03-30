---
title: "Unsupervised Anomaly Detection in Treasury Flows"
date: "2024-04-09"
category: "Corporate Banking"
excerpt: "Isolation forests for cash flow monitoring"
---

## Implementation

```python
from pyod.models.iforest import IForest
clf = IForest(contamination=0.01, n_estimators=200)
clf.fit(X_train)
scores = clf.decision_function(X_test)
```
