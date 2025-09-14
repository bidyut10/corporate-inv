import React, { useState } from "react";
import { X } from "lucide-react";

const CustomFieldModal = ({
  isOpen,
  onClose,
  onAdd,
  title = "Add Custom Field",
  labelClass,
  inputClass,
}) => {
  const [newField, setNewField] = useState({ label: "", value: "" });

  const handleAdd = () => {
    if (newField.label.trim() && newField.value.trim()) {
      onAdd(newField);
      setNewField({ label: "", value: "" });
      onClose();
    }
  };

  const handleClose = () => {
    setNewField({ label: "", value: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-neutral-800">{title}</h3>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-neutral-100 rounded"
          >
            <X size={20} className="text-neutral-600" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className={labelClass}>Field Label</label>
            <input
              type="text"
              value={newField.label}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, label: e.target.value }))
              }
              className={inputClass}
              placeholder="e.g., Tax ID, Registration Number"
            />
          </div>
          <div>
            <label className={labelClass}>Field Value</label>
            <input
              type="text"
              value={newField.value}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, value: e.target.value }))
              }
              className={inputClass}
              placeholder="Enter the field value"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAdd}
              disabled={!newField.label.trim() || !newField.value.trim()}
              className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
              Add Field
            </button>
            <button
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomFieldModal;
