import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import {
  Transaction,
  UpiApp,
  TransactionCategory,
  TransactionStatus,
} from "@/types/transaction";

const generateDummyTransactions = (): Transaction[] => {
  const now = Date.now();
  return [
    {
      id: uuidv4(),
      timestamp: now - 86400000 * 2,
      date: new Date(now - 86400000 * 2).toISOString(),
      upiId: "user123@oksbi",
      upiApp: UpiApp.PHONEPE,
      merchant: "Swiggy",
      amount: 450,
      category: TransactionCategory.FOOD_DELIVERY,
      type: "debit",
      referenceId: "SWIGGY239487",
      status: TransactionStatus.SUCCESS,
      location: "Bengaluru, KA",
      device: "OnePlus 9R Android 13",
      ipAddress: "203.34.189.12",
    },
    {
      id: uuidv4(),
      timestamp: now - 86400000 * 1,
      date: new Date(now - 86400000 * 1).toISOString(),
      upiId: "user123@ybl",
      upiApp: UpiApp.GPAY,
      merchant: "Amazon India",
      amount: 2499,
      category: TransactionCategory.ONLINE_SHOPPING,
      type: "debit",
      referenceId: "AMZNIN876543",
      status: TransactionStatus.SUCCESS,
      location: "Mumbai, MH",
      device: "iPhone 14 iOS 16",
      ipAddress: "182.65.239.01",
    },
    {
      id: uuidv4(),
      timestamp: now - 3600000 * 4,
      date: new Date(now - 3600000 * 4).toISOString(),
      upiId: "user123@axis",
      upiApp: UpiApp.PAYTM,
      merchant: "Jio Recharge",
      amount: 299,
      category: TransactionCategory.MOBILE_RECHARGE,
      type: "debit",
      referenceId: "JIORCH987654",
      status: TransactionStatus.FAILED,
      location: "Delhi, DL",
      device: "Samsung Galaxy S21",
      ipAddress: "120.89.45.67",
    },
    {
      id: uuidv4(),
      timestamp: now - 3600000 * 1,
      date: new Date(now - 3600000 * 1).toISOString(),
      upiId: "friend@icici",
      upiApp: UpiApp.WHATSAPP_PAY,
      merchant: "Rent Payment",
      amount: 15000,
      category: TransactionCategory.RENT_PAYMENT,
      type: "credit",
      referenceId: "RENT202309",
      status: TransactionStatus.PENDING,
      location: "Chennai, TN",
      device: "Google Pixel 6",
      ipAddress: "45.78.123.89",
    },
  ];
};

interface TransactionStore {
  transactions: Transaction[];
  isInitialized: boolean;
  initializeStore: () => Promise<void>;
  addUpiTransaction: (transaction: Transaction) => void;
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set, get) => ({
      transactions: [],
      isInitialized: false,

      initializeStore: async () => {
        const savedTransactions = localStorage.getItem("upi-transactions");

        if (!savedTransactions) {
          set({
            transactions: generateDummyTransactions(),
            isInitialized: true,
          });
        } else {
          set({
            transactions: JSON.parse(savedTransactions),
            isInitialized: true,
          });
        }
      },

      addUpiTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
    }),
    {
      name: "upi-transactions-storage",
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
