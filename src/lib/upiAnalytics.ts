import { Transaction } from "@/types/transaction";

export const generateUpiInsights = (transactions: Transaction[]): string[] => {
  const insights = [];

  if (transactions.length === 0) {
    return ["No transactions found. Start using UPI to see insights!"];
  }

  const hourlySpending = Array(24).fill(0);
  transactions.forEach((t) => {
    const hour = new Date(t.timestamp).getHours();
    hourlySpending[hour] += t.amount;
  });
  const peakHour = hourlySpending.indexOf(Math.max(...hourlySpending));
  insights.push(`Peak transaction time: ${peakHour}:00 - ${peakHour + 1}:00`);

  const appCounts = transactions.reduce((acc, t) => {
    acc[t.upiApp] = (acc[t.upiApp] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostUsedApp = Object.entries(appCounts).sort((a, b) => b[1] - a[1])[0];
  if (mostUsedApp) {
    insights.push(
      `You use ${mostUsedApp[0]} for ${(
        (mostUsedApp[1] / transactions.length) *
        100
      ).toFixed(0)}% of transactions`
    );
  }

  const successCount = transactions.filter(
    (t) => t.status === "success"
  ).length;
  const successRate = (successCount / transactions.length) * 100;
  insights.push(`Transaction success rate: ${successRate.toFixed(1)}%`);

  return insights;
};
