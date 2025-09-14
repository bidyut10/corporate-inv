import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateInvoicePDF = async (invoiceData, logoImage, signatureImage) => {
    // Create a temporary container for PDF generation with fixed dimensions
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.top = '-9999px';
    tempContainer.style.width = '794px'; // A4 width in pixels at 96 DPI
    tempContainer.style.minHeight = '1123px'; // A4 height in pixels at 96 DPI
    tempContainer.style.background = 'white';
    tempContainer.style.fontFamily = 'Arial, sans-serif';
    tempContainer.style.fontSize = '14px';
    tempContainer.style.lineHeight = '1.4';
    tempContainer.style.padding = '40px';
    tempContainer.style.boxSizing = 'border-box';

    // Default images - optimized base64
    const defaultLogo = "data:image/svg+xml,%3Csvg width='100' height='60' viewBox='0 0 100 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='60' fill='%23F3F4F6'/%3E%3Ctext x='50' y='35' text-anchor='middle' font-family='Arial' font-size='12' fill='%236B7280'%3ELOGO%3C/text%3E%3C/svg%3E";
    const defaultSignature = "data:image/svg+xml,%3Csvg width='100' height='30' viewBox='0 0 100 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='30' fill='%23F3F4F6'/%3E%3Ctext x='50' y='18' text-anchor='middle' font-family='Arial' font-size='10' fill='%236B7280'%3ESignature%3C/text%3E%3C/svg%3E";

    // Calculate totals
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const tax = invoiceData.tax || 0;
    const total = subtotal + tax;

    // Transform payment data
    const payment = invoiceData.payment.map((item) => ({
        [item.label]: item.value,
    }));

    // Helper function to truncate long text
    const truncateText = (text, maxLength = 50) => {
        if (!text) return '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Generate optimized HTML content
    tempContainer.innerHTML = `
    <div style="width: 100%; height: 100%; background: white; color: black; font-family: Arial, sans-serif; font-size: 14px;">
      <!-- Invoice Header -->
      <div style="padding-bottom: 16px; border-bottom: 1px solid #e5e5e5;">
        <h1 style="font-size: 28px; font-weight: 600; text-transform: uppercase; color: #1f2937; margin: 0; padding: 0;">
          Invoice ${invoiceData.invoiceNumber || 'N/A'}
        </h1>
      </div>

      <!-- Invoice Info and Logo Section -->
      <div style="display: table; width: 100%; margin: 20px 0; border: 1px solid #e5e5e5;">
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding: 16px; border-right: 1px solid #e5e5e5; vertical-align: top;">
            <div style="font-size: 13px; line-height: 1.6;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Serial Number:</strong>
                <span>${invoiceData.serialNumber || 'N/A'}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Date of Issue:</strong>
                <span>${invoiceData.issueDate || 'N/A'}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Due Date:</strong>
                <span>${invoiceData.dueDate || 'N/A'}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <strong>Currency:</strong>
                <span>${invoiceData.currency || 'USD'}</span>
              </div>
              ${invoiceData.customFields?.basic?.map(field => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                  <strong>${field.label}:</strong>
                  <span>${truncateText(field.value, 20)}</span>
                </div>
              `).join('') || ''}
            </div>
          </div>
          <div style="display: table-cell; width: 50%; padding: 16px; text-align: center; vertical-align: middle;">
            <img style="max-width: 120px; max-height: 80px; object-fit: contain;" src="${logoImage || defaultLogo}" alt="Logo" />
          </div>
        </div>
      </div>

      <!-- Billing Section -->
      <div style="display: table; width: 100%; margin: 20px 0; border: 1px solid #e5e5e5;">
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding: 16px; border-right: 1px solid #e5e5e5; vertical-align: top;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937; font-weight: 600;">From</h3>
            <div style="font-size: 13px; color: #4b5563; line-height: 1.6;">
              <div style="font-weight: 600; margin-bottom: 4px;">${invoiceData.billedBy?.name || 'N/A'}</div>
              <div style="margin-bottom: 4px;">${invoiceData.billedBy?.contact || ''}</div>
              <div style="margin-bottom: 8px;">${truncateText(invoiceData.billedBy?.address, 40) || ''}</div>
              ${invoiceData.customFields?.company?.map(field => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 12px;">
                  <strong>${field.label}:</strong>
                  <span>${truncateText(field.value, 15)}</span>
                </div>
              `).join('') || ''}
            </div>
          </div>
          <div style="display: table-cell; width: 50%; padding: 16px; vertical-align: top;">
            <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #1f2937; font-weight: 600;">To</h3>
            <div style="font-size: 13px; color: #4b5563; line-height: 1.6;">
              <div style="font-weight: 600; margin-bottom: 4px;">${invoiceData.billedTo?.name || 'N/A'}</div>
              <div style="margin-bottom: 4px;">${invoiceData.billedTo?.contact || ''}</div>
              <div style="margin-bottom: 8px;">${truncateText(invoiceData.billedTo?.address, 40) || ''}</div>
              ${invoiceData.customFields?.client?.map(field => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 4px; font-size: 12px;">
                  <strong>${field.label}:</strong>
                  <span>${truncateText(field.value, 15)}</span>
                </div>
              `).join('') || ''}
            </div>
          </div>
        </div>
      </div>

      <!-- Items Section - Fixed Table Layout -->
      <div style="margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 13px; table-layout: fixed;">
          <thead>
            <tr style="background-color: #f9fafb; border: 1px solid #e5e5e5;">
              <th style="width: 8%; padding: 12px 8px; text-align: left; font-weight: 600; border-right: 1px solid #e5e5e5;">No.</th>
              <th style="width: 40%; padding: 12px 8px; text-align: left; font-weight: 600; border-right: 1px solid #e5e5e5;">Item</th>
              <th style="width: 12%; padding: 12px 8px; text-align: center; font-weight: 600; border-right: 1px solid #e5e5e5;">Qty</th>
              <th style="width: 20%; padding: 12px 8px; text-align: right; font-weight: 600; border-right: 1px solid #e5e5e5;">Price</th>
              <th style="width: 20%; padding: 12px 8px; text-align: right; font-weight: 600;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.items?.map((item, index) => `
              <tr style="border-bottom: 1px solid #e5e5e5;">
                <td style="padding: 12px 8px; text-align: left; border-right: 1px solid #e5e5e5; vertical-align: top;">
                  ${index + 1}.
                </td>
                <td style="padding: 12px 8px; border-right: 1px solid #e5e5e5; vertical-align: top; word-wrap: break-word;">
                  <div style="font-weight: 600; margin-bottom: 4px; color: #1f2937;">
                    ${truncateText(item.name, 35)}
                  </div>
                  <div style="color: #6b7280; font-size: 12px; line-height: 1.4;">
                    ${truncateText(item.description, 45)}
                  </div>
                </td>
                <td style="padding: 12px 8px; text-align: center; border-right: 1px solid #e5e5e5; vertical-align: top;">
                  ${item.qty || 0}
                </td>
                <td style="padding: 12px 8px; text-align: right; border-right: 1px solid #e5e5e5; vertical-align: top;">
                  ${invoiceData.symbol || '$'} ${(item.price || 0).toFixed(2)}
                </td>
                <td style="padding: 12px 8px; text-align: right; vertical-align: top;">
                  ${invoiceData.symbol || '$'} ${((item.qty || 0) * (item.price || 0)).toFixed(2)}
                </td>
              </tr>
            `).join('') || '<tr><td colspan="5" style="padding: 20px; text-align: center; color: #6b7280;">No items found</td></tr>'}
          </tbody>
        </table>
      </div>

      <!-- Calculation Section -->
      <div style="margin: 20px 0; display: flex; justify-content: flex-end;">
        <div style="width: 300px; border: 1px solid #e5e5e5;">
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #e5e5e5; background-color: #f9fafb;">
            <span style="font-size: 13px;">Tax:</span>
            <span style="font-size: 13px; font-weight: 600;">
              ${invoiceData.symbol || '$'} ${tax.toFixed(2)}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 12px 16px; background-color: #1f2937; color: white;">
            <span style="font-size: 14px; font-weight: 600;">Total:</span>
            <span style="font-size: 14px; font-weight: 600;">
              ${invoiceData.symbol || '$'} ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div style="display: table; width: 100%; margin: 20px 0; border: 1px solid #e5e5e5;">
        <div style="display: table-row;">
          <div style="display: table-cell; width: 50%; padding: 16px; border-right: 1px solid #e5e5e5; vertical-align: top;">
            <h3 style="font-size: 14px; color: #1f2937; font-weight: 600; margin: 0 0 12px 0;">
              Payment Information
            </h3>
            <div style="font-size: 13px; color: #4b5563;">
              ${payment?.map(item => {
        const [field, value] = Object.entries(item)[0];
        return `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span>${field}:</span>
                    <span style="font-weight: 500;">${truncateText(value, 20)}</span>
                  </div>
                `;
    }).join('') || '<div style="color: #9ca3af;">No payment information</div>'}
            </div>
          </div>
          <div style="display: table-cell; width: 50%; padding: 16px; text-align: center; vertical-align: middle;">
            <div style="margin-bottom: 12px;">
              <img src="${signatureImage || defaultSignature}" alt="Signature" style="max-width: 120px; max-height: 60px; object-fit: contain;" />
            </div>
            <div style="font-size: 11px; color: #6b7280; background-color: #f9fafb; padding: 8px; border-radius: 4px;">
              ${invoiceData.signatureText || 'Authorized Signature'}
            </div>
          </div>
        </div>
      </div>

      <!-- Terms Section -->
      ${invoiceData.termsSection?.title || invoiceData.termsSection?.text ? `
        <div style="margin: 20px 0; padding: 16px; background-color: #f9fafb; border: 1px solid #e5e5e5;">
          <h3 style="color: #1f2937; font-weight: 600; font-size: 14px; margin: 0 0 8px 0;">${invoiceData.termsSection.title || 'Terms & Conditions'}</h3>
          <div style="color: #4b5563; font-size: 13px; line-height: 1.6;">${invoiceData.termsSection.text || ''}</div>
        </div>
      ` : ''}

      <!-- Thank You Section -->
      ${invoiceData.thankyouSection?.title || invoiceData.thankyouSection?.text ? `
        <div style="margin: 20px 0 0 0; padding: 16px; background-color: #f9fafb; border: 1px solid #e5e5e5; text-align: center;">
          <h3 style="color: #1f2937; font-weight: 600; font-size: 14px; margin: 0 0 8px 0;">
            ${invoiceData.thankyouSection.title || 'Thank You'}
          </h3>
          <div style="color: #4b5563; font-size: 13px;">${invoiceData.thankyouSection.text || ''}</div>
        </div>
      ` : ''}
    </div>
  `;

    document.body.appendChild(tempContainer);

    try {
        // Optimized canvas generation with lower scale for smaller file size
        const canvas = await html2canvas(tempContainer, {
            scale: 1.5, // Reduced from 2 to 1.5 for smaller file size
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: 794,
            height: tempContainer.scrollHeight,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 794,
            windowHeight: tempContainer.scrollHeight,
            logging: false, // Disable logging for production
            removeContainer: true
        });

        // Create PDF with compression
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true // Enable compression
        });

        // Convert canvas to optimized image
        const imgData = canvas.toDataURL('image/jpeg', 0.85); // Use JPEG with 85% quality instead of PNG

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasAspectRatio = canvas.height / canvas.width;
        const pdfAspectRatio = pdfHeight / pdfWidth;

        let renderWidth, renderHeight;

        if (canvasAspectRatio > pdfAspectRatio) {
            renderHeight = pdfHeight - 20; // 10mm margin top and bottom
            renderWidth = renderHeight / canvasAspectRatio;
        } else {
            renderWidth = pdfWidth - 20; // 10mm margin left and right
            renderHeight = renderWidth * canvasAspectRatio;
        }

        const xOffset = (pdfWidth - renderWidth) / 2;
        const yOffset = 10; // 10mm top margin

        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, renderWidth, renderHeight);

        // Save PDF with optimized filename
        const fileName = `Invoice-${(invoiceData.invoiceNumber || 'Invoice').replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);

        return true;

    } catch (error) {
        console.error('Error generating PDF:', error);
        throw new Error(`PDF generation failed: ${error.message}`);
    } finally {
        // Clean up
        if (document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer);
        }
    }
};

// Production-ready export
export default generateInvoicePDF;