import React from 'react'
import Accordion from '../common/Accordion';
import {Image, X} from 'lucide-react'
const ImageEditor = ({
  openSections,
  toggleSection,
  logoImage,
  removeLogo,
  handleFileUpload,
  signatureImage,
  removeSignature,
  inputClass,
  updateSignatureText,
  labelClass,
  invoiceData,
}) => {
  return (
    <Accordion
      title="Company Logo & Signature"
      isOpen={openSections.images}
      onToggle={() => toggleSection("images")}
    >
      <div className="grid grid-cols-3 gap-6 mt-4">
        {/* Logo Upload */}
        <div className="text-center">
          <h4 className="font-medium text-neutral-700 mb-4">Company Logo</h4>
          {logoImage ? (
            <div className="relative">
              <img
                src={logoImage}
                alt="Company Logo"
                className="w-32 h-32 object-contain mx-auto border rounded-lg"
              />
              <button
                onClick={removeLogo}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 mx-auto border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center bg-neutral-50">
              <Image size={24} className="text-neutral-400 mb-2" />
              <span className="text-xs text-neutral-500">
                Select Image From Assets
              </span>
              <span className="text-xs text-neutral-400">Type: logo</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload("logo", file);
            }}
            className="hidden"
            id="logo-upload"
          />
          <label
            htmlFor="logo-upload"
            className="inline-block mt-4 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer text-sm font-mono"
          >
            {logoImage ? "Change Logo" : "Upload Logo"}
          </label>
        </div>

        {/* Signature Upload */}
        <div className="text-center">
          <h4 className="font-medium text-neutral-700 mb-4">
            Company Signature
          </h4>
          {signatureImage ? (
            <div className="relative">
              <img
                src={signatureImage}
                alt="Company Signature"
                className="w-32 h-32 object-contain mx-auto border rounded-lg"
              />
              <button
                onClick={removeSignature}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 mx-auto border-2 border-dashed border-neutral-300 rounded-lg flex flex-col items-center justify-center bg-neutral-50">
              <Image size={24} className="text-neutral-400 mb-2" />
              <span className="text-xs text-neutral-500">
                Select Image From Assets
              </span>
              <span className="text-xs text-neutral-400">Type: signature</span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload("signature", file);
            }}
            className="hidden"
            id="signature-upload"
          />
          <label
            htmlFor="signature-upload"
            className="inline-block mt-4 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer text-sm font-mono"
          >
            {signatureImage ? "Change Signature" : "Upload Signature"}
          </label>
        </div>
        <div>
          <label className={labelClass}>Signature Text</label>
          <input
            type="text"
            value={invoiceData.signatureText}
            onChange={(e) => updateSignatureText(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>
    </Accordion>
  );
};

export default ImageEditor