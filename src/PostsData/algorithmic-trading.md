---
title: "Reinforcement Learning for Market Making"
date: "2024-04-04"
category: "Quantitative Finance"
excerpt: "DQN implementation for optimal bid-ask spreads"
---

## Q-Learning Parameters

```python
class MarketMakerEnv(gym.Env):
    def __init__(self):
        self.action_space = spaces.Discrete(3)  # widen/hold/narrow
        self.observation_space = spaces.Box(low=0, high=1, shape=(10,))
```
