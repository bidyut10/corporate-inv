import React, { useState, useCallback } from "react";
import { useReceipt } from "./ReceiptDataService";
import ImageEditor from "../../invoice/editor/ImageEditor";
import PaymentEditor from "../../invoice/editor/PaymentEditor";
import FooterEditor from "../../invoice/editor/FooterEditor";
import AdditionalInfoEditor from "../../invoice/editor/AdditionalInfoEditor";
import ReceiptBasicInfoEditor from "./ReceiptBasicInfoEditor";
import CompanyEditor from "../../invoice/editor/CompanyEditor";
import ClientEditor from "../../invoice/editor/ClientEditor";
import ItemsEditor from "../../invoice/editor/ItemsEditor";
import { ArrowDownToLine, Loader, CheckCircle, XCircle } from "lucide-react";
import { downloadReceiptPDF } from "../utils/index";

const ReceiptEditor = () => {
  const {
    receiptData,
    logoImage,
    signatureImage,
    currency,
    themes,
    updateBasicInfo,
    updateCurrency,
    updateTheme,
    updateBilledBy,
    updateBilledTo,
    addCustomField,
    updateCustomField,
    removeCustomField,
    updateItem,
    addItem,
    removeItem,
    updatePayment,
    addPaymentField,
    removePaymentField,
    updateTermsSection,
    updateThankyouSection,
    updateSignatureText,
    updateTax,
    updateReceivedAmount,
    uploadLogo,
    uploadSignature,
    removeLogo,
    removeSignature,
  } = useReceipt();

  const [openSections, setOpenSections] = useState({
    basic: true,
    company: false,
    client: false,
    images: false,
    items: false,
    payment: false,
    terms: false,
    thanks: false,
  });

  const [downloadState, setDownloadState] = useState({
    isLoading: false,
    success: false,
    error: null,
  });

  const inputClass =
    "w-full text-xs px-3 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:border-cyan-500";
  const labelClass = "text-[10px] text-neutral-500";
  const buttonClass =
    "flex justify-center items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer w-full";
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const [editingStates, setEditingStates] = useState({});
  const toggleEdit = useCallback((key) => {
    if (!key) return;
    setEditingStates((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleFileUpload = (type, file) => {
    if (type === "logo") {
      uploadLogo(file);
    } else if (type === "signature") {
      uploadSignature(file);
    }
  };

  const renderCurrencyOption = (c) => (
    <div className="flex items-center gap-2">
      <span className="text-sm">{c.flag}</span>
      <span className="text-xs">{c.code}</span>
      <span className="text-neutral-500 text-xs">{c.symbol}</span>
    </div>
  );

  const renderSelectedCurrency = (currencyCode) => {
    const country = currency.countries.find((c) => c.code === currencyCode);
    return country ? (
      <div className="flex items-center gap-2">
        <span className="text-sm">{country.flag}</span>
        <span className="text-xs">{country.code}</span>
        <span className="text-neutral-500 text-xs">{country.symbol}</span>
      </div>
    ) : (
      currencyCode || ""
    );
  };

  const handleDownloadPDF = async () => {
    setDownloadState({ isLoading: true, success: false, error: null });
    try {
      await downloadReceiptPDF(receiptData, "receipt", logoImage, signatureImage);
      setDownloadState({ isLoading: false, success: true, error: null });
      setTimeout(() => setDownloadState({ isLoading: false, success: false, error: null }), 2000);
    } catch (err) {
      setDownloadState({ isLoading: false, success: false, error: err.message || "Failed" });
    }
  };

  return (
    <div className="w-full px-4 py-6 bg-white overflow-y-auto">
      <div className="flex justify-end w-full items-center px-4 pb-4 border-b border-dashed border-neutral-100">
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleDownloadPDF}
            disabled={downloadState.isLoading}
            className={`bg-gradient-to-br from-blue-600 to-blue-700 pl-1.5 pr-2 py-1.5 rounded-sm relative flex justify-center items-center overflow-hidden text-white gap-2 cursor-pointer transition-all duration-200 min-w-[140px] ${
              downloadState.isLoading
                ? "opacity-75 cursor-not-allowed"
                : downloadState.success
                ? "from-green-400 to-green-500"
                : downloadState.error
                ? "from-red-400 to-red-500"
                : "hover:from-blue-500 hover:to-blue-600"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            {downloadState.isLoading ? (
              <Loader size={14} className="animate-spin" />
            ) : downloadState.success ? (
              <CheckCircle size={14} />
            ) : downloadState.error ? (
              <XCircle size={14} />
            ) : (
              <ArrowDownToLine size={14} />
            )}
            <span className="text-sm font-mono relative z-10">
              {downloadState.isLoading
                ? "Generating..."
                : downloadState.success
                ? "Downloaded!"
                : downloadState.error
                ? "Error"
                : "Download PDF"}
            </span>
          </button>
          {downloadState.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 max-w-xs">
              <p className="text-xs text-red-700 whitespace-pre-line">{downloadState.error}</p>
            </div>
          )}
          {downloadState.success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 max-w-xs">
              <p className="text-xs text-green-700">PDF downloaded successfully! File size optimized for sharing.</p>
            </div>
          )}
        </div>
      </div>

      <ReceiptBasicInfoEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        receiptData={receiptData}
        updateBasicInfo={updateBasicInfo}
        currency={currency}
        updateCurrency={updateCurrency}
        themes={themes}
        buttonClass={buttonClass}
        renderCurrencyOption={renderCurrencyOption}
        renderSelectedCurrency={renderSelectedCurrency}
        updateTheme={updateTheme}
        addCustomField={addCustomField}
        updateCustomField={updateCustomField}
        removeCustomField={removeCustomField}
      />

      <CompanyEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={receiptData}
        buttonClass={buttonClass}
        updateBilledBy={updateBilledBy}
        addCustomField={addCustomField}
        updateCustomField={updateCustomField}
        removeCustomField={removeCustomField}
      />

      <ClientEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={receiptData}
        buttonClass={buttonClass}
        updateBilledTo={updateBilledTo}
        addCustomField={addCustomField}
        updateCustomField={updateCustomField}
        removeCustomField={removeCustomField}
      />

      <ImageEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={receiptData}
        logoImage={logoImage}
        signatureImage={signatureImage}
        removeLogo={removeLogo}
        removeSignature={removeSignature}
        updateSignatureText={updateSignatureText}
        handleFileUpload={handleFileUpload}
      />

      <ItemsEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={receiptData}
        editingStates={editingStates}
        updateTax={updateTax}
        buttonClass={buttonClass}
        updateItem={updateItem}
        addItem={addItem}
        removeItem={removeItem}
      />

      <PaymentEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={receiptData}
        updatePayment={updatePayment}
        addPaymentField={addPaymentField}
        removePaymentField={removePaymentField}
        updateSignatureText={updateSignatureText}
      />

      <AdditionalInfoEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={receiptData}
        updateTermsSection={updateTermsSection}
        updateThankyouSection={updateThankyouSection}
      />

      <FooterEditor
        openSections={openSections}
        toggleSection={toggleSection}
        toggleEdit={toggleEdit}
        invoiceData={receiptData}
        labelClass={labelClass}
        updateThankyouSection={updateThankyouSection}
        inputClass={inputClass}
      />
    </div>
  );
};

export default ReceiptEditor;


