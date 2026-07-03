export default function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative aspect-[71.6/140] w-[260px] rounded-[2.375rem] bg-[#1c1c1e] shadow-[0_22px_55px_-14px_rgba(0,0,0,0.28)] sm:w-[216px] sm:rounded-[1.96875rem] md:w-[256px] md:rounded-[2.3375rem] ${className}`}
    >
      <div
        className="absolute -left-[3px] top-[17%] h-[8%] w-[3px] rounded-l-full bg-[#171719]"
        aria-hidden="true"
      />
      <div
        className="absolute -left-[3px] top-[28%] h-[11%] w-[3px] rounded-l-full bg-[#171719]"
        aria-hidden="true"
      />
      <div
        className="absolute -right-[3px] top-[24%] h-[15%] w-[3px] rounded-r-full bg-[#171719]"
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-[2.5%] z-20 flex h-[3.7%] w-[26%] -translate-x-1/2 items-center justify-center gap-[8%] rounded-full bg-black"
        aria-hidden="true"
      >
        <span className="h-[38%] aspect-square rounded-full bg-[#171717]" />
        <span className="h-[28%] aspect-square rounded-full bg-[#242424]" />
      </div>
      <div className="absolute inset-[7px] overflow-hidden rounded-[1.9375rem] bg-white sm:inset-[6px] sm:rounded-[1.59375rem] md:inset-[7px] md:rounded-[1.9rem]">
        {children}
      </div>
    </div>
  );
}
