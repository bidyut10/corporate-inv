import { FileText, Home, Tag, Wallet } from 'lucide-react';
import React from 'react'

const Sidebar = () => {
  return (
    <div className="w-full h-full bg-white px-4 py-4 border-r border-dashed border-neutral-200 animate-slide-in">
      <div className="flex justify-start items-center gap-2 bg-neutral-50/50 rounded-sm px-4 py-1">
        {/* <Wallet className="text-neutral-900" size={12} /> */}
        <h1 className="text-neutral-900 text-xs">Finance</h1>
      </div>
      <div className="ml-6 flex justify-start items-center gap-2 mt-3">
        <FileText className="text-neutral-900" size={12} />
        <h1 className="text-neutral-900 text-sm">Create Invoice</h1>
      </div>
      <div className="ml-6 flex justify-start items-center gap-2 mt-3">
        <FileText className="text-neutral-800" size={13} />
        <h1 className="text-neutral-800 text-sm">Create Receipt</h1>
      </div>
      <div className="flex justify-start items-center gap-2 bg-neutral-50/50 rounded-sm px-4 py-1 mt-6">
        {/* <Home className="text-neutral-800" size={10} /> */}
        <h1 className="text-neutral-800 text-xs">Product</h1>
      </div>
      <div className="flex justify-start items-center gap-2 mt-3 ml-6">
        <Tag className="text-neutral-900" size={12} />
        <h1 className="text-neutral-900 text-sm">Create Label</h1>
      </div>
      {/* <div className="flex justify-start items-center gap-2 mt-3 ml-6">
        <FileText className="text-neutral-600" size={13} />
        <h1 className="text-neutral-600 text-sm">Create Receipt</h1>
      </div> */}
    </div>
  );
}

export default Sidebar