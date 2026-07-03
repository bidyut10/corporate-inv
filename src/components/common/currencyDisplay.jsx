import React from "react";
import CurrencyFlag from "./CurrencyFlag";

export const renderCurrencyOption = (country) => (
  <div className="flex items-center gap-2.5">
    <CurrencyFlag code={country.code} />
    <span>{country.name}</span>
    <span className="text-neutral-400">{country.symbol}</span>
  </div>
);

export const renderSelectedCurrency = (currencyCode, countries) => {
  const country = countries.find((c) => c.code === currencyCode);
  if (!country) return currencyCode;

  return (
    <div className="flex items-center gap-2">
      <CurrencyFlag code={country.code} />
      <span>{country.name}</span>
      <span className="text-neutral-400">{country.symbol}</span>
    </div>
  );
};
