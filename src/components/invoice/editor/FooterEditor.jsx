import React from 'react'
import Accordion from "../../common/Accordion";

const FooterEditor = ({
  openSections,
  toggleSection,
  toggleEdit,
  invoiceData,
  labelClass,
  updateThankyouSection,
  inputClass,
}) => {
  return (
    <Accordion
      title="Thank You Message"
      isOpen={openSections.thanks}
      onToggle={() => toggleSection("thanks")}
      showEditIcon={true}
      onEdit={() => toggleEdit("thanks")}
    >
      <div className="space-y-4 mt-4">
        <div>
          <label className={labelClass}>Section Title</label>
          <input
            type="text"
            value={invoiceData.thankyouSection.title}
            onChange={(e) => updateThankyouSection("title", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Thank You Message</label>
          <textarea
            value={invoiceData.thankyouSection.text}
            onChange={(e) => updateThankyouSection("text", e.target.value)}
            className={inputClass}
            rows="3"
          />
        </div>
      </div>
    </Accordion>
  );
};

export default FooterEditor