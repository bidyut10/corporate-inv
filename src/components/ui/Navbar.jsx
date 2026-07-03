import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 border-b w-full border-neutral-100 bg-white text-neutral-800 transition-all duration-300 ease-in-out selection:bg-neutral-200 selection:text-neutral-950 dark:border-[#1c1c1c] dark:bg-[#181818] z-50">
      <div className="mx-auto flex h-16 max-w-full bg-white items-center justify-between">
        {isMobile ? (
          <div className="flex w-full items-center justify-between px-4 md:px-6">
            <Logo className="h-8 md:h-12" />
            <button
              className="flex items-center group"
              onClick={isMenuOpen ? handleMenuClose : handleMenuToggle}
              type="button"
              style={{ touchAction: "manipulation" }}
              title={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? (
                <X
                  className="pointer-events-none text-neutral-800 group-hover:text-neutral-950 transition-colors duration-300 ease-in-out"
                  strokeWidth={1.8}
                  size={24}
                />
              ) : (
                <Menu
                  className="pointer-events-none text-neutral-800 group-hover:text-neutral-950 transition-colors duration-240 ease-in-out"
                  strokeWidth={1.8}
                  size={24}
                />
              )}
            </button>
          </div>
        ) : (
          <>
            <div className="flex w-[17%] items-center border-x-none h-full px-4 md:px-6 xl:border-x xl:border-neutral-100">
              <Logo className="h-10" />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
