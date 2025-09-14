import React, { useEffect, useRef, useState } from "react";

const InvoiceHeader = ({ invoice, logo, customFields = [] }) => {
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
  }, [invoice, customFields]);

  return (
    <div className="relative flex justify-between items-start border-y border-dashed border-neutral-100 w-full">
      {/* Middle Vertical Divider */}
      <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-neutral-100"></div>
      <div ref={leftRef} className="py-2 pr-4 w-[50%] text-xs">
        {/* Default Fields */}
        <div className="flex justify-between items-center my-0.5">
          <span className="text-black">Serial Number</span>
          <span className="ml-2">{invoice.serialNumber}</span>
        </div>
        <div className="flex justify-between items-center my-0.5">
          <span className="text-black">Date of Issue</span>
          <span className="ml-2">{invoice.issueDate}</span>
        </div>
        <div className="flex justify-between items-center my-0.5">
          <span className="text-black">Due Date</span>
          <span className="ml-2">{invoice.dueDate}</span>
        </div>
        <div className="flex justify-between items-center my-0.5">
          <span className="text-black">Currency</span>
          <span className="ml-2">{invoice.currency}</span>
        </div>

        {/* Custom Fields */}
        {customFields &&
          customFields.length > 0 &&
          customFields.map((field, index) => (
            <div
              key={index}
              className="flex justify-between items-center my-0.5"
            >
              <span className="text-black">{field.label}</span>
              <span className="ml-2">{field.value}</span>
            </div>
          ))}
      </div>

      <div
        className="flex items-center justify-end w-[50%] py-2"
        style={{ height: leftHeight }}
      >
        <img className="max-h-full object-contain" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default InvoiceHeader;
