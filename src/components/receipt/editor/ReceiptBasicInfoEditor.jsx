import React, { useState } from "react";
import { Plus, Trash2, Edit3, Save, X } from "lucide-react";
import Accordion from "../../common/Accordion";
import Dropdown from "../../common/Dropdown";
import DateField from "../../common/DateField";
import { todayIso } from "../../common/dateUtils";
import {
  primaryButtonClass,
  secondaryButtonClass,
} from "../../invoice/data/data";

const ReceiptBasicInfoEditor = ({
  openSections,
  toggleEdit,
  toggleSection,
  labelClass,
  inputClass,
  receiptData,
  updateBasicInfo,
  currency,
  updateCurrency,
  themes,
  buttonClass,
  renderCurrencyOption,
  renderSelectedCurrency,
  renderThemeOption,
  renderSelectedTheme,
  updateTheme,
  addCustomField,
  updateCustomField,
  removeCustomField,
}) => {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [newField, setNewField] = useState({ label: "", value: "" });
  const [editingField, setEditingField] = useState(null);

  const handleAddCustomField = () => {
    if (newField.label.trim() && newField.value.trim()) {
      addCustomField("basic", newField);
      setNewField({ label: "", value: "" });
      setShowAddFieldModal(false);
    }
  };

  const handleEditField = (index, field, value) => {
    updateCustomField("basic", index, field, value);
  };

  const handleSaveEdit = () => {
    setEditingField(null);
  };

  const receiptDateError = !receiptData.receiptDate
    ? "Receipt date is required"
    : receiptData.receiptDate > todayIso()
      ? "Receipt date cannot be in the future"
      : "";

  return (
    <Accordion
      title="Receipt Details"
      isOpen={openSections.basic}
      onToggle={() => toggleSection("basic")}
      showEditIcon={true}
      onEdit={() => toggleEdit("basic")}
    >
      {openSections.basic && (
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Receipt Number</label>
              <input
                type="text"
                value={receiptData.receiptNumber}
                onChange={(e) => updateBasicInfo("receiptNumber", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Currency</label>
              <Dropdown
                value={receiptData.currency}
                onChange={(country) => updateCurrency(country.code)}
                options={currency.countries}
                placeholder="Select Currency"
                renderOption={renderCurrencyOption}
                renderSelected={renderSelectedCurrency}
              />
            </div>
            <div>
              <label className={labelClass}>Receipt Date</label>
              <DateField
                value={receiptData.receiptDate || ""}
                onChange={(value) => updateBasicInfo("receiptDate", value)}
                max={todayIso()}
                placeholder="Select receipt date"
                error={receiptDateError}
              />
            </div>
            <div>
              <label className={labelClass}>Theme</label>
              <Dropdown
                value={receiptData.theme}
                onChange={(theme) => updateTheme(theme.value)}
                options={themes}
                placeholder="Select Theme"
                renderOption={renderThemeOption}
                renderSelected={renderSelectedTheme}
              />
            </div>
          </div>

          {receiptData.customFields.basic.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-neutral-700 mb-3">Custom Fields</h4>
              <div className="space-y-3">
                {receiptData.customFields.basic.map((field, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                    {editingField === index ? (
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => handleEditField(index, "label", e.target.value)}
                          className={inputClass}
                          placeholder="Field Label"
                        />
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => handleEditField(index, "value", e.target.value)}
                          className={inputClass}
                          placeholder="Field Value"
                        />
                      </div>
                    ) : (
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <span className="text-sm font-medium text-neutral-800">{field.label}</span>
                        <span className="text-sm text-neutral-600">{field.value}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      {editingField === index ? (
                        <button onClick={handleSaveEdit} className="p-2 hover:bg-cyan-100 rounded transition-colors">
                          <Save size={16} className="text-cyan-600" />
                        </button>
                      ) : (
                        <button onClick={() => setEditingField(index)} className="p-2 hover:bg-neutral-200 rounded transition-colors">
                          <Edit3 size={16} className="text-neutral-600" />
                        </button>
                      )}
                      <button onClick={() => removeCustomField("basic", index)} className="p-2 hover:bg-red-100 rounded transition-colors">
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => setShowAddFieldModal(true)} className={buttonClass}>
            <Plus size={16} />
            <span className="text-sm font-mono">Add New Field</span>
          </button>

          {showAddFieldModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-md font-medium text-neutral-800">Add Custom Field</h3>
                  <button onClick={() => setShowAddFieldModal(false)} className="p-2 hover:bg-neutral-100 rounded cursor-pointer">
                    <X size={20} className="text-neutral-600" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelClass}>Field Label</label>
                    <input
                      type="text"
                      value={newField.label}
                      onChange={(e) => setNewField((prev) => ({ ...prev, label: e.target.value }))}
                      className={inputClass}
                      placeholder="e.g., Reference Number"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Field Value</label>
                    <input
                      type="text"
                      value={newField.value}
                      onChange={(e) => setNewField((prev) => ({ ...prev, value: e.target.value }))}
                      className={inputClass}
                      placeholder="Enter the field value"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button onClick={handleAddCustomField} disabled={!newField.label.trim() || !newField.value.trim()} className={primaryButtonClass}>
                      <span className="text-sm font-mono">Add Field</span>
                    </button>
                    <button onClick={() => { setShowAddFieldModal(false); setNewField({ label: "", value: "" }); }} className={secondaryButtonClass}>
                      <span className="text-sm font-mono">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Accordion>
  );
};

export default ReceiptBasicInfoEditor;


