import React from "react";

const BillingSection = ({ sender, receiver, customFields = {} }) => {
  return (
    <div className="relative flex justify-between items-start border-b border-dashed border-neutral-100 w-full mb-4">
      {/* Middle Vertical Divider */}
      <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-neutral-100"></div>

      {/* Sender Side */}
      <div className="w-[50%] py-3 pr-3">
        <h3 className="mb-2 text-xs text-neutral-800 font-medium">
          {sender.header}
        </h3>
        <div className="text-xs text-neutral-600">
          <div className="mb-1">{sender.name}</div>
          <div className="mb-1">{sender.contact}</div>
          <div className="mb-1">{sender.address}</div>

          {/* Custom Fields for Sender (Company) */}
          {customFields.company && customFields.company.length > 0 && (
            <div className="mt-2 pt-2 border-t border-dashed border-neutral-50">
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

      {/* Receiver Side */}
      <div className="w-[50%] py-3 pl-3">
        <h3 className="mb-2 text-xs text-neutral-800 font-medium">
          {receiver.header}
        </h3>
        <div className="text-xs text-neutral-600">
          <div className="mb-1">{receiver.name}</div>
          <div className="mb-1">{receiver.contact}</div>
          <div className="mb-1">{receiver.address}</div>

          {/* Custom Fields for Receiver (Client) */}
          {customFields.client && customFields.client.length > 0 && (
            <div className="mt-2 pt-2 border-t border-dashed border-neutral-50">
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
