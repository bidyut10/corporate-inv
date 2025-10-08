import { pdf } from "@react-pdf/renderer";
import ReceiptPDFTemplate from "./ReceiptPDFTemplate";

export const createReceiptPdfBlob = async ({ invoiceData, logoImage, signatureImage, template }) => {
  const Template = getPdfTemplate(template);

  const pdfData = {
    ...invoiceData,
    logoImage: logoImage || null,
    signatureImage: signatureImage || null,
    items: invoiceData.items || [],
    customFields: invoiceData.customFields || { basic: [], company: [], client: [] },
    billedBy: invoiceData.billedBy || { name: '', contact: '', address: '' },
    billedTo: invoiceData.billedTo || { name: '', contact: '', address: '' },
    payment: invoiceData.payment || [],
    termsSection: invoiceData.termsSection || { title: '', text: '' },
    thankyouSection: invoiceData.thankyouSection || { title: '', text: '' },
    tax: invoiceData.tax || 0,
    symbol: invoiceData.symbol || '$',
    signatureText: invoiceData.signatureText || ''
  };

  const pdfDocument = <Template data={pdfData} />;
  const blob = await pdf(pdfDocument).toBlob();
  return blob;
};

const getPdfTemplate = (template) => {
  switch (template) {
    case "receipt":
    case "default":
    default:
      return ReceiptPDFTemplate;
  }
};

export const downloadReceiptPDF = async (invoiceData, template, logoImage, signatureImage) => {
  try {
    const blob = await createReceiptPdfBlob({
      invoiceData,
      logoImage,
      signatureImage,
      template,
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const num = invoiceData.receiptNumber || invoiceData.invoiceNumber || 'RCPT';
    link.download = `Receipt-${num}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Error generating Receipt PDF:', error);
    throw new Error(`Receipt PDF generation failed: ${error.message}`);
  }
};

export const getReceiptPdfAsBase64 = async (invoiceData, template, logoImage, signatureImage) => {
  try {
    const blob = await createReceiptPdfBlob({
      invoiceData,
      logoImage,
      signatureImage,
      template,
    });
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result;
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error generating Receipt PDF:', error);
    throw new Error(`Receipt PDF generation failed: ${error.message}`);
  }
};

export default { createReceiptPdfBlob, downloadReceiptPDF, getReceiptPdfAsBase64 };


