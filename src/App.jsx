import React from "react";
import { InvoiceProvider } from "./components/editor/InvoiceDataService";
import PdfInvoice from "./components/Pdf"; 
import "./App.css";
function App() {
  return (
    <InvoiceProvider>
      <div className="App">
        <PdfInvoice />
      </div>
    </InvoiceProvider>
  );
}

export default App;
