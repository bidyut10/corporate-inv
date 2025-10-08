import React, { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";
import Logo from "./Logo";

const Navbar = ({
  onMenuToggle,
  onMenuClose,
  isMenuOpen,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMenuToggle = () => onMenuToggle();

  const handleMenuClose = () => onMenuClose();

  return (
    <nav className="fixed top-0 left-0 right-0 border-b w-full border-dashed border-neutral-200 bg-white text-neutral-800 transition-all duration-300 ease-in-out selection:bg-neutral-200 selection:text-neutral-950 dark:border-[#1c1c1c] dark:bg-[#181818] z-50">
      <div className="mx-auto flex h-16 max-w-full bg-white items-center justify-between">
        <div
          className={`flex items-center justify-between gap-4 ${
            isMobile ? "w-fit" : "w-[17%]"
          } border-x-none h-full px-4 md:px-6 xl:border-x xl:border-dashed xl:border-neutral-200`}
        >
          {isMobile ? (
            <>
              <button
                className="flex items-center w-8 h-8 p-2 cursor-pointer text-xs text-neutral-600 bg-neutral-50/50 rounded-md transition-all duration-200 group border border-transparent hover:border-neutral-200"
                onClick={isMenuOpen ? handleMenuClose : handleMenuToggle}
                type="button"
                style={{ touchAction: "manipulation" }}
                title={isMenuOpen ? "Close Menu" : "Open Menu"}
              >
                {isMenuOpen ? (
                  <X
                    className="pointer-events-none text-neutral-700 group-hover:text-neutral-700 group-hover:fill-neutral-600 transition-colors duration-300 ease-in-out"
                    strokeWidth={1.8}
                  />
                ) : (
                  <Menu
                    className="pointer-events-none text-neutral-700 group-hover:text-neutral-700 group-hover:fill-neutral-600 transition-colors duration-300 ease-in-out"
                    strokeWidth={1.8}
                  />
                )}
              </button>
              <div className="flex items-center justify-center gap-2">
                <Logo />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2">
                <Logo />
              </div>
            </>
          )}
        </div>

        <div
          className={`flex items-center justify-between gap-4 border-x-none h-full px-4 md:px-6 xl:border-x xl:border-dashed xl:border-neutral-200`}
        >
          <div className={`flex items-center justify-end gap-2`}>
            <button
              className="flex items-center w-8 h-8 p-2 cursor-pointer text-xs text-neutral-800 bg-neutral-50/50 rounded-md transition-all duration-200 group border border-transparent hover:border-neutral-100"
              onClick={() =>
                window.open("https://github.com/bidyut10", "_blank")
              }
              type="button"
              style={{ touchAction: "manipulation" }}
            >
              <Github
                size={14}
                className="pointer-events-none text-neutral-700  group-hover:text-neutral-700 transition-colors duration-300 ease-in-out"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
