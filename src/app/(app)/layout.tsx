"use client";

import { useEffect, useState } from "react";
import { useTransactionStore } from "@/stores/transactionStore";
import { LoadingScreen } from "@/components/loading";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const initializeStore = useTransactionStore((state) => state.initializeStore);

  useEffect(() => {
    const init = async () => {
      try {
        await initializeStore();
      } catch (error) {
        console.error("Failed to initialize store:", error);
      } finally {
        setIsMounted(true);
      }
    };
    init();
  }, [initializeStore]);

  if (!isMounted) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
