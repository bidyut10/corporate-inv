import { getFlagImageUrl } from "./currencyFlags";

const CurrencyFlag = ({
  code,
  className = "h-3.5 w-5 shrink-0 rounded-[2px] object-cover border border-neutral-200/80",
}) => (
  <img
    src={getFlagImageUrl(code)}
    srcSet={`${getFlagImageUrl(code, "48x36")} 2x`}
    alt=""
    className={className}
    loading="lazy"
  />
);

export default CurrencyFlag;
