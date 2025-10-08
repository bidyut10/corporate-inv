export const defaultReceiptData = {
  receiptNumber: "RCPT-0001",
  receiptDate: new Date().toISOString().slice(0, 10),
  currency: "USD",
  symbol: "$",
  billedBy: {
    name: "Corporate AI Ltd",
    contact: "billing@corpai.com",
    address: "123 Main St, Anytown, USA",
  },
  billedTo: {
    name: "John Doe",
    contact: "8617698611",
    address: "456 Second St, Anytown, USA",
  },
  items: [
    { name: "Service", description: "Consulting", qty: 1, price: 100.0 },
  ],
  tax: 0,
  receivedAmount: 100.0,
  payment: [
    { label: "Payment Method", value: "Bank transfer" },
    { label: "Transaction Id", value: "TXN-123456" },
  ],
  termsSection: { title: "Notes", text: "Payment received in full." },
  thankyouSection: { title: "Thank you!", text: "We appreciate your payment." },
  signatureText: "Authorized Signature",
  customFields: { basic: [], company: [], client: [] },
};

