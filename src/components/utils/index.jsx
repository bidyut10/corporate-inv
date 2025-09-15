import { pdf } from "@react-pdf/renderer";
import InvoicePDFTemplate from "./InvoicePDFTemplate"; // Import your template

export const createPdfBlob = async ({ invoiceData, logoImage, signatureImage, template }) => {
    const Template = getPdfTemplate(template);

    // Create comprehensive data object that matches your UI structure
    const pdfData = {
        ...invoiceData,
        logoImage: logoImage || null,
        signatureImage: signatureImage || null,
        // Ensure all required fields are present
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
    // You can add more templates here as needed
    switch (template) {
        case "invoice":
        case "default":
        default:
            return InvoicePDFTemplate;
    }
};

// Helper function to download the PDF
export const downloadInvoicePDF = async (invoiceData, template, logoImage, signatureImage) => {
    try {
        const blob = await createPdfBlob({
            invoiceData,
            logoImage,
            signatureImage,
            template
        });

        // Create download link
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Invoice-${invoiceData.invoiceNumber || 'INV'}.pdf`;

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        URL.revokeObjectURL(url);

        return true;
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error(`PDF generation failed: ${error.message}`);
    }
};

// Helper function to get PDF as base64 string
export const getPdfAsBase64 = async (invoiceData, template, logoImage, signatureImage) => {
    try {
        const blob = await createPdfBlob({
            invoiceData,
            logoImage,
            signatureImage,
            template
        });
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result;
                // Remove the data:application/pdf;base64, prefix
                const base64Data = base64.split(',')[1];
                resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error(`PDF generation failed: ${error.message}`);
    }
};

export default { createPdfBlob, downloadInvoicePDF, getPdfAsBase64 };