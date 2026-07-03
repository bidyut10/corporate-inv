import React, { useState } from "react";
import Accordion from "../../common/Accordion";
import NumberInput from "../../common/NumberInput";
import { Plus, Trash2, Edit3, Save } from "lucide-react";
import CustomItemModal from "../../common/CustomItemModal";
import { editorInputClass, primaryButtonClass, secondaryButtonClass } from "../data/data";

const numberInputClass = `${editorInputClass}`;

const ItemsEditor = ({
  invoiceData,
  openSections,
  toggleEdit,
  toggleSection,
  removeItem,
  editingStates,
  updateTax,
  updateReceivedAmount,
  buttonClass,
  updateItem,
  addItem,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [itemForm, setItemForm] = useState({
    name: "",
    description: "",
    qty: 1,
    price: 0,
  });

  const handleAddClick = () => {
    setItemForm({ name: "", description: "", qty: 1, price: 0 });
    setShowAddModal(true);
  };

  const handleEditClick = (index) => {
    const item = invoiceData.items[index];
    setItemForm({ ...item });
    setEditingIndex(index);
    setShowEditModal(true);
  };

  const handleAddSubmit = () => {
    if (itemForm.name.trim()) {
      addItem(itemForm);
      setShowAddModal(false);
      setItemForm({ name: "", description: "", qty: 1, price: 0 });
    }
  };

  const handleEditSubmit = () => {
    if (itemForm.name.trim() && editingIndex !== null) {
      Object.keys(itemForm).forEach((key) => {
        updateItem(editingIndex, key, itemForm[key]);
      });
      setShowEditModal(false);
      setEditingIndex(null);
      setItemForm({ name: "", description: "", qty: 1, price: 0 });
    }
  };

  const handleInputChange = (field, value) => {
    setItemForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Accordion
        title={`Invoice Items (${invoiceData.items.length})`}
        isOpen={openSections.items}
        onToggle={() => toggleSection("items")}
      >
        <div className="mt-4">
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {invoiceData.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-neutral-50/50 rounded-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-medium text-neutral-600">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-xs text-neutral-800">
                      {item.name}
                    </div>
                    <div className="text-[10px] text-neutral-600">
                      {item.description}
                    </div>
                    <div className="text-[10px] text-blue-600">
                      {invoiceData.symbol}
                      {item.price} × {item.qty} Qty
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <div className="font-medium text-xs text-neutral-800">
                      Total: {invoiceData.symbol}
                      {(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEditClick(index)}
                    className="p-2 hover:bg-neutral-100 cursor-pointer rounded"
                  >
                    <Edit3 size={14} className="text-neutral-600" />
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="p-2 hover:bg-red-50/50 cursor-pointer rounded"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-dashed border-neutral-100 mb-4">
            <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
              <span className="font-medium text-xs text-neutral-800">
                Tax Amount
              </span>
              {editingStates.tax ? (
                <div className="flex gap-2">
                  <NumberInput
                    value={invoiceData.tax}
                    onChange={updateTax}
                    min={0}
                    className={`${numberInputClass} w-24 px-2 py-1`}
                  />
                  <button
                    onClick={() => toggleEdit("tax")}
                    className="p-2 rounded bg-neutral-100/50 hover:bg-cyan-100/50 cursor-pointer"
                  >
                    <Save className="size-4 text-neutral-700" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <span className="font-medium text-xs text-neutral-800">
                    {invoiceData.symbol}
                    {invoiceData.tax.toFixed(2)}
                  </span>
                  <button
                    onClick={() => toggleEdit("tax")}
                    className="p-2 hover:bg-neutral-100 cursor-pointer rounded"
                  >
                    <Edit3 size={14} className="text-neutral-600" />
                  </button>
                </div>
              )}
            </div>

            {updateReceivedAmount && (
              <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg mt-3">
                <span className="font-medium text-xs text-neutral-800">Amount Received</span>
                {editingStates.receivedAmount ? (
                  <div className="flex gap-2">
                    <NumberInput
                      value={invoiceData.receivedAmount ?? 0}
                      onChange={updateReceivedAmount}
                      min={0}
                      className={`${numberInputClass} w-24 px-2 py-1`}
                    />
                    <button
                      onClick={() => toggleEdit("receivedAmount")}
                      className="p-2 rounded bg-neutral-100/50 hover:bg-neutral-200/50 cursor-pointer"
                    >
                      <Save className="size-4 text-neutral-700" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-xs text-neutral-800">
                      {invoiceData.symbol}
                      {(invoiceData.receivedAmount ?? 0).toFixed(2)}
                    </span>
                    <button
                      onClick={() => toggleEdit("receivedAmount")}
                      className="p-2 hover:bg-neutral-100 cursor-pointer rounded"
                    >
                      <Edit3 size={14} className="text-neutral-600" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={handleAddClick} className={buttonClass}>
            <Plus size={16} />
            <h1 className="text-sm font-mono">Add New Item</h1>
          </button>
        </div>
      </Accordion>

      {/* Add Item Modal */}
      <CustomItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Item"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={itemForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`${editorInputClass} w-full`}
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              value={itemForm.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={`${editorInputClass} w-full`}
              placeholder="Enter item description"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Quantity
              </label>
              <NumberInput
                value={itemForm.qty}
                onChange={(value) => handleInputChange("qty", value)}
                min={1}
                className={numberInputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Price ({invoiceData.symbol})
              </label>
              <NumberInput
                value={itemForm.price}
                onChange={(value) => handleInputChange("price", value)}
                min={0}
                className={numberInputClass}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddSubmit}
              disabled={!itemForm.name.trim()}
              className={primaryButtonClass}
            >
              <span className="text-sm font-mono">Add Item</span>
            </button>
            <button
              onClick={() => setShowAddModal(false)}
              className={secondaryButtonClass}
            >
              <span className="text-sm font-mono">Cancel</span>
            </button>
          </div>
        </div>
      </CustomItemModal>

      {/* Edit Item Modal */}
      <CustomItemModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Item"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Item Name
            </label>
            <input
              type="text"
              value={itemForm.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={editorInputClass}
              placeholder="Enter item name"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              value={itemForm.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className={editorInputClass}
              placeholder="Enter item description"
              rows="3"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Quantity
              </label>
              <NumberInput
                value={itemForm.qty}
                onChange={(value) => handleInputChange("qty", value)}
                min={1}
                className={numberInputClass}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Price ({invoiceData.symbol})
              </label>
              <NumberInput
                value={itemForm.price}
                onChange={(value) => handleInputChange("price", value)}
                min={0}
                className={numberInputClass}
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleEditSubmit}
              disabled={!itemForm.name.trim()}
              className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded hover:bg-neutral-950 disabled:bg-neutral-300 disabled:cursor-not-allowed transition-colors"
            >
              Update Item
            </button>
            <button
              onClick={() => setShowEditModal(false)}
              className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </CustomItemModal>
    </>
  );
};

export default ItemsEditor;
