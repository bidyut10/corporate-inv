export default function PhoneFrame({ children, className = "" }) {
  return (
    <div
      className={`relative aspect-[71.6/140] w-[260px] overflow-hidden rounded-[1.85rem] border-[3px] border-[#1c1c1e] bg-white shadow-[0_22px_55px_-14px_rgba(0,0,0,0.3)] sm:w-[216px] sm:rounded-[2rem] md:w-[256px] md:rounded-[2.3rem] ${className}`}
    >
      <div
        className="absolute left-1/2 top-[1.6%] z-20 h-[3.6%] w-[28%] -translate-x-1/2 rounded-full bg-black"
        aria-hidden="true"
      />
      <div className="absolute inset-[3px] flex flex-col overflow-hidden rounded-[1.55rem] bg-white sm:rounded-[1.7rem] md:rounded-[1.85rem]">
        {children}
      </div>
    </div>
  );
}
