import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper function to preload images
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    if (!src || src === '') {
      resolve('');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(src);
    img.onerror = () => resolve(''); // Resolve with empty string on error
    img.src = src;
  });
};

export const generateInvoicePDF = async (invoiceData, logoImage, signatureImage) => {
  // Default images with smaller, optimized SVGs
  const defaultLogo = "data:image/svg+xml,%3Csvg width='80' height='40' viewBox='0 0 80 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='40' fill='%23f3f4f6'/%3E%3Ctext x='40' y='24' text-anchor='middle' font-family='Arial' font-size='10' fill='%236b7280'%3ELOGO%3C/text%3E%3C/svg%3E";
  const defaultSignature = "data:image/svg+xml,%3Csvg width='80' height='30' viewBox='0 0 80 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='80' height='30' fill='%23f3f4f6'/%3E%3Ctext x='40' y='18' text-anchor='middle' font-family='Arial' font-size='8' fill='%236b7280'%3ESignature%3C/text%3E%3C/svg%3E";

  // Preload images to avoid rendering issues
  const [loadedLogo, loadedSignature] = await Promise.all([
    preloadImage(logoImage || defaultLogo),
    preloadImage(signatureImage || defaultSignature)
  ]);

  // Create optimized container
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '-9999px';
  tempContainer.style.width = '595px';
  tempContainer.style.background = 'white';
  tempContainer.style.fontFamily = 'Arial, sans-serif'; // Use web-safe font
  tempContainer.style.fontSize = '14px';
  tempContainer.style.lineHeight = '1.4';
  tempContainer.style.padding = '24px';
  tempContainer.style.boxSizing = 'border-box';
  tempContainer.style.color = 'black';

  // Calculate totals
  const subtotal = invoiceData.items?.reduce((sum, item) => sum + (item.qty || 0) * (item.price || 0), 0) || 0;
  const tax = invoiceData.tax || 0;
  const total = subtotal + tax;

  // Transform payment data
  const payment = invoiceData.payment?.map((item) => ({
    [item.label]: item.value,
  })) || [];

  // Generate optimized HTML content
  tempContainer.innerHTML = `
    <div style="width: 547px; display: flex; flex-direction: column; justify-content: space-between; align-items: center; margin: auto; background: white; color: black; font-family: Arial, sans-serif; font-size: 14px; top: 0;">
      
      <!-- Invoice Title -->
      <div style="width: 100%; text-align: start;">
        <h1 style="font-size: 20px; font-weight: normal; text-transform: uppercase;">
            Invoice ${invoiceData.invoiceNumber || ''}
        </h1>
      </div>

      <!-- Invoice Header Section -->
      <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #d1d5db; border-bottom: 1px dashed #d1d5db;">
        
        <div style="width: 50%; height: 100% display: flex; flex-direction: column; justify-content: start; align-items: center; padding-left:16px;">
          <div style="font-size: 12px;">
            <div style="display: flex; justify-content: space-between; margin: 2px 0;">
              <span style="color: black;">Serial Number</span>
              <span style="color: black;">${invoiceData.serialNumber || ''}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 2px 0;">
              <span style="color: black;">Date of Issue</span>
              <span style="color: black;">${invoiceData.issueDate || ''}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 2px 0;">
              <span style="color: black;">Due Date</span>
              <span style="color: black;">${invoiceData.dueDate || ''}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin: 2px 0;">
              <span style="color: black;">Currency</span>
              <span style="color: black;">${invoiceData.currency || ''}</span>
            </div>
            ${invoiceData.customFields?.basic?.map(field => `
              <div style="display: flex; justify-content: space-between; margin: 2px 0;">
                <span style="color: black;">${field.label}</span>
                <span style="color: black;">${field.value}</span>
              </div>
            `).join('') || ''}
          </div>
        </div>
        <div style="width: 50%; height: 100% display: flex; justify-content: end; align-items: center; padding-left:16px;">
          ${loadedLogo ? `<img style="max-height: 60px; max-width: 120px; object-fit: contain;" src="${loadedLogo}" alt="logo" />` : ''}
        </div>
      </div>

      <!-- Billing Section -->
      <div style="position: relative; display: flex; width: 100%; border-bottom: 1px dashed #d1d5db; margin-bottom: 16px;">
        <div style="position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px);"></div>
        
        <div style="flex: 1; padding: 12px 12px 12px 0;">
          <h3 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 500; color: black;">From</h3>
          <div style="font-size: 12px; color: black; line-height: 1.5;">
            <div style="margin-bottom: 4px;">${invoiceData.billedBy?.name || ''}</div>
            <div style="margin-bottom: 4px;">${invoiceData.billedBy?.contact || ''}</div>
            <div>${invoiceData.billedBy?.address || ''}</div>
            ${invoiceData.customFields?.company?.length > 0 ? `
              <div>
                ${invoiceData.customFields.company.map(field => `
                  <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                    <span style="font-weight: 500; color: black;">${field.label}</span>
                    <span style="color: black;">${field.value}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
        <div style="flex: 1; padding: 12px 0 12px 12px;">
          <h3 style="margin: 0 0 6px 0; font-size: 12px; font-weight: 500; color: black;">To</h3>
          <div style="font-size: 12px; color: black; line-height: 1.5;">
            <div style="margin-bottom: 4px;">${invoiceData.billedTo?.name || ''}</div>
            <div style="margin-bottom: 4px;">${invoiceData.billedTo?.contact || ''}</div>
            <div>${invoiceData.billedTo?.address || ''}</div>
            ${invoiceData.customFields?.client?.length > 0 ? `
              <div>
                ${invoiceData.customFields.client.map(field => `
                  <div style="display: flex; justify-content: space-between; margin-top: 4px;">
                    <span style="font-weight: 500; color: black;">${field.label}</span>
                    <span style="color: black;">${field.value}</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Items Section -->
      <div style="margin-bottom: 16px;">
        <div style="display: flex; width: 100%; background-color: #f9fafb; font-size: 12px; font-weight: 500;">
          <div style="flex: 0 0 8%; padding: 8px 4px; text-align: left; color: black;">No.</div>
          <div style="flex: 1; padding: 8px; color: black;">Item</div>
          <div style="flex: 0 0 8%; padding: 8px; text-align: center; color: black;">Quantity</div>
          <div style="flex: 0 0 17%; padding: 8px; text-align: right; color: black;">Price</div>
          <div style="flex: 0 0 17%; padding: 8px; text-align: right; color: black;">Total</div>
        </div>
        
        ${invoiceData.items?.map((item, index) => `
          <div style="display: flex; width: 100%; border-bottom: 1px dashed #e5e7eb;">
            <div style="flex: 0 0 8%; padding: 8px 4px; font-size: 10px; color: black; align-self: flex-start;">
              ${index + 1}.
            </div>
            <div style="flex: 1; padding: 8px;">
              <div style="font-weight: 500; font-size: 12px; color: black; margin-bottom: 4px;">
                ${item.name || ''}
              </div>
              <div style="font-size: 12px; color: black; line-height: 1.3;">
                ${item.description || ''}
              </div>
            </div>
            <div style="flex: 0 0 8%; padding: 8px; text-align: center; font-size: 12px; color: black; align-self: flex-start;">
              ${item.qty || 0}
            </div>
            <div style="flex: 0 0 17%; padding: 8px; text-align: right; font-size: 12px; color: black; align-self: flex-start;">
              ${invoiceData.symbol || '$'} ${(item.price || 0).toFixed(2)}
            </div>
            <div style="flex: 0 0 17%; padding: 8px; text-align: right; font-size: 12px; color: black; align-self: flex-start;">
              ${invoiceData.symbol || '$'} ${((item.qty || 0) * (item.price || 0)).toFixed(2)}
            </div>
          </div>
        `).join('') || ''}
      </div>

      <!-- Calculation Section -->
      <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
        <div style="width: 40%;">
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e5e7eb;">
            <span style="font-size: 12px; color: black;">Tax</span>
            <span style="font-size: 12px; padding-right: 8px; color: black;">
              ${invoiceData.symbol || '$'} ${tax.toFixed(2)}
            </span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #e5e7eb;">
            <span style="font-size: 14px; font-weight: 500; color: black;">Total</span>
            <span style="font-size: 14px; font-weight: 500; padding-right: 8px; color: black;">
              ${invoiceData.symbol || '$'} ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div style="position: relative; display: flex; width: 100%; border-top: 1px dashed #d1d5db; border-bottom: 1px dashed #d1d5db; margin-bottom: 16px;">
        <div style="position: absolute; top: 0; bottom: 0; left: 50%; width: 1px; background: repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px);"></div>
        
        <div style="flex: 1; padding: 12px 16px 12px 0;">
          <h3 style="font-size: 12px; color: black; font-weight: 500; margin: 0 0 12px 0;">
            Payment Information
          </h3>
          ${payment.map(item => {
    const [field, value] = Object.entries(item)[0];
    return `
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-size: 12px; color: black;">${field}</span>
                <span style="font-size: 12px; color: black;">${value}</span>
              </div>
            `;
  }).join('')}
        </div>
        <div style="flex: 1; padding: 12px 0 12px 16px; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div style="margin-bottom: 8px;">
            ${loadedSignature ? `<img src="${loadedSignature}" alt="signature" style="max-height: 40px; max-width: 100px; object-fit: contain;" />` : ''}
          </div>
          <div style="font-size: 10px; color: black; background-color: #f9fafb; padding: 4px 8px;">
            ${invoiceData.signatureText || ''}
          </div>
        </div>
      </div>

      <!-- Terms Section -->
      ${invoiceData.termsSection?.title || invoiceData.termsSection?.text ? `
        <div style="width: 100%; border-top: 1px dashed #d1d5db; border-bottom: 1px dashed #d1d5db; 
                    background-color: #f9fafb; padding: 12px; margin-bottom: 16px;">
          <h3 style="color: black; font-weight: 500; font-size: 12px; margin: 0 0 4px 0;">
            ${invoiceData.termsSection.title || ''}
          </h3>
          <div style="color: black; font-size: 12px; margin: 0; line-height: 1.4;">
            ${invoiceData.termsSection.text || ''}
          </div>
        </div>
      ` : ''}

      <!-- Thank You Section -->
      ${invoiceData.thankyouSection?.title || invoiceData.thankyouSection?.text ? `
        <div style="width: 100%; border-top: 1px dashed #d1d5db; border-bottom: 1px dashed #d1d5db; 
                    background-color: #f9fafb; padding: 12px; text-align: center;">
          <h3 style="color: black; font-weight: 500; font-size: 12px; margin: 0 0 4px 0;">
            ${invoiceData.thankyouSection.title || ''}
          </h3>
          <div style="color: black; font-size: 12px; margin: 0;">
            ${invoiceData.thankyouSection.text || ''}
          </div>
        </div>
      ` : ''}

    </div>
  `;

  document.body.appendChild(tempContainer);

  try {
    // Wait a bit for images to load
    await new Promise(resolve => setTimeout(resolve, 100));

    // Optimized canvas generation
    const canvas = await html2canvas(tempContainer, {
      scale: 1.5, // Balanced scale for quality vs file size
      useCORS: true,
      allowTaint: false,
      backgroundColor: '#ffffff',
      width: 595,
      height: tempContainer.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      logging: false,
      removeContainer: false,
      foreignObjectRendering: false, // Disable for better compatibility
      imageTimeout: 0
    });

    // Create PDF with moderate compression
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    // Convert to optimized JPEG with good quality
    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const canvasAspectRatio = canvas.height / canvas.width;

    let renderWidth = pdfWidth - 10;
    let renderHeight = renderWidth * canvasAspectRatio;

    if (renderHeight > pdfHeight - 10) {
      renderHeight = pdfHeight - 10;
      renderWidth = renderHeight / canvasAspectRatio;
    }

    const xOffset = (pdfWidth - renderWidth) / 2;
    const yOffset = 5;

    pdf.addImage(imgData, 'JPEG', xOffset, yOffset, renderWidth, renderHeight);

    const fileName = `Invoice-${(invoiceData.invoiceNumber || 'INV').replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    pdf.save(fileName);

    return true;

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`PDF generation failed: ${error.message}`);
  } finally {
    if (document.body.contains(tempContainer)) {
      document.body.removeChild(tempContainer);
    }
  }
};

export default generateInvoicePDF;