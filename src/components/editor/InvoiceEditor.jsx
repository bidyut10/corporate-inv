import React, { useState, useCallback } from "react";
import { useInvoice } from "./InvoiceDataService";
import ImageEditor from "./ImageEditor";
import PaymentEditor from "./PaymentEditor";
import FooterEditor from "./FooterEditor";
import AdditionalInfoEditor from "./AdditionalInfoEditor";
import BasicInfoEditor from "./BasicInfoEditor";
import CompanyEditor from "./CompanyEditor";
import ClientEditor from "./ClientEditor";
import ItemsEditor from "./ItemsEditor";
import {
  ArrowDownToLine,
  Plus,
  Save,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import generateInvoicePDF from "../utils/generateInvoicePDF";

const InvoiceEditor = () => {
  const {
    invoiceData,
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
    uploadLogo,
    uploadSignature,
    removeLogo,
    removeSignature,
  } = useInvoice();

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
    "w-full text-xs px-3 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:border-orange-500";
  const labelClass = "block text-xs font-medium text-neutral-700 mb-1";
  const buttonClass =
    "flex justify-center items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer w-full";
  const [editingStates, setEditingStates] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const toggleEdit = (section) => {
    setEditingStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFileUpload = (type, file) => {
    if (type === "logo") {
      uploadLogo(file);
    } else {
      uploadSignature(file);
    }
  };

  // Validation function
  const validateInvoiceData = useCallback(() => {
    const errors = [];

    if (!invoiceData.invoiceNumber?.trim()) {
      errors.push("Invoice number is required");
    }

    if (!invoiceData.billedBy?.name?.trim()) {
      errors.push("Company name is required");
    }

    if (!invoiceData.billedTo?.name?.trim()) {
      errors.push("Client name is required");
    }

    if (!invoiceData.items || invoiceData.items.length === 0) {
      errors.push("At least one item is required");
    } else {
      invoiceData.items.forEach((item, index) => {
        if (!item.name?.trim()) {
          errors.push(`Item ${index + 1} name is required`);
        }
        if (!item.price || item.price <= 0) {
          errors.push(`Item ${index + 1} must have a valid price`);
        }
        if (!item.qty || item.qty <= 0) {
          errors.push(`Item ${index + 1} must have a valid quantity`);
        }
      });
    }

    return errors;
  }, [invoiceData]);

  // Enhanced PDF Download Handler with validation and better error handling
  const handleDownloadPDF = useCallback(async () => {
    if (downloadState.isLoading) return;

    // Reset states
    setDownloadState({
      isLoading: false,
      success: false,
      error: null,
    });

    // Validate data
    const validationErrors = validateInvoiceData();
    if (validationErrors.length > 0) {
      setDownloadState({
        isLoading: false,
        success: false,
        error: `Please fix the following issues:\n• ${validationErrors.join(
          "\n• "
        )}`,
      });
      return;
    }

    setDownloadState((prev) => ({ ...prev, isLoading: true }));

    try {
      // Add small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      await generateInvoicePDF(invoiceData, logoImage, signatureImage);

      setDownloadState({
        isLoading: false,
        success: true,
        error: null,
      });

      // Reset success state after 3 seconds
      setTimeout(() => {
        setDownloadState((prev) => ({ ...prev, success: false }));
      }, 3000);
    } catch (error) {
      console.error("PDF download failed:", error);
      setDownloadState({
        isLoading: false,
        success: false,
        error: error.message || "Failed to generate PDF. Please try again.",
      });
    }
  }, [
    invoiceData,
    logoImage,
    signatureImage,
    downloadState.isLoading,
    validateInvoiceData,
  ]);

  const renderCurrencyOption = (country) => (
    <div className="flex items-center gap-2">
      <span className="bg-neutral-100 px-2 py-1.5 rounded-sm">
        {country.flag}
      </span>
      <span>
        {country.code} - {country.currency}
      </span>
    </div>
  );

  const renderSelectedCurrency = (currencyCode) => {
    const country = currency.countries.find((c) => c.code === currencyCode);
    return country ? (
      <div className="flex items-center gap-2">
        <span>
          {country.name} ( {country.code} {country.symbol} )
        </span>
      </div>
    ) : (
      currencyCode
    );
  };

  return (
    <div className="w-full max-h-screen p-6 bg-white overflow-y-auto border border-dashed border-neutral-100">
      <div className="flex justify-end w-full items-center px-4 pb-4 border-b border-dashed border-neutral-100">
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleDownloadPDF}
            disabled={downloadState.isLoading}
            className={`bg-gradient-to-br from-orange-400 to-orange-500 pl-3 pr-4 py-2 rounded-lg border-2 border-orange-400 hover:shadow-md relative flex justify-center items-center overflow-hidden text-white gap-2 cursor-pointer transition-all duration-200 min-w-[140px] ${
              downloadState.isLoading
                ? "opacity-75 cursor-not-allowed"
                : downloadState.success
                ? "from-green-400 to-green-500 border-green-400"
                : downloadState.error
                ? "from-red-400 to-red-500 border-red-400"
                : "hover:from-orange-500 hover:to-orange-600"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            {downloadState.isLoading ? (
              <Loader2 size={14} className="animate-spin" />
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

          {/* Error Message */}
          {downloadState.error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3 max-w-xs">
              <p className="text-xs text-red-700 whitespace-pre-line">
                {downloadState.error}
              </p>
            </div>
          )}

          {/* Success Message */}
          {downloadState.success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 max-w-xs">
              <p className="text-xs text-green-700">
                PDF downloaded successfully! File size optimized for sharing.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Information - Always Open */}
      <BasicInfoEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={invoiceData}
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

      {/* Company Details */}
      <CompanyEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={invoiceData}
        buttonClass={buttonClass}
        updateBilledBy={updateBilledBy}
        addCustomField={addCustomField}
        updateCustomField={updateCustomField}
        removeCustomField={removeCustomField}
      />

      {/* Client Details */}
      <ClientEditor
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        labelClass={labelClass}
        inputClass={inputClass}
        invoiceData={invoiceData}
        buttonClass={buttonClass}
        updateBilledTo={updateBilledTo}
        addCustomField={addCustomField}
        updateCustomField={updateCustomField}
        removeCustomField={removeCustomField}
      />

      {/* Images Section */}
      <ImageEditor
        openSections={openSections}
        toggleSection={toggleSection}
        logoImage={logoImage}
        removeLogo={removeLogo}
        handleFileUpload={handleFileUpload}
        signatureImage={signatureImage}
        removeSignature={removeSignature}
        inputClass={inputClass}
        updateSignatureText={updateSignatureText}
        labelClass={labelClass}
        invoiceData={invoiceData}
      />

      {/* Invoice Items */}
      <ItemsEditor
        invoiceData={invoiceData}
        openSections={openSections}
        toggleEdit={toggleEdit}
        toggleSection={toggleSection}
        removeItem={removeItem}
        editingStates={editingStates}
        updateTax={updateTax}
        buttonClass={buttonClass}
        updateItem={updateItem}
        addItem={addItem}
      />

      {/* Payment Information */}
      <PaymentEditor
        openSections={openSections}
        toggleSection={toggleSection}
        toggleEdit={toggleEdit}
        invoiceData={invoiceData}
        labelClass={labelClass}
        updatePayment={updatePayment}
        inputClass={inputClass}
        removePaymentField={removePaymentField}
        addPaymentField={addPaymentField}
        buttonClass={buttonClass}
      />

      {/* Terms Section */}
      <AdditionalInfoEditor
        openSections={openSections}
        toggleSection={toggleSection}
        toggleEdit={toggleEdit}
        labelClass={labelClass}
        invoiceData={invoiceData}
        inputClass={inputClass}
        updateTermsSection={updateTermsSection}
      />

      {/* Thank You Section */}
      <FooterEditor
        openSections={openSections}
        toggleSection={toggleSection}
        toggleEdit={toggleEdit}
        invoiceData={invoiceData}
        labelClass={labelClass}
        updateThankyouSection={updateThankyouSection}
        inputClass={inputClass}
      />
    </div>
  );
};

export default InvoiceEditor;
