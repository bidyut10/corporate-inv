import React, { useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { InvoiceProvider } from "./components/invoice/editor/InvoiceDataService";
import PdfInvoice from "./components/invoice/PdfInvoice";
import { ReceiptProvider } from "./components/receipt";
import { default as PdfReceipt } from "./components/receipt/Receipt";
import Hero from "./components/home/Hero";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("invoice");

  const handleSelect = (view) => setActiveView(view);

  const handleNavigate = () => {
    navigate("/documents");
  };

  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Hero onNavigate={handleNavigate} />} />

      {/* Documents Page */}
      <Route
        path="/documents"
        element={
          activeView === "invoice" ? (
            <InvoiceProvider>
              <PdfInvoice onSelect={handleSelect} />
            </InvoiceProvider>
          ) : (
            <ReceiptProvider>
              <PdfReceipt onSelect={handleSelect} />
            </ReceiptProvider>
          )
        }
      />
    </Routes>
  );
}

export default App;
