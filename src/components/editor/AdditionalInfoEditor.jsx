import React from 'react'
import Accordion from '../common/Accordion';

const AdditionalInfoEditor = ({
  openSections,
  toggleSection,
  toggleEdit,
  labelClass,
  invoiceData,
  inputClass,
  updateTermsSection,
}) => {
  return (
    <Accordion
      title="Additional Information"
      isOpen={openSections.terms}
      onToggle={() => toggleSection("terms")}
      showEditIcon={true}
      onEdit={() => toggleEdit("terms")}
    >
      <div className="space-y-4 mt-4">
        <div>
          <label className={labelClass}>Section Title</label>
          <input
            type="text"
            value={invoiceData.termsSection.title}
            onChange={(e) => updateTermsSection("title", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Terms Content</label>
          <textarea
            value={invoiceData.termsSection.text}
            onChange={(e) => updateTermsSection("text", e.target.value)}
            className={inputClass}
            rows="4"
          />
        </div>
      </div>
    </Accordion>
  );
};

export default AdditionalInfoEditor