const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      {/* Fixed: Reduced padding from p-3 to p-2, adjusted SVG size and viewBox */}
      <div className="bg-gradient-to-br from-orange-400 to-orange-500 w-8 h-8 rounded-lg border-2 border-orange-400 relative  flex justify-center items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        <div className="relative">
          {/* Centered document icon only */}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            {/* Main document stack - centered */}
            <rect
              x="6"
              y="4"
              width="12"
              height="16"
              rx="2"
              fill="white"
              stroke="none"
            />
            <rect
              x="7"
              y="5"
              width="10"
              height="14"
              rx="1"
              fill="#f8f9fa"
              stroke="none"
            />

            {/* Professional document header */}
            <rect x="8" y="6.5" width="8" height="2" rx="1" fill="#fb923c" />

            {/* Corporate text blocks - structured layout */}
            <rect x="8" y="10" width="7" height="0.6" rx="0.3" fill="#d1d5db" />
            <rect
              x="8"
              y="11.2"
              width="5.5"
              height="0.6"
              rx="0.3"
              fill="#d1d5db"
            />
            <rect
              x="8"
              y="12.4"
              width="6.5"
              height="0.6"
              rx="0.3"
              fill="#d1d5db"
            />

            {/* Business chart/graph representation */}
            <rect x="8" y="15" width="1" height="2.5" rx="0.2" fill="#fb923c" />
            <rect
              x="9.5"
              y="15.5"
              width="1"
              height="2"
              rx="0.2"
              fill="#fb923c"
            />
            <rect
              x="11"
              y="14.5"
              width="1"
              height="3"
              rx="0.2"
              fill="#fb923c"
            />
            <rect
              x="12.5"
              y="15.2"
              width="1"
              height="2.3"
              rx="0.2"
              fill="#fb923c"
            />
            <rect
              x="14"
              y="15.8"
              width="1"
              height="1.7"
              rx="0.2"
              fill="#fb923c"
            />
          </svg>
        </div>
      </div>

      <div className="ml-1">
        <h1 className="text-md font-bold text-neutral-900">Paperdoc</h1>
        <p className="text-[10px] text-neutral-600 mt-">Docs made effortless</p>
      </div>
    </div>
  );
};

export default Logo;
