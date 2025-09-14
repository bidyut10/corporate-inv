import React from "react";
import InvoiceHeader from "../components/pdf/InvoiceHeader";
import PaymentSection from "../components/pdf/PaymentSection";
import ThankyouSection from "../components/pdf/ThankyouSection";
import NotesOrTermsSection from "../components/pdf/NotesOrTermsSection";
import ItemsSection from "../components/pdf/ItemsSection";
import CalculationSection from "../components/pdf/CalculationSection";
import BillingSection from "../components/pdf/BillingSection";
import InvoiceEditor from "../components/editor/InvoiceEditor";
import { useInvoice } from "../components/editor/InvoiceDataService";
import Sidebar from "./Sidebar";

const PdfInvoice = () => {
  const { invoiceData, logoImage, signatureImage } = useInvoice();

  // Create the data structures that your existing components expect
  const invoice = {
    invoiceNumber: invoiceData.invoiceNumber,
    serialNumber: invoiceData.serialNumber,
    issueDate: invoiceData.issueDate,
    dueDate: invoiceData.dueDate,
    currency: invoiceData.currency,
  };

  const details = {
    sender: {
      header: "From",
      name: invoiceData.billedBy.name,
      contact: invoiceData.billedBy.contact,
      address: invoiceData.billedBy.address,
    },
    receiver: {
      header: "To",
      name: invoiceData.billedTo.name,
      contact: invoiceData.billedTo.contact,
      address: invoiceData.billedTo.address,
    },
  };

  const product = {
    items: invoiceData.items,
    tax: invoiceData.tax,
    symbol: invoiceData.symbol,
  };

  // Transform payment data to match PaymentSection expectations
  const payment = invoiceData.payment.map((item) => ({
    [item.label]: item.value,
  }));

  // Default logo fallback
  const defaultLogo =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3Mjg2Ij5MT0dPPC90ZXh0Pgo8L3N2Zz4K";

  const defaultSignature =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNkI3Mjg2Ij5TaWduYXR1cmU8L3RleHQ+Cjwvc3ZnPgo=";

  return (
    <div className="flex w-full min-h-screen bg-white">
      <div className="w-[17%]">
      <Sidebar />

      </div>
      <div className="w-[40%]">

      {/* Left Side - Invoice Editor */}
      <InvoiceEditor />
      </div>

      {/* Right Side - PDF Preview */}
      <div className="w-[43%] max-h-screen py-6 bg-neutral-50/50 overflow-y-auto text-xs">
        <div className="bg-white shadow-lg max-w-[595px] mx-auto">
          <div className="w-[595px] h-[842px] bg-white text-black font-sans text-sm p-6">
            <div className="pb-3">
              <h1 className="text-xl font-normal uppercase text-neutral-800">
                Invoice {invoice.invoiceNumber}
              </h1>
            </div>

            {/* Enhanced Invoice Header with Custom Fields */}
            <InvoiceHeader
              logo={logoImage || defaultLogo}
              invoice={invoice}
              customFields={invoiceData.customFields.basic}
            />

            <BillingSection
              sender={details.sender}
              receiver={details.receiver}
              customFields={invoiceData.customFields}
            />

            <ItemsSection product={product} />

            <CalculationSection product={product} />

            <PaymentSection
              payment={payment}
              signature={signatureImage || defaultSignature}
              text={invoiceData.signatureText}
            />

            <NotesOrTermsSection
              title={invoiceData.termsSection.title}
              text={invoiceData.termsSection.text}
            />

            <ThankyouSection
              title={invoiceData.thankyouSection.title}
              text={invoiceData.thankyouSection.text}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfInvoice;