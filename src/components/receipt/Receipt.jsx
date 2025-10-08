import React, { useState } from "react";
import ReceiptEditor from "./editor/ReceiptEditor";
import { useReceipt } from "./editor/ReceiptDataService";
import Navbar from "../ui/Navbar";
import Sidebar from "../Sidebar";
import { EditIcon } from "lucide-react";
import ReceiptHeader from "./ReceiptHeader";
import BillingSection from "../pdf/BillingSection";
import ItemsSection from "../pdf/ItemsSection";
import CalculationSection from "../pdf/CalculationSection";
import ReceiptCalculationSection from "./ReceiptCalculationSection";
import PaymentSection from "../pdf/PaymentSection";
import NotesOrTermsSection from "../pdf/NotesOrTermsSection";
import ThankyouSection from "../pdf/ThankyouSection";

const PdfReceipt = ({ onSelect }) => {
  const { receiptData, logoImage, signatureImage } = useReceipt();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultLogo =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3Mjg2Ij5MT0dPPC90ZXh0Pgo8L3N2Zz4K";
  const defaultSignature =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRjNGNEY2Ii8+Cjx0ZXh0IHg9IjUwIiB5PSIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNkI3Mjg2Ij5TaWduYXR1cmU8L3RleHQ+Cjwvc3ZnPgo=";

  const handleMenuToggle = () => setIsMobileMenuOpen(true);
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  const invoice = {
    invoiceNumber: receiptData.receiptNumber,
    serialNumber: undefined,
    issueDate: receiptData.receiptDate,
    currency: receiptData.currency,
  };

  const details = {
    sender: {
      header: "From",
      name: receiptData.billedBy.name,
      contact: receiptData.billedBy.contact,
      address: receiptData.billedBy.address,
    },
    receiver: {
      header: "To",
      name: receiptData.billedTo.name,
      contact: receiptData.billedTo.contact,
      address: receiptData.billedTo.address,
    },
  };

  const product = { items: receiptData.items, tax: receiptData.tax, symbol: receiptData.symbol };
  const payment = receiptData.payment.map((item) => ({ [item.label]: item.value }));

  return (
    <div className="flex flex-col w-full xl:h-screen bg-white xl:overflow-hidden pt-16">
      <Navbar onMenuToggle={handleMenuToggle} onMenuClose={handleMenuClose} isMenuOpen={isMobileMenuOpen} />
      <div className="flex flex-col md:flex-row w-full flex-1 overflow-hidden">
        <div className="hidden xl:block xl:w-[17%] flex-shrink-0">
          <Sidebar active="receipt" onSelect={onSelect} />
        </div>
        {isMobileMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={handleMenuClose} style={{ top: "64px" }} />
            <div className="fixed left-0 w-full bg-white z-50 md:hidden shadow-lg transform transition-transform duration-300 ease-in-out" style={{ top: "64px", height: "calc(100vh - 64px)", position: "fixed" }}>
              <div className="h-full overflow-y-auto">
                <Sidebar active="receipt" onSelect={onSelect} />
              </div>
            </div>
          </>
        )}
        <div className="flex flex-col w-full xl:w-[83%] bg-white flex-1 xl:overflow-hidden">
          <div className="border-b border-dashed border-neutral-200 h-12 w-full flex-shrink-0 px-8 flex justify-start items-center gap-2">
            <EditIcon className="text-neutral-600" size={14} />
            <h1 className="text-neutral-600 text-sm"> Receipt Editor</h1>
          </div>
          <div className="flex flex-col xl:flex-row w-full flex-1 xl:overflow-hidden">
            <div className="w-full xl:w-[45%] xl:overflow-y-auto">
              <ReceiptEditor />
            </div>
            <div className="w-full xl:w-[55%] py-6 bg-neutral-50/50 xl:overflow-y-auto text-xs">
              <div className="bg-white shadow-lg max-w-[595px] mx-auto">
                <div className="w-[595px] h-[842px] bg-white text-black font-sans text-sm p-6">
                  <div className="pb-3">
                    <h1 className="text-xl font-normal uppercase text-neutral-800">Receipt {invoice.invoiceNumber}</h1>
                  </div>
                  <ReceiptHeader logo={logoImage || defaultLogo} receipt={{ receiptNumber: invoice.invoiceNumber, receiptDate: invoice.issueDate, currency: invoice.currency }} customFields={receiptData.customFields.basic} />
                  <BillingSection sender={{ ...details.sender, header: "Received By" }} receiver={{ ...details.receiver, header: "Received From" }} customFields={receiptData.customFields} />
                  <ItemsSection product={product} />
                  <ReceiptCalculationSection product={product} />
                  <PaymentSection payment={payment} signature={signatureImage || defaultSignature} text={receiptData.signatureText} />
                  <NotesOrTermsSection title={receiptData.termsSection.title} text={receiptData.termsSection.text} />
                  <ThankyouSection title={receiptData.thankyouSection.title} text={receiptData.thankyouSection.text} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfReceipt;


