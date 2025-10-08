import React, { createContext, useContext, useState } from "react";
import { currency } from "../../data/data";
import { defaultReceiptData } from "../data";

const themes = [{ name: "Light", value: "light" }];

const ReceiptContext = createContext();

export const useReceipt = () => {
  const context = useContext(ReceiptContext);
  if (!context) {
    throw new Error("useReceipt must be used within a ReceiptProvider");
  }
  return context;
};

export const ReceiptProvider = ({ children }) => {
  const [receiptData, setReceiptData] = useState(defaultReceiptData);
  const [logoImage, setLogoImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  const updateBasicInfo = (field, value) => {
    setReceiptData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCurrency = (currencyCode) => {
    const selectedCurrency = currency.countries.find((c) => c.code === currencyCode);
    if (selectedCurrency) {
      setReceiptData((prev) => ({
        ...prev,
        currency: selectedCurrency.code,
        symbol: selectedCurrency.symbol,
      }));
    }
  };

  const updateTheme = (theme) => {
    setReceiptData((prev) => ({ ...prev, theme }));
  };

  const updateBilledBy = (field, value) => {
    setReceiptData((prev) => ({
      ...prev,
      billedBy: { ...prev.billedBy, [field]: value },
    }));
  };

  const updateBilledTo = (field, value) => {
    setReceiptData((prev) => ({
      ...prev,
      billedTo: { ...prev.billedTo, [field]: value },
    }));
  };

  const addCustomField = (section, field) => {
    if (!field.label.trim() || !field.value.trim()) return;
    setReceiptData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [section]: [...prev.customFields[section], { ...field, id: Date.now() }],
      },
    }));
  };

  const updateCustomField = (section, index, field, value) => {
    setReceiptData((prev) => {
      const newCustomFields = { ...prev.customFields };
      if (newCustomFields[section][index]) {
        newCustomFields[section][index] = {
          ...newCustomFields[section][index],
          [field]: value,
        };
      }
      return { ...prev, customFields: newCustomFields };
    });
  };

  const removeCustomField = (section, index) => {
    setReceiptData((prev) => ({
      ...prev,
      customFields: {
        ...prev.customFields,
        [section]: prev.customFields[section].filter((_, i) => i !== index),
      },
    }));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...receiptData.items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === "price" || field === "qty" ? parseFloat(value) || 0 : value,
    };
    setReceiptData((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = (item = { name: "", description: "", qty: 1, price: 0 }) => {
    setReceiptData((prev) => ({ ...prev, items: [...prev.items, item] }));
  };

  const removeItem = (index) => {
    if (receiptData.items.length > 1) {
      const newItems = receiptData.items.filter((_, i) => i !== index);
      setReceiptData((prev) => ({ ...prev, items: newItems }));
    }
  };

  const updatePayment = (index, field, value) => {
    const newPayment = [...receiptData.payment];
    newPayment[index] = { ...newPayment[index], [field]: value };
    setReceiptData((prev) => ({ ...prev, payment: newPayment }));
  };

  const addPaymentField = () => {
    setReceiptData((prev) => ({ ...prev, payment: [...prev.payment, { label: "", value: "" }] }));
  };

  const removePaymentField = (index) => {
    if (receiptData.payment.length > 1) {
      const newPayment = receiptData.payment.filter((_, i) => i !== index);
      setReceiptData((prev) => ({ ...prev, payment: newPayment }));
    }
  };

  const updateTermsSection = (field, value) => {
    setReceiptData((prev) => ({ ...prev, termsSection: { ...prev.termsSection, [field]: value } }));
  };

  const updateThankyouSection = (field, value) => {
    setReceiptData((prev) => ({ ...prev, thankyouSection: { ...prev.thankyouSection, [field]: value } }));
  };

  const updateSignatureText = (value) => {
    setReceiptData((prev) => ({ ...prev, signatureText: value }));
  };

  const updateTax = (value) => {
    setReceiptData((prev) => ({ ...prev, tax: parseFloat(value) || 0 }));
  };

  const updateReceivedAmount = (value) => {
    setReceiptData((prev) => ({ ...prev, receivedAmount: parseFloat(value) || 0 }));
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

  const subtotal = receiptData.items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const total = subtotal + receiptData.tax;

  const value = {
    receiptData,
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
    updateReceivedAmount,
    uploadLogo,
    uploadSignature,
    removeLogo,
    removeSignature,
  };

  return <ReceiptContext.Provider value={value}>{children}</ReceiptContext.Provider>;
};

export default ReceiptProvider;


