---
title: "Graph Neural Networks for AML Compliance"
date: "2024-04-05"
category: "RegTech"
excerpt: "Detecting suspicious transaction networks"
---

## Entity Resolution Architecture

```python
import stellargraph as sg
generator = sg.mapper.FullBatchNodeGenerator(G)
gcn = sg.layer.GCN(layer_sizes=[64, 32], generator=generator)
```
