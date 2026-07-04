import React from "react";
import { InvoiceProvider } from "../components/invoice/editor/InvoiceDataService";
import PdfInvoice from "../components/invoice/PdfInvoice";
import { ReceiptProvider } from "../components/receipt";
import PdfReceipt from "../components/receipt/Receipt";

export default function DocumentsPage({ activeView, onSelect }) {
  return activeView === "invoice" ? (
    <InvoiceProvider>
      <PdfInvoice onSelect={onSelect} />
    </InvoiceProvider>
  ) : (
    <ReceiptProvider>
      <PdfReceipt onSelect={onSelect} />
    </ReceiptProvider>
  );
}
