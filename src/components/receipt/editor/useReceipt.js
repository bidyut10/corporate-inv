import { useContext } from "react";
import { ReceiptContext } from "./receiptContext";

export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context) {
    throw new Error("useReceipt must be used within a ReceiptProvider");
  }
  return context;
};
