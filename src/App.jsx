import React, { useState } from "react";
import { InvoiceProvider } from "./components/editor/InvoiceDataService";
import PdfInvoice from "./components/Pdf"; 
import { ReceiptProvider } from "./components/receipt";
import { default as PdfReceipt } from "./components/receipt/Receipt";
import "./App.css";
function App() {
  const [activeView, setActiveView] = useState('invoice');
  const handleSelect = (view) => setActiveView(view);
  return (
    <div className="App">
      {activeView === 'invoice' ? (
        <InvoiceProvider>
          <PdfInvoice onSelect={handleSelect} />
        </InvoiceProvider>
      ) : (
        <ReceiptProvider>
          <PdfReceipt onSelect={handleSelect} />
        </ReceiptProvider>
      )}
    </div>
  );
}

export default App;
