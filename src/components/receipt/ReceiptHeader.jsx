import React, { useEffect, useRef, useState } from "react";
import { usePdfTheme } from "../invoice/pdf/usePdfTheme";

const ReceiptHeader = ({ receipt, logo, customFields = [] }) => {
  const t = usePdfTheme();
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
  }, [receipt, customFields]);

  return (
    <div className={`relative flex justify-between items-start border-y border-dashed ${t.border} w-full`}>
      <div className={`absolute top-0 bottom-0 left-1/2 border-l border-dashed ${t.border}`}></div>
      <div ref={leftRef} className={`py-2 pr-4 w-[50%] text-xs ${t.body}`}>
        <div className="flex justify-between items-center my-0.5">
          <span className={t.label}>Receipt Number</span>
          <span className="ml-2">{receipt.receiptNumber}</span>
        </div>
        <div className="flex justify-between items-center my-0.5">
          <span className={t.label}>Receipt Date</span>
          <span className="ml-2">{receipt.receiptDate}</span>
        </div>
        <div className="flex justify-between items-center my-0.5">
          <span className={t.label}>Currency</span>
          <span className="ml-2">{receipt.currency}</span>
        </div>
        {customFields?.map((field, index) => (
          <div key={index} className="flex justify-between items-center my-0.5">
            <span className={t.label}>{field.label}</span>
            <span className="ml-2">{field.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end w-[50%] py-2" style={{ height: leftHeight }}>
        <img className="max-h-full object-contain" src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default ReceiptHeader;
