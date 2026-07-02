import { useEffect, useState } from "react";
import { Check } from "lucide-react";

const STEPS = [
  {
    id: "fill",
    title: "Fill in your details",
    subtitle: "Business, client, and items",
  },
  {
    id: "generate",
    title: "Generating invoice",
    subtitle: "Building your document",
  },
  {
    id: "ready",
    title: "Invoice ready",
    subtitle: "Everything looks good",
  },
  {
    id: "download",
    title: "Download ready",
    subtitle: "",
  },
];

function InvoiceCard({ lines = 0, showTotal = false }) {
  const rows = [
    { name: "Website design", amount: 850 },
    { name: "Revisions", amount: 100 },
    { name: "Consultation", amount: 50 },
  ];

  return (
    <div className="w-[168px] rounded-xl border border-neutral-200 bg-white p-2.5 shadow-sm md:w-[208px]">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-[7px] font-semibold tracking-wide text-neutral-900">INVOICE</p>
          <p className="mt-0.5 text-[6px] text-neutral-400">#1042 · Jul 2</p>
        </div>
        <div className="h-4 w-4 rounded border border-neutral-200 bg-neutral-50" />
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-dashed border-neutral-100 pt-2 text-[6px]">
        <div>
          <p className="text-neutral-400">From</p>
          <p className="mt-0.5 font-medium text-neutral-800">Acme Studio</p>
        </div>
        <div>
          <p className="text-neutral-400">Bill to</p>
          <p className="mt-0.5 font-medium text-neutral-800">Northwind Co.</p>
        </div>
      </div>

      <div className="mt-2 space-y-1 border-t border-neutral-100 pt-2">
        {rows.map((row, index) => (
          <div
            key={row.name}
            className={`flex justify-between text-[7px] transition-opacity duration-300 ${
              index < lines ? "text-neutral-600 opacity-100" : "opacity-15"
            }`}
          >
            <span>{row.name}</span>
            <span className="font-medium text-neutral-900">${row.amount}</span>
          </div>
        ))}
      </div>

      <div
        className={`mt-2 flex justify-between border-t border-neutral-900/10 pt-2 text-[8px] font-semibold text-neutral-900 transition-opacity duration-300 ${
          showTotal ? "opacity-100" : "opacity-0"
        }`}
      >
        <span>Total</span>
        <span>$1,000</span>
      </div>
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <div className="flex shrink-0 items-center justify-between px-4 pt-2 text-[7px] font-medium text-neutral-900">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <span className="h-1 w-1 rounded-full bg-neutral-900" />
        <span className="h-1 w-1 rounded-full bg-neutral-900" />
        <span className="h-1 w-1 rounded-full bg-neutral-900" />
        <span className="ml-1 h-2 w-3 rounded-sm border border-neutral-900" />
      </div>
    </div>
  );
}

function FillDetailsVisual() {
  const fields = [
    { label: "Your business", value: "Acme Studio" },
    { label: "Client", value: "Northwind Co." },
    { label: "Item", value: "Website design" },
    { label: "Amount", value: "$1,000" },
  ];

  return (
    <div className="w-[168px] rounded-xl border border-neutral-200 bg-white p-2.5 shadow-sm md:w-[208px]">
      <p className="mb-2 text-[7px] font-medium text-neutral-900">New invoice</p>
      {fields.map((field, index) => (
        <div
          key={field.label}
          className={index > 0 ? "mt-2 border-t border-neutral-100 pt-2" : ""}
        >
          <p className="text-[6px] text-neutral-400">{field.label}</p>
          <p className="mt-0.5 text-[8px] font-medium text-neutral-900">
            {field.value}
            {index === fields.length - 1 && (
              <span className="ml-0.5 inline-block h-2.5 w-px animate-pulse bg-neutral-900" />
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

function GenerateVisual() {
  return (
    <div className="relative">
      <InvoiceCard lines={2} showTotal={false} />
      <div className="absolute inset-0 animate-pulse rounded-xl bg-white/50" />
    </div>
  );
}

function ReadyVisual() {
  return <InvoiceCard lines={3} showTotal />;
}

function DownloadVisual() {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 shadow-sm">
        <Check className="h-5 w-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="text-center">
        <p className="text-[10px] font-medium text-neutral-900">Download ready</p>
        <p className="mt-0.5 text-[7px] text-neutral-400">invoice-1042.pdf</p>
      </div>
    </div>
  );
}

const visuals = {
  fill: FillDetailsVisual,
  generate: GenerateVisual,
  ready: ReadyVisual,
  download: DownloadVisual,
};

export default function InvoiceSkeleton() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setStep((current) => (current + 1) % STEPS.length),
      3200,
    );
    return () => clearInterval(timer);
  }, []);

  const current = STEPS[step];
  const Visual = visuals[current.id];
  const showCaption = current.id !== "download";

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#fafafa] pb-3 pt-[10%]">
      <PhoneStatusBar />
      <div className="border-b border-neutral-100 bg-white px-3 py-1.5 text-center">
        <span className="font-mono text-[8px] font-medium text-neutral-900">Paperdoc</span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center px-3 pt-2">
        <div className="flex h-[156px] items-center justify-center md:h-[168px]">
          <div key={current.id} className="flex flex-col items-center">
            <Visual />
          </div>
        </div>

        {showCaption && (
          <div className="mt-3 text-center">
            <p className="text-[10px] font-medium text-neutral-900">{current.title}</p>
            {current.subtitle && (
              <p className="mt-0.5 text-[8px] text-neutral-400">{current.subtitle}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex shrink-0 justify-center gap-1.5 px-3 pt-1">
        {STEPS.map((item, index) => (
          <span
            key={item.id}
            className={`h-1 rounded-full bg-neutral-900 transition-all duration-300 ${
              index === step ? "w-4 opacity-100" : "w-1 opacity-20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
