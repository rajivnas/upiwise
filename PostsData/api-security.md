---
title: "Financial API Security Standards"
date: "2024-04-20"
category: "Security"
excerpt: "Implementing RBI's API security guidelines for payment systems"
---

## Mandatory Requirements

- Mutual TLS authentication
- JWT expiration < 5 minutes
- HMAC request signing

```python
from fastapi import FastAPI
from fastapi.security import HTTPBearer

security = HTTPBearer()
app = FastAPI()

@app.post("/payment")
async def make_payment(token: str = Depends(security)):
    # Validate token
```
