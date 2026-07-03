const CURRENCY_FLAG_CODES = {
  USD: "us",
  INR: "in",
  GBP: "gb",
  EUR: "eu",
  JPY: "jp",
  CNY: "cn",
  CAD: "ca",
  AUD: "au",
  RUB: "ru",
  KRW: "kr",
  BRL: "br",
  MXN: "mx",
  SAR: "sa",
  CHF: "ch",
  ZAR: "za",
};

export const getFlagCode = (currencyCode) =>
  CURRENCY_FLAG_CODES[currencyCode] || currencyCode?.slice(0, 2).toLowerCase();

export const getFlagImageUrl = (currencyCode, size = "24x18") =>
  `https://flagcdn.com/${size}/${getFlagCode(currencyCode)}.png`;
