import React, { useEffect, useState } from "react";
import { currency, themes } from "../../invoice/data/data";
import { normalizeTheme } from "../../invoice/data/pdfThemes";
import { defaultReceiptData } from "../data";
import { idbSet, idbGet, idbDelete } from "../../invoice/utils/imageStore";
import { ReceiptContext } from "./receiptContext";

export const ReceiptProvider = ({ children }) => {
  const [receiptData, setReceiptData] = useState(() => {
    try {
      const saved = localStorage.getItem("receiptData");
      return saved ? JSON.parse(saved) : defaultReceiptData;
    } catch {
      return defaultReceiptData;
    }
  });
  const [logoImage, setLogoImage] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);

  useEffect(() => {
    localStorage.setItem("receiptData", JSON.stringify(receiptData));
  }, [receiptData]);

  useEffect(() => {
    (async () => {
      const [logo, sig] = await Promise.all([
        idbGet("receipt_logo"),
        idbGet("receipt_signature"),
      ]);
      if (logo) setLogoImage(logo);
      if (sig) setSignatureImage(sig);
    })();
  }, []);

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
    setReceiptData((prev) => ({ ...prev, theme: normalizeTheme(theme) }));
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
      [field]:
        field === "price" || field === "qty"
          ? typeof value === "number"
            ? value
            : parseFloat(value) || 0
          : value,
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
    const tax = typeof value === "number" ? value : parseFloat(value) || 0;
    setReceiptData((prev) => ({ ...prev, tax: Math.max(0, tax) }));
  };

  const updateReceivedAmount = (value) => {
    const receivedAmount = typeof value === "number" ? value : parseFloat(value) || 0;
    setReceiptData((prev) => ({ ...prev, receivedAmount: Math.max(0, receivedAmount) }));
  };

  const uploadLogo = (file) => {
    try {
      if (file.size > 500 * 1024) {
        throw new Error("Logo must be <= 500KB");
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setLogoImage(dataUrl);
        idbSet("receipt_logo", dataUrl);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading logo:", error);
    }
  };

  const uploadSignature = (file) => {
    try {
      if (file.size > 500 * 1024) {
        throw new Error("Signature must be <= 500KB");
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        setSignatureImage(dataUrl);
        idbSet("receipt_signature", dataUrl);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading signature:", error);
    }
  };

  const removeLogo = () => {
    setLogoImage(null);
    idbDelete("receipt_logo");
  };

  const removeSignature = () => {
    setSignatureImage(null);
    idbDelete("receipt_signature");
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


