import React from "react";
import { usePdfTheme } from "./usePdfTheme";

const ItemsSection = ({ product }) => {
  const t = usePdfTheme();

  return (
    <div>
      <div className={`grid grid-cols-12 gap-2 ${t.tableHeader} p-2 text-xs font-medium`}>
        <div className="col-span-1 text-left">No.</div>
        <div className="col-span-6">Item</div>
        <div className="col-span-1 text-center">Quantity</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">Total</div>
      </div>
      {product?.items.map((item, index) => (
        <div key={index} className={`p-2 border-b border-dashed ${t.border}`}>
          <div className="grid grid-cols-12 gap-2 items-start">
            <div className={`col-span-1 text-start text-[10px] ${t.body}`}>{index + 1}.</div>
            <div className="col-span-6">
              <div className={`font-medium text-xs ${t.body} mb-1`}>{item.name}</div>
              <div className={`text-xs ${t.body}`}>{item.description}</div>
            </div>
            <div className={`col-span-1 text-center text-xs ${t.body}`}>{item.qty}</div>
            <div className={`col-span-2 text-right text-xs ${t.body}`}>
              {product.symbol} {item.price.toFixed(2)}
            </div>
            <div className={`col-span-2 text-right text-xs ${t.body}`}>
              {product.symbol} {(item.qty * item.price).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemsSection;
