import React, { createContext, useContext, useState } from "react";
import { currency, defaultInvoiceData } from "../data/data";

const themes = [{ name: "Light", value: "light" }];

const InvoiceContext = createContext();

export const useInvoice = () => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice must be used within an InvoiceProvider");
  }
  return context;
};

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(defaultInvoiceData);
  const [logoImage, setLogoImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  // Update functions
  const updateBasicInfo = (field, value) => {
    setInvoiceData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCurrency = (currencyCode) => {
    const selectedCurrency = currency.countries.find(
      (c) => c.code === currencyCode
    );
    if (selectedCurrency) {
      setInvoiceData((prev) => ({
        ...prev,
        currency: selectedCurrency.code,
        symbol: selectedCurrency.symbol,
      }));
    }
  };

  const updateTheme = (theme) => {
    setInvoiceData((prev) => ({ ...prev, theme }));
  };

  const updateBilledBy = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      billedBy: { ...prev.billedBy, [field]: value },
    }));
  };

  const updateBilledTo = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      billedTo: { ...prev.billedTo, [field]: value },
    }));
  };

  // Enhanced custom field functions
  const addCustomField = (section, field) => {
    if (!field.label.trim() || !field.value.trim()) {
      console.warn("Custom field must have both label and value");
      return;
    }

    setInvoiceData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [section]: [
          ...prev.customFields[section],
          { ...field, id: Date.now() },
        ],
      },
    }));
  };

  const updateCustomField = (section, index, field, value) => {
    setInvoiceData((prev) => {
      const newCustomFields = { ...prev.customFields };
      if (newCustomFields[section][index]) {
        newCustomFields[section][index] = {
          ...newCustomFields[section][index],
          [field]: value,
        };
      }
      return {
        ...prev,
        customFields: newCustomFields,
      };
    });
  };

  const removeCustomField = (section, index) => {
    setInvoiceData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [section]: prev.customFields[section].filter((_, i) => i !== index),
      },
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index] = {
      ...newItems[index],
      [field]:
        field === "price" || field === "qty" ? parseFloat(value) || 0 : value,
    };
    setInvoiceData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = (item = { name: "", description: "", qty: 1, price: 0 }) => {
    setInvoiceData((prev) => ({
      ...prev,
      items: [...prev.items, item],
    }));
  };

  const removeItem = (index) => {
    if (invoiceData.items.length > 1) {
      const newItems = invoiceData.items.filter((_, i) => i !== index);
      setInvoiceData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const updatePayment = (index, field, value) => {
    const newPayment = [...invoiceData.payment];
    newPayment[index] = { ...newPayment[index], [field]: value };
    setInvoiceData((prev) => ({ ...prev, payment: newPayment }));
  };

  const addPaymentField = () => {
    setInvoiceData((prev) => ({
      ...prev,
      payment: [...prev.payment, { label: "", value: "" }],
    }));
  };

  const removePaymentField = (index) => {
    if (invoiceData.payment.length > 1) {
      const newPayment = invoiceData.payment.filter((_, i) => i !== index);
      setInvoiceData((prev) => ({ ...prev, payment: newPayment }));
    }
  };

  const updateTermsSection = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      termsSection: { ...prev.termsSection, [field]: value },
    }));
  };

  const updateThankyouSection = (field, value) => {
    setInvoiceData((prev) => ({
      ...prev,
      thankyouSection: { ...prev.thankyouSection, [field]: value },
    }));
  };

  const updateSignatureText = (value) => {
    setInvoiceData((prev) => ({ ...prev, signatureText: value }));
  };

  const updateTax = (value) => {
    setInvoiceData((prev) => ({ ...prev, tax: parseFloat(value) || 0 }));
  };

  const uploadLogo = (file) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const uploadSignature = (file) => {
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSignatureImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading signature:", error);
    }
  };

  const removeLogo = () => {
    setLogoImage(null);
  };

  const removeSignature = () => {
    setSignatureImage(null);
  };

  // Calculate totals
  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const total = subtotal + invoiceData.tax;

  const value = {
    invoiceData,
    logoImage,
    signatureImage,
    subtotal,
    total,
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
  };

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  );
};

export default InvoiceProvider;
