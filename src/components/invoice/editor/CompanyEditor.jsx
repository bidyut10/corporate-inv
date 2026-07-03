import React, { useState } from "react";
import { Plus, Edit3, Save, Trash2 } from "lucide-react";
import Accordion from "../../common/Accordion";
import CustomFieldModal from "../../common/CustomFieldModal";

const CompanyEditor = ({
  openSections,
  toggleEdit,
  toggleSection,
  labelClass,
  inputClass,
  invoiceData,
  buttonClass,
  updateBilledBy,
  addCustomField,
  updateCustomField,
  removeCustomField,
}) => {
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [editingField, setEditingField] = useState(null);

  const handleAddCustomField = (field) => {
    addCustomField("company", field);
  };

  const handleEditField = (index, field, value) => {
    updateCustomField("company", index, field, value);
  };

  const handleSaveEdit = () => {
    setEditingField(null);
  };

  return (
    <Accordion
      title="Company Details"
      isOpen={openSections.company}
      onToggle={() => toggleSection("company")}
      showEditIcon={true}
      onEdit={() => toggleEdit("company")}
    >
      <div className="space-y-4 mt-4">
        <div>
          <label className={labelClass}>Company Name</label>
          <input
            type="text"
            value={invoiceData.billedBy.name}
            onChange={(e) => updateBilledBy("name", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Contact Information</label>
          <input
            type="text"
            value={invoiceData.billedBy.contact}
            onChange={(e) => updateBilledBy("contact", e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Address</label>
          <textarea
            value={invoiceData.billedBy.address}
            onChange={(e) => updateBilledBy("address", e.target.value)}
            className={inputClass}
            rows="3"
          />
        </div>

        {/* Custom Fields Section */}
        {invoiceData.customFields.company.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-neutral-700 mb-3">
              Custom Fields
            </h4>
            <div className="space-y-3">
              {invoiceData.customFields.company.map((field, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg"
                >
                  {editingField === index ? (
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) =>
                          handleEditField(index, "label", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Field Label"
                      />
                      <input
                        type="text"
                        value={field.value}
                        onChange={(e) =>
                          handleEditField(index, "value", e.target.value)
                        }
                        className={inputClass}
                        placeholder="Field Value"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <span className="text-sm font-medium text-neutral-800">
                        {field.label}
                      </span>
                      <span className="text-sm text-neutral-600">
                        {field.value}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    {editingField === index ? (
                      <button
                        onClick={handleSaveEdit}
                        className="p-2 hover:bg-cyan-100 rounded transition-colors"
                      >
                        <Save size={16} className="text-cyan-600" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setEditingField(index)}
                        className="p-2 hover:bg-neutral-200 rounded transition-colors"
                      >
                        <Edit3 size={16} className="text-neutral-600" />
                      </button>
                    )}
                    <button
                      onClick={() => removeCustomField("company", index)}
                      className="p-2 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() => setShowAddFieldModal(true)}
          className={buttonClass}
        >
          <Plus size={16} />
          <h1 className="text-sm font-mono">Add New Field</h1>
        </button>

        {/* Add Field Modal */}
        <CustomFieldModal
          isOpen={showAddFieldModal}
          onClose={() => setShowAddFieldModal(false)}
          onAdd={handleAddCustomField}
          title="Add Custom Field"
          labelClass={labelClass}
          inputClass={inputClass}
        />
      </div>
    </Accordion>
  );
};

export default CompanyEditor;
