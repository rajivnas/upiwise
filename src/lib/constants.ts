import { TransactionCategory } from "@/types/transaction";

export const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const CATEGORY_COLORS = {
  [TransactionCategory.FOOD_DELIVERY]: "#f59e0b",
  [TransactionCategory.MOBILE_RECHARGE]: "#3b82f6",
  [TransactionCategory.BILL_PAYMENT]: "#10b981",
  [TransactionCategory.MONEY_TRANSFER]: "#8b5cf6",
  [TransactionCategory.RENT_PAYMENT]: "#ef4444",
  [TransactionCategory.ONLINE_SHOPPING]: "#ec4899",
  [TransactionCategory.TRANSPORTATION]: "#f97316",
  [TransactionCategory.ENTERTAINMENT]: "#d946ef",
  [TransactionCategory.INVESTMENTS]: "#22c55e",
  [TransactionCategory.OTHERS]: "#64748b",
} satisfies Record<TransactionCategory, string>;
