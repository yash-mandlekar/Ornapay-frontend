"use client";
import React, { useState, useEffect } from "react";
import {
  Grid3x3,
  List,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { asyncGetPublicProducts } from "@/redux/features/product/product-thunk";
import Breadcrumb from "@/components/Common/Breadcrumb";
import CategoryDropdown from "@/components/ShopWithSidebar/CategoryDropdown";
import PriceDropdown from "@/components/ShopWithSidebar/PriceDropdown";
import ProductCard from "@/components/Common/ProductCard";

const ShopWithSidebarPage = () => {
  const [productStyle, setProductStyle] = useState("grid");
  const [productSidebar, setProductSidebar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 100000,
  });

  const dispatch = useAppDispatch();
  const { products: productsList, error } = useAppSelector(
    (state) => state.products
  );

  const { list, total, loading } = productsList;

  const totalPages = Math.ceil(total / limit);

  // Sample categories - replace with your actual categories from API
  const categories = [
    {
      _id: "cat1",
      name: "Necklace",
      products: 10,
    },
    {
      _id: "cat2",
      name: "Earrings",
      products: 12,
    },
    {
      _id: "cat3",
      name: "Ring",
      products: 30,
    },
    {
      _id: "cat4",
      name: "Bracelet",
      products: 23,
    },
    {
      _id: "cat5",
      name: "Anklet",
      products: 10,
    },
    {
      _id: "cat6",
      name: "Pendant",
      products: 13,
    },
  ];

  // Fetch products when filters or page changes
  useEffect(() => {
    dispatch(
      asyncGetPublicProducts({
        page: currentPage,
        limit,
        search: filters.search,
        category: filters.category,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      })
    );
  }, [currentPage, filters, dispatch, limit]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        !event.target.closest(".sidebar-content") &&
        !event.target.closest(".filter-toggle-btn")
      ) {
        setProductSidebar(false);
      }
    }

    if (productSidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [productSidebar]);

  // Handle filter changes
  const handleCategoryChange = (categoryId) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryId ? "" : categoryId,
    }));
  };

  const handlePriceChange = (priceRange) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      minPrice: priceRange.from,
      maxPrice: priceRange.to,
    }));
  };

  const handleSearchChange = (searchTerm) => {
    setCurrentPage(1);
    setFilters((prev) => ({
      ...prev,
      search: searchTerm,
    }));
  };

  const handleClearFilters = () => {
    setCurrentPage(1);
    setFilters({
      search: "",
      category: "",
      minPrice: 0,
      maxPrice: 100000,
    });
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    const halfVisible = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) pages.push(1);
    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");
    if (end < totalPages) pages.push(totalPages);

    return pages;
  };

  const handlePageChange = (pageNum) => {
    if (typeof pageNum === "number" && pageNum !== currentPage) {
      setCurrentPage(pageNum);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const paginationNumbers = getPaginationNumbers();

  return (
    <>
      <Breadcrumb title={"Explore All Products"} pages={["shop"]} />
      <section
        className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28"
        style={{ backgroundColor: "#f5f1ed" }}
      >
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
              <div className="flex flex-col gap-6">
                {/* Filter box */}
                <div
                  className="bg-white rounded-2xl py-5 px-6 border-2"
                  style={{
                    borderColor: "#e5d9d0",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold" style={{ color: "#4F1719" }}>
                      Filters:
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="text-sm font-semibold transition-all duration-200 hover:opacity-70"
                      style={{ color: "#832729" }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                {/* Search box */}
                <div
                  className="bg-white rounded-2xl py-4 px-6 border-2"
                  style={{
                    borderColor: "#e5d9d0",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={filters.search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="w-full outline-none text-sm"
                    style={{ color: "#4F1719" }}
                  />
                </div>

                {/* Category box */}
                <CategoryDropdown
                  categories={categories}
                  selectedCategory={filters.category}
                  onCategoryChange={handleCategoryChange}
                />

                {/* Price range box */}
                <PriceDropdown onPriceChange={handlePriceChange} />
              </div>
            </div>
            {/* Sidebar End */}

            {/* Content Start */}
            <div className="xl:max-w-[870px] w-full">
              <div
                className="rounded-2xl bg-white border-2 pl-4 pr-3 py-3 mb-6"
                style={{
                  borderColor: "#e5d9d0",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div className="flex items-center justify-between">
                  {/* Top bar left */}
                  <div className="flex flex-wrap items-center gap-4">
                    <p className="text-sm" style={{ color: "#666666" }}>
                      Showing{" "}
                      <span style={{ color: "#4F1719" }}>
                        {list.length > 0 ? (currentPage - 1) * limit + 1 : 0} -{" "}
                        {Math.min(currentPage * limit, total)}
                      </span>{" "}
                      of{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "#4F1719" }}
                      >
                        {total}
                      </span>{" "}
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
                        backgroundColor:
                          productStyle === "grid" ? "#832729" : "white",
                        borderColor:
                          productStyle === "grid" ? "#832729" : "#e5d9d0",
                        color: productStyle === "grid" ? "white" : "#666666",
                        boxShadow:
                          productStyle === "grid"
                            ? "0 4px 15px rgba(131, 39, 41, 0.3)"
                            : "none",
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
                        backgroundColor:
                          productStyle === "list" ? "#832729" : "white",
                        borderColor:
                          productStyle === "list" ? "#832729" : "#e5d9d0",
                        color: productStyle === "list" ? "white" : "#666666",
                        boxShadow:
                          productStyle === "list"
                            ? "0 4px 15px rgba(131, 39, 41, 0.3)"
                            : "none",
                      }}
                    >
                      <List className="w-4 h-4" />
                    </button>

                    {/* Filter Toggle Button - Shows only on mobile */}
                    <button
                      onClick={() => setProductSidebar(!productSidebar)}
                      aria-label="button for product sidebar toggle"
                      className="filter-toggle-btn xl:hidden flex items-center justify-center w-10.5 h-9 rounded-lg border-2 transition-all duration-300 ease-out hover:scale-105 shadow-lg"
                      style={{
                        backgroundColor: "#832729",
                        borderColor: "#832729",
                        color: "white",
                        boxShadow: "0 4px 15px rgba(131, 39, 41, 0.3)",
                      }}
                    >
                      <SlidersHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading ? (
                <div
                  className={`${
                    productStyle === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                      : "flex flex-col gap-7.5"
                  }`}
                >
                  {[...Array(limit)].map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl p-6 animate-pulse"
                      style={{
                        backgroundColor: "#f9f7f5",
                        borderColor: "#e5d9d0",
                        borderWidth: "2px",
                      }}
                    >
                      <div
                        className="w-full h-48 rounded-lg mb-4"
                        style={{ backgroundColor: "#e5d9d0" }}
                      />
                      <div
                        className="h-4 rounded w-3/4 mb-2"
                        style={{ backgroundColor: "#e5d9d0" }}
                      />
                      <div
                        className="h-4 rounded w-1/2"
                        style={{ backgroundColor: "#e5d9d0" }}
                      />
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div
                  className="col-span-full py-8 text-center rounded-2xl"
                  style={{
                    backgroundColor: "#ffe5e5",
                    borderColor: "#ff6b6b",
                    borderWidth: "2px",
                  }}
                >
                  <p
                    className="text-lg font-semibold"
                    style={{ color: "#d32f2f" }}
                  >
                    {error}
                  </p>
                </div>
              ) : (
                <>
                  {/* Products Grid Tab Content Start */}
                  <div
                    className={`${
                      productStyle === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-7.5 gap-y-9"
                        : "flex flex-col gap-7.5"
                    }`}
                  >
                    {list && list.length > 0 ? (
                      list.map((item, key) => (
                        <ProductCard
                          item={item}
                          key={key}
                          variant={productStyle as "grid" | "list"}
                        />
                      ))
                    ) : (
                      <div
                        className="col-span-full py-16 text-center rounded-2xl"
                        style={{
                          backgroundColor: "#f5f1ed",
                          borderColor: "#e5d9d0",
                          borderWidth: "2px",
                        }}
                      >
                        <p
                          className="text-lg font-semibold"
                          style={{ color: "#4F1719" }}
                        >
                          No products found matching your filters
                        </p>
                      </div>
                    )}
                  </div>
                  {/* Products Grid Tab Content End */}
                </>
              )}

              {/* Products Pagination Start */}
              {totalPages > 1 && !loading && (
                <div className="flex justify-center mt-15">
                  <div
                    className="bg-white rounded-2xl p-2 border-2"
                    style={{
                      borderColor: "#e5d9d0",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <ul className="flex items-center">
                      {/* Previous Button */}
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          aria-label="button for pagination left"
                          type="button"
                          className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                          style={{ color: "#666666" }}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      </li>

                      {/* Page Numbers */}
                      {paginationNumbers.map((pageNum, index) => (
                        <li key={index}>
                          {pageNum === "..." ? (
                            <span
                              className="flex py-1.5 px-3.5"
                              style={{ color: "#666666" }}
                            >
                              ...
                            </span>
                          ) : (
                            <button
                              onClick={() => handlePageChange(pageNum)}
                              className={`flex py-1.5 px-3.5 duration-300 rounded-lg font-medium transition-all hover:scale-105 ${
                                currentPage === pageNum ? "text-white" : ""
                              }`}
                              style={{
                                backgroundColor:
                                  currentPage === pageNum
                                    ? "#832729"
                                    : "transparent",
                                color:
                                  currentPage === pageNum ? "white" : "#666666",
                                boxShadow:
                                  currentPage === pageNum
                                    ? "0 2px 8px rgba(131, 39, 41, 0.2)"
                                    : "none",
                              }}
                            >
                              {pageNum}
                            </button>
                          )}
                        </li>
                      ))}

                      {/* Next Button */}
                      <li>
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          aria-label="button for pagination right"
                          type="button"
                          className="flex items-center justify-center w-8 h-9 ease-out duration-200 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all hover:scale-105"
                          style={{ color: "#666666" }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              {/* Products Pagination End */}
            </div>
            {/* Content End */}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithSidebarPage;
