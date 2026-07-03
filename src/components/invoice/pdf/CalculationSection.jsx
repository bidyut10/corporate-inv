import React from "react";
import { usePdfTheme } from "./usePdfTheme";

const CalculationSection = ({ product }) => {
  const t = usePdfTheme();
  const subtotal = product.items.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );
  const total = subtotal + (product.tax || 0);

  return (
    <div className="flex justify-end items-center w-full mb-4">
      <div className="w-[40%]">
        <div className={`flex justify-between items-center gap-x-10 py-2 border-b border-dashed ${t.borderSoft}`}>
          <span className={`text-xs ${t.body}`}>Tax</span>
          <span className={`text-xs pr-2 ${t.body}`}>
            {product.symbol} {product.tax.toFixed(2)}
          </span>
        </div>
        <div className={`flex justify-between items-center gap-x-10 py-2 border-b border-dashed ${t.borderSoft}`}>
          <span className={`text-sm font-medium ${t.heading}`}>Total</span>
          <span className={`text-sm font-medium pr-2 ${t.heading}`}>
            {product.symbol} {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CalculationSection;
