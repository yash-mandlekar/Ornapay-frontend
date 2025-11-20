"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import CategoryDropdown from "./CategoryDropdown";
import GenderDropdown from "./GenderDropdown";
import SizeDropdown from "./SizeDropdown";
import ColorsDropdwon from "./ColorsDropdwon";
import PriceDropdown from "./PriceDropdown";
import shopData from "../Shop/shopData";
import SingleGridItem from "../Shop/SingleGridItem";
import SingleListItem from "../Shop/SingleListItem";
import { Grid3x3, List, ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";

const ShopWithSidebar = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  const options = [
    { label: "Latest Products", value: "0" },
    { label: "Best Selling", value: "1" },
    { label: "Old Products", value: "2" },
  ];

  const categories = [
    {
      name: "Necklace",
      products: 10,
      isRefined: true,
    },
    {
      name: "Earrings",
      products: 12,
      isRefined: false,
    },
    {
      name: "Ring",
      products: 30,
      isRefined: false,
    },
    {
      name: "Bracelet",
      products: 23,
      isRefined: false,
    },
    {
      name: "Anklet",
      products: 10,
      isRefined: false,
    },
    {
      name: "Pendant",
      products: 13,
      isRefined: false,
    },
  ];
  const genders = [
    {
      name: "Men",
      products: 10,
    },
    {
      name: "Women",
      products: 23,
    },
    {
      name: "Unisex",
      products: 8,
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);

    // closing sidebar while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".sidebar-content")) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      <Breadcrumb
        title={"Explore All Products"}
        pages={["shop", "/", "shop with sidebar"]}
      />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28" style={{ backgroundColor: '#f5f1ed' }}>
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Sidebar Start */}
            <div
              className={`sidebar-content fixed xl:z-1 z-9999 left-0 top-0 xl:translate-x-0 xl:static max-w-[310px] xl:max-w-[270px] w-full ease-out duration-200 ${
                productSidebar
                  ? "translate-x-0 bg-white p-5 h-screen overflow-y-auto"
                  : "-translate-x-full"
              }`}
            >
              <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="button for product sidebar toggle"
                className={`xl:hidden absolute -right-12.5 sm:-right-8 flex items-center justify-center w-10 h-10 rounded-lg shadow-xl transition-all duration-300 hover:scale-105 ${
                  stickyMenu
                    ? "lg:top-20 sm:top-34.5 top-35"
                    : "lg:top-24 sm:top-39 top-37"
                }`}
                style={{ 
                  backgroundColor: '#832729',
                  boxShadow: '0 4px 15px rgba(131, 39, 41, 0.3)'
                }}
              >
                <SlidersHorizontal className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col gap-6">
                {/* Filter box */}
                <div className="bg-white rounded-2xl py-5 px-6 border-2" style={{ 
                  borderColor: '#e5d9d0',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}>
                  <div className="flex items-center justify-between">
                    <p className="font-semibold" style={{ color: '#4F1719' }}>Filters:</p>
                    <button 
                      className="text-sm font-semibold transition-all duration-200 hover:opacity-70"
                      style={{ color: '#832729' }}
                    >
                      Clean All
                    </button>
                  </div>
                </div>

                {/* Category box */}
                <CategoryDropdown categories={categories} />

                {/* Gender box */}
                <GenderDropdown genders={genders} />

                {/* Size box */}
                <SizeDropdown />

                {/* Color box */}
                {/* <ColorsDropdwon /> */}

                {/* Price range box */}
                <PriceDropdown />
              </div>
            </div>
            {/* Sidebar End */}

            {/* Content Start */}
            <div className="xl:max-w-[870px] w-full">
              <div className="rounded-2xl bg-white border-2 pl-4 pr-3 py-3 mb-6" style={{ 
                borderColor: '#e5d9d0',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
              }}>
                <div className="flex items-center justify-between">
                  {/* Top bar left */}
                  <div className="flex flex-wrap items-center gap-4">

                    <p className="text-sm" style={{ color: '#666666' }}>
                      Showing <span className="font-semibold" style={{ color: '#4F1719' }}>9 of 50</span>{" "}
                      Products
                    </p>
                  </div>

                  {/* Top bar right */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => setProductStyle("grid")}
                      aria-label="button for product grid tab"
                      className={`flex items-center justify-center w-10.5 h-9 rounded-lg border-2 transition-all duration-300 ease-out ${
                        productStyle === "grid"
                          ? "text-white shadow-lg hover:scale-105"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: productStyle === "grid" ? '#832729' : 'white',
                        borderColor: productStyle === "grid" ? '#832729' : '#e5d9d0',
                        color: productStyle === "grid" ? 'white' : '#666666',
                        boxShadow: productStyle === "grid" ? '0 4px 15px rgba(131, 39, 41, 0.3)' : 'none'
                      }}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setProductStyle("list")}
                      aria-label="button for product list tab"
                      className={`flex items-center justify-center w-10.5 h-9 rounded-lg border-2 transition-all duration-300 ease-out ${
                        productStyle === "list"
                          ? "text-white shadow-lg hover:scale-105"
                          : "hover:scale-105"
                      }`}
                      style={{
                        backgroundColor: productStyle === "list" ? '#832729' : 'white',
                        borderColor: productStyle === "list" ? '#832729' : '#e5d9d0',
                        color: productStyle === "list" ? 'white' : '#666666',
                        boxShadow: productStyle === "list" ? '0 4px 15px rgba(131, 39, 41, 0.3)' : 'none'
                      }}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid Tab Content Start */}
              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}
              >
                {shopData.map((item, key) =>
                  productStyle === "grid" ? (
                    <SingleGridItem item={item} key={key} />
                  ) : (
                    <SingleListItem item={item} key={key} />
                  )
                )}
              </div>
              {/* Products Grid Tab Content End */}

              {/* Products Pagination Start */}
              <div className="flex justify-center mt-15">
                <div className="bg-white rounded-2xl p-2 border-2" style={{ 
                  borderColor: '#e5d9d0',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
                }}>
                  <ul className="flex items-center">
                    <li>
                      <button
                        id="paginationLeft"
                        aria-label="button for pagination left"
                        type="button"
                        disabled
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-lg disabled:opacity-30"
                        style={{ color: '#666666' }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg text-white font-semibold hover:scale-105"
                        style={{ 
                          backgroundColor: '#832729',
                          boxShadow: '0 2px 8px rgba(131, 39, 41, 0.2)'
                        }}
                      >
                        1
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        2
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        3
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        4
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        5
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        ...
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        10
                      </a>
                    </li>

                    <li>
                      <button
                        id="paginationRight"
                        aria-label="button for pagination right"
                        type="button"
                        className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-lg transition-all hover:scale-105"
                        style={{ color: '#666666' }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* Products Pagination End */}
            </div>
            {/* Content End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebar;