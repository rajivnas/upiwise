---
title: "Sentiment Analysis on Earnings Calls"
date: "2024-04-08"
category: "Quant Research"
excerpt: "BERT fine-tuning for market-moving signals"
---

## Fine-Tuning Approach

```python
from transformers import BertForSequenceClassification
model = BertForSequenceClassification.from_pretrained(
    'bert-base-uncased',
    num_labels=3)  # [negative, neutral, positive]
```
