import React from 'react'
import Accordion from '../common/Accordion';
import {ImageMinus, ImagePlus, PenLine, PenOff, PenTool, X} from 'lucide-react'

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
      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Logo Upload */}
        <div className="text-center">
          {logoImage ? (
            <div className="relative">
              <img
                src={logoImage}
                alt="Company Logo"
                className="w-48 h-48 object-contain mx-auto p-4 border rounded-lg"
              />
              <button
                onClick={removeLogo}
                className="absolute top-0 right-0 bg-red-500 cursor-pointer text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center bg-neutral-50/50">
              <ImagePlus size={24} className="text-neutral-400 mb-2" />
              <span className="text-xs text-neutral-400 mb-2">Type: logo</span>
              <span className="text-xs text-neutral-500">
                Select Image From Assets
              </span>
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
          <label htmlFor="logo-upload" className="inline-block mt-4">
            {logoImage ? (
              <div className="flex justify-center items-center w-48 max-w-full gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer text-sm font-mono">
                <ImageMinus size={16} />
                <h1 className="text-sm font-mono">Change Logo</h1>
              </div>
            ) : (
              <div className="flex justify-center items-center w-48 max-w-full gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer text-sm font-mono">
                <ImagePlus size={16} />
                <h1 className="text-sm font-mono">Upload Logo</h1>
              </div>
            )}
          </label>
        </div>

        {/* Signature Upload */}
        <div className="text-center">
          {signatureImage ? (
            <div className="relative">
              <img
                src={signatureImage}
                alt="Company Signature"
                className="w-48 h-48 object-contain mx-auto border rounded-lg"
              />
              <button
                onClick={removeSignature}
                className="absolute top-0 right-0 bg-red-500 cursor-pointer text-white rounded-full p-1 hover:bg-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-neutral-200 rounded-lg flex flex-col items-center justify-center bg-neutral-50/50">
              <PenTool size={24} className="text-neutral-400 mb-2" />
              <span className="text-xs text-neutral-400 mb-2">
                Type: signature
              </span>
              <span className="text-xs text-neutral-500">
                Select Image From Assets
              </span>
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
          <label htmlFor="signature-upload" className="inline-block mt-4">
            {signatureImage ? (
              <div className="flex justify-center items-center w-48 max-w-full gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer text-sm font-mono">
                <PenOff size={15} />
                <h1 className="text-sm font-mono">Change Signature</h1>
              </div>
            ) : (
              <div className="flex justify-center items-center w-48 max-w-full gap-2 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 cursor-pointer text-sm font-mono">
                <PenLine size={15} />
                <h1 className="text-sm font-mono">Upload Signature</h1>
              </div>
            )}
          </label>
        </div>
        <div className='col-span-2'>
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