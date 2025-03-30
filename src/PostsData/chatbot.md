---
title: "Financial Chatbots with RAG Architecture"
date: "2024-04-06"
category: "FinTech"
excerpt: "Retrieval-Augmented Generation for compliance-safe responses"
---

## Knowledge Base Indexing

```python
from langchain.vectorstores import FAISS
db = FAISS.from_documents(docs, embeddings)
retriever = db.as_retriever(search_kwargs={"k":3})
```
