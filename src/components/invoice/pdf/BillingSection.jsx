import React from "react";
import { usePdfTheme } from "./usePdfTheme";

const BillingSection = ({ sender, receiver, customFields = {} }) => {
  const t = usePdfTheme();

  return (
    <div className={`relative flex justify-between items-start border-b border-dashed ${t.border} w-full mb-4`}>
      <div className={`absolute top-0 bottom-0 left-1/2 border-l border-dashed ${t.border}`}></div>
      <div className="w-[50%] py-3 pr-3">
        <h3 className={`mb-2 text-xs font-medium ${t.heading}`}>{sender.header}</h3>
        <div className={`text-xs ${t.body}`}>
          <div className="mb-1">{sender.name}</div>
          <div className="mb-1">{sender.contact}</div>
          <div className="mb-1">{sender.address}</div>
          {customFields.company?.length > 0 && (
            <div className={`mt-2 pt-2 border-t border-dashed ${t.borderSoft}`}>
              {customFields.company.map((field, index) => (
                <div key={index} className="my-0.5 flex justify-between">
                  <span className="font-medium">{field.label}</span>
                  <span className="ml-2">{field.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-[50%] py-3 pl-3">
        <h3 className={`mb-2 text-xs font-medium ${t.heading}`}>{receiver.header}</h3>
        <div className={`text-xs ${t.body}`}>
          <div className="mb-1">{receiver.name}</div>
          <div className="mb-1">{receiver.contact}</div>
          <div className="mb-1">{receiver.address}</div>
          {customFields.client?.length > 0 && (
            <div className={`mt-2 pt-2 border-t border-dashed ${t.borderSoft}`}>
              {customFields.client.map((field, index) => (
                <div key={index} className="my-0.5 flex justify-between">
                  <span className="font-medium">{field.label}</span>
                  <span className="ml-2">{field.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
