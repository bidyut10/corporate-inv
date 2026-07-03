import React, { useEffect, useRef, useState } from "react";
import { usePdfTheme } from "./usePdfTheme";

const PaymentSection = ({ payment, signature, text }) => {
  const t = usePdfTheme();
  const leftRef = useRef(null);
  const [leftHeight, setLeftHeight] = useState(0);

  useEffect(() => {
    if (leftRef.current) {
      setLeftHeight(leftRef.current.offsetHeight);
    }
  }, [payment]);

  return (
    <div className={`flex justify-start items-center w-full border-y border-dashed ${t.border} mb-4`}>
      <div
        ref={leftRef}
        className={`w-[50%] py-3 pr-6 border-r border-dashed ${t.border}`}
      >
        <h3 className={`text-xs font-medium mb-3 ${t.heading}`}>Payment Information</h3>
        {payment?.map((item, index) => {
          const [field, value] = Object.entries(item)[0];
          return (
            <div key={index} className="flex justify-between items-center gap-4">
              <h3 className={`text-xs mb-1 ${t.body}`}>{field}</h3>
              <h3 className={`text-xs mb-1 ${t.body}`}>{value}</h3>
            </div>
          );
        })}
      </div>
      <div
        className="w-[50%] flex flex-col justify-center items-center"
        style={{ height: leftHeight }}
      >
        <div className="w-full flex h-[60%] pt-2 justify-center items-center">
          {signature && (
            <img src={signature} alt="signature" className="object-contain max-h-full" />
          )}
        </div>
        <div className="w-full h-[40%] flex justify-center items-center">
          <h1 className={`text-[10px] w-full text-center py-1 ${t.signatureBar}`}>{text}</h1>
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;
