---
title: "Open Banking APIs in India"
date: "2024-05-10"
category: "Finance"
excerpt: "Analyzing RBI's Account Aggregator framework"
---

### Data Flow

1. User consent via mobile app
2. AES-256 encrypted data transfer
3. Audit logging with blockchain

```typescript
interface ConsentRequest {
  userId: string;
  dataTypes: string[];
  duration: number;
}
```
