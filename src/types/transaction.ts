export enum UpiApp {
  PHONEPE = "PhonePe",
  GPAY = "Google Pay",
  PAYTM = "Paytm",
  BHIM = "BHIM",
  AMAZON_PAY = "Amazon Pay",
  WHATSAPP_PAY = "WhatsApp Pay",
}

export type UpiAppColors = {
  [key in UpiApp]: string;
};

export const UPI_APP_COLORS: UpiAppColors = {
  [UpiApp.PHONEPE]: "#674AB3",
  [UpiApp.GPAY]: "#00897B",
  [UpiApp.PAYTM]: "#00B9F1",
  [UpiApp.BHIM]: "#FF6F61",
  [UpiApp.AMAZON_PAY]: "#FF9900",
  [UpiApp.WHATSAPP_PAY]: "#25D366",
} as const;

export enum TransactionCategory {
  FOOD_DELIVERY = "Food Delivery",
  MOBILE_RECHARGE = "Mobile Recharge",
  BILL_PAYMENT = "Bill Payment",
  MONEY_TRANSFER = "Money Transfer",
  RENT_PAYMENT = "Rent Payment",
  ONLINE_SHOPPING = "Online Shopping",
  TRANSPORTATION = "Transportation",
  ENTERTAINMENT = "Entertainment",
  INVESTMENTS = "Investments",
  OTHERS = "Others",
}

export type CategoryColors = {
  [key in TransactionCategory]: string;
};

export const CATEGORY_COLORS: CategoryColors = {
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
} as const;

export enum TransactionStatus {
  SUCCESS = "success",
  FAILED = "failed",
  PENDING = "pending",
  REFUNDED = "refunded",
}

export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string;
  timestamp: number;
  date: string;
  upiId: string;
  upiApp: UpiApp;
  merchant: string;
  amount: number;
  category: TransactionCategory;
  type: TransactionType;
  referenceId: string;
  status: TransactionStatus;
  note?: string;
  location: string;
  beneficiary?: string;
  device: string;
  ipAddress?: string;
  currency?: "INR";
  isRecurring?: boolean;
  isInternational?: boolean;
}

export type TransactionAnalysis = {
  totalSpent: number;
  successRate: number;
  mostUsedApp: UpiApp;
  categoryBreakdown: Record<TransactionCategory, number>;
  dailyAverage: number;
};

export const getColorForCategory = (category: TransactionCategory): string => {
  return CATEGORY_COLORS[category];
};

export const getColorForUpiApp = (app: UpiApp): string => {
  return UPI_APP_COLORS[app];
};
