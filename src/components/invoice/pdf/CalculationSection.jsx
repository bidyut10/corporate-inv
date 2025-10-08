import React from "react";

const CalculationSection = ({ product }) => {
  const subtotal = product.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const tax = product.tax || 0;
  const total = subtotal + tax;

  return (
    <div className="flex justify-end items-center w-full mb-4">
      <div className="w-[40%]">
        <div className="flex justify-between items-center gap-x-10 py-2 border-b border-dashed border-neutral-50">
          <span className="text-xs">Tax</span>
          <span className="text-xs pr-2">
            {product.symbol} {product.tax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center gap-x-10 py-2 border-b border-dashed border-neutral-50">
          <span className="text-sm font-medium">Total</span>
          <span className="text-sm font-medium pr-2">
            {product.symbol} {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculationSection;
