import React, { useState } from "react";
import { useInvoice } from "./InvoiceDataService";
import ImageEditor from "./ImageEditor";
import PaymentEditor from "./PaymentEditor";
import FooterEditor from "./FooterEditor";
import AdditionalInfoEditor from "./AdditionalInfoEditor";
import BasicInfoEditor from "./BasicInfoEditor";
import CompanyEditor from "./CompanyEditor";
import ClientEditor from "./ClientEditor";
import ItemsEditor from "./ItemsEditor";

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

  const inputClass =
    "w-full text-xs px-3 py-2 border border-neutral-300 rounded-sm focus:outline-none focus:border-green-500";
  const labelClass = "block text-xs font-medium text-neutral-700 mb-1";
  const buttonClass =
    "flex justify-center items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer w-full";
  const [editingStates, setEditingStates] = useState({});
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(null);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    qty: 1,
    price: 0,
  });

  const [newCustomFields, setNewCustomFields] = useState({
    basic: { label: "", value: "" },
    company: { label: "", value: "" },
    client: { label: "", value: "" },
  });

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

  const handleAddItem = () => {
    if (newItem.name.trim()) {
      addItem(newItem);
      setNewItem({ name: "", description: "", qty: 1, price: 0 });
      setShowAddItemModal(false);
    }
  };

  const handleEditItem = (index, updatedItem) => {
    Object.keys(updatedItem).forEach((key) => {
      updateItem(index, key, updatedItem[key]);
    });
    setShowEditItemModal(null);
  };

  const handleAddCustomField = (section) => {
    if (newCustomFields[section].label.trim()) {
      addCustomField(section, { ...newCustomFields[section] });
      setNewCustomFields((prev) => ({
        ...prev,
        [section]: { label: "", value: "" },
      }));
    }
  };

  const renderCurrencyOption = (country) => (
    <div className="flex items-center gap-2">
      <span>{country.flag}</span>
      <span>
        {country.code} - {country.currency}
      </span>
    </div>
  );

  const renderSelectedCurrency = (currencyCode) => {
    const country = currency.countries.find((c) => c.code === currencyCode);
    return country ? (
      <div className="flex items-center gap-2">
        <span>{country.flag}</span>
        <span>
          {country.code} - {country.symbol}
        </span>
      </div>
    ) : (
      currencyCode
    );
  };

  return (
    <div className="w-full max-h-screen p-6 bg-white overflow-y-auto">
      <h2 className="text-xl font-medium text-neutral-800 mb-6">
        Invoice Editor
      </h2>
      
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
        setShowAddItemModal={setShowAddItemModal}
        setShowEditItemModal={setShowEditItemModal}
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
