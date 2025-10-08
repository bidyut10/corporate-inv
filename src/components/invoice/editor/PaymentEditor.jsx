import React from 'react'
import Accordion from "../../common/Accordion";
import{Plus, Trash2} from 'lucide-react'

const PaymentEditor = ({
  openSections,
  toggleSection,
  toggleEdit,
  invoiceData,
  labelClass,
  updatePayment,
  inputClass,
  removePaymentField,
  addPaymentField,
  buttonClass,
}) => {
  return (
    <Accordion
      title="Payment Information"
      isOpen={openSections.payment}
      onToggle={() => toggleSection("payment")}
      showEditIcon={true}
      onEdit={() => toggleEdit("payment")}
    >
      <div className="space-y-4 mt-4">
        {invoiceData.payment.map((item, index) => (
          <div key={index} className="flex gap-3 items-end">
            <div className="flex-1">
              <label className={labelClass}>Label</label>
              <input
                type="text"
                value={item.label}
                onChange={(e) => updatePayment(index, "label", e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Value</label>
              <input
                type="text"
                value={item.value}
                onChange={(e) => updatePayment(index, "value", e.target.value)}
                className={inputClass}
              />
            </div>
            {invoiceData.payment.length > 1 && (
              <button
                onClick={() => removePaymentField(index)}
                className="p-[8.5px] text-red-500 rounded-sm hover:bg-red-50/50 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
        <button onClick={addPaymentField} className={buttonClass}>
          <Plus size={16} />
          <h1 className="text-sm font-mono">Add New Field</h1>
        </button>
      </div>
    </Accordion>
  );
};

export default PaymentEditor