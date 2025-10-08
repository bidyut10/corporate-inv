import React from 'react'

const ItemsSection = ({product}) => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 bg-neutral-50/50 text-neutral-800 p-2 text-xs font-medium">
        <div className="col-span-1 text-left">No.</div>
        <div className="col-span-6">Item</div>
        <div className="col-span-1 text-center">Quantity</div>
        <div className="col-span-2 text-right">Price</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      {product?.items.map((item, index) => (
        <div
          key={index}
          className="p-2 border-b  border-dashed border-neutral-100"
        >
          <div className="grid grid-cols-12 gap-2 items-start">
            <div className="col-span-1 text-start text-[10px] text-neutral-600">
              {index + 1}.
            </div>
            <div className="col-span-6">
              <div className="font-medium text-xs text-neutral-600 mb-1">
                {item.name}
              </div>
              <div className="text-xs text-neutral-600">{item.description}</div>
            </div>
            <div className="col-span-1 text-center text-xs text-neutral-600">
              {item.qty}
            </div>
            <div className="col-span-2 text-right text-xs text-neutral-600">
              {product.symbol} {item.price.toFixed(2)}
            </div>
            <div className="col-span-2 text-right text-xs text-neutral-600">
              {product.symbol} {(item.qty * item.price).toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsSection