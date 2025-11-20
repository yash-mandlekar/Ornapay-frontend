"use client";
import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";
import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  RotateCcw,
  Menu,
  X,
} from "lucide-react";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();
  const product = { length: 3 };
  const handleStickyMenu = () => {
    setStickyMenu(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => window.removeEventListener("scroll", handleStickyMenu);
  }, []);

  const menuItems = [
    {
      title: "Popular",
      path: "/",
    },
    {
      title: "Shop",
      path: "/shop",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  const handleOpenCartModal = () => {
    openCartModal();
  };

  return (
    <header
      className={`fixed left-0 top-0 w-full z-50 bg-white transition-all duration-300 ${
        stickyMenu ? "shadow-lg" : ""
      }`}
    >
      {/* Top Bar */}
      <div
        className={`transition-all duration-300 ${
          stickyMenu ? "py-3" : "py-4 md:py-6"
        }`}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{ color: "#4F1719" }}
              >
                Ornapay
              </h1>
            </Link>

            {/* Search Bar - Full Width on Mobile */}
            <div
              className="w-full md:flex-1 md:mx-6 lg:mx-8 flex items-center rounded-lg overflow-hidden border-[1px] shadow-sm hover:shadow-md transition-shadow"
              style={{ borderColor: "#e5d9d0" }}
            >
              <input
                type="search"
                placeholder="Search jewellery..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-3 md:py-3.5 outline-none text-sm md:text-base bg-white"
              />
              <button
                className="px-4 md:px-5 py-3 md:py-3.5 flex items-center justify-center transition-colors hover:opacity-80 active:opacity-100"
                style={{ color: "#832729" }}
              >
                <Search size={18} />
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 md:gap-5 lg:gap-6 justify-between md:justify-end flex-1">
              {/* Account */}
              <Link
                href="/auth/signin"
                className="hidden md:flex items-center gap-2 transition-all hover:opacity-70"
              >
                {/* <div
                  className="w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#f5f1ed" }}
                >
                  <User size={16} style={{ color: "#832729" }} />
                </div> */}
                <div className="text-left hidden lg:block">
                  <p className="text-2xs uppercase text-[#832729]">Account</p>
                  <p className="font-semibold text-xs md:text-sm text-black">
                    Sign In
                  </p>
                </div>
              </Link>

              {/* Mobile Search Toggle */}
              <button className="md:hidden p-2">
                <Search size={20} style={{ color: "#832729" }} />
              </button>

              {/* Cart */}
              <button onClick={handleOpenCartModal} className="relative flex items-center transition-all hover:opacity-70">
                <div
                  className="w-9 md:w-10 h-9 md:h-10 rounded-full flex items-center justify-center relative flex-shrink-0"
                  style={{ backgroundColor: "#f5f1ed" }}
                >
                  <ShoppingCart size={18} style={{ color: "#832729" }} />
                  <span
                    className="flex items-center justify-center font-semibold text-2xs absolute -right-2 -top-2 w-5 h-5 rounded-full text-white"
                    style={{ backgroundColor: "#832729" }}
                  >
                    {product.length}
                  </span>
                </div>
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setNavigationOpen(!navigationOpen)}
                className="md:hidden p-2"
              >
                {navigationOpen ? (
                  <X size={24} style={{ color: "#832729" }} />
                ) : (
                  <Menu size={24} style={{ color: "#832729" }} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t-2" style={{ borderColor: "#e5d9d0" }}>
        <div className="max-w-[1170px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-0">
          <div className="flex items-center justify-between">
            {/* Main Navigation */}
            <nav
              className={`${
                navigationOpen
                  ? "absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 z-50 visible md:relative md:shadow-none md:rounded-none md:p-0"
                  : "hidden md:block"
              }`}
            >
              <ul className="flex flex-col md:flex-row gap-2 md:gap-6 lg:gap-8">
                {menuItems.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.path}
                      className="relative group block py-3 md:py-5 text-xs md:text-sm font-semibold transition-colors hover:opacity-70"
                      style={{ color: "#4F1719" }}
                    >
                      {item.title}
                      <span
                        className="absolute bottom-2 md:bottom-3 lg:bottom-4 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                        style={{ backgroundColor: "#832729" }}
                      ></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Links */}
            <div className="hidden lg:flex items-center gap-6 py-5">
              <button
                className="flex items-center gap-2 transition-all hover:opacity-70 text-sm font-semibold"
                style={{ color: "#832729" }}
              >
                <RotateCcw size={16} />
                Recently Viewed
              </button>

              <Link
                href="/wishlist"
                className="flex items-center gap-2 transition-all hover:opacity-70 text-sm font-semibold"
                style={{ color: "#832729" }}
              >
                <Heart size={16} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
