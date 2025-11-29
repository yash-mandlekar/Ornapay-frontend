"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { asyncGetSection } from "@/redux/features/sections/sections-thunk";
import { clearSectionError } from "@/redux/features/sections/sections-slice";
import ProductCard from "@/components/Common/ProductCard";

const SECTION_SLUG = "best-sellers";

const BestSeller = () => {
  const dispatch = useAppDispatch();

  const section = useAppSelector((state) => state.sections[SECTION_SLUG]);
  const products = section?.products || [];
  const loading = section?.loading || false;
  const error = section?.error || null;

  useEffect(() => {
    if (!section || (products.length === 0 && !loading && !error)) {
      dispatch(asyncGetSection(SECTION_SLUG));
    }
  }, [dispatch, section, products.length, loading, error]);

  const primaryColor = "#832729";
  const darkMaroon = "#4F1719";
  const creamBg = "#f5f1ed";

  // Hide section entirely if it doesn't exist (404 or not found)
  if (error && (error.includes("404") || error.includes("not found"))) {
    return null;
  }

  return (
    <section className="overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section Title */}
        <div className="mb-10 md:mb-14 lg:mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-2 md:mb-3">
              <TrendingUp
                size={20}
                style={{ color: primaryColor }}
                className="flex-shrink-0"
              />
              <span
                className="font-semibold text-sm md:text-base"
                style={{ color: primaryColor }}
              >
                This Month
              </span>
            </div>
            <h2
              className="font-bold text-2xl md:text-3xl lg:text-4xl"
              style={{ color: darkMaroon }}
            >
              Best Sellers
            </h2>
          </div>
        </div>

        {/* Loading skeleton or products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8 mb-12 md:mb-14 lg:mb-16">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl p-6 md:p-8 animate-pulse"
                style={{
                  backgroundColor: "#f9f7f5",
                  borderColor: "#e5d9d0",
                  borderWidth: "2px",
                }}
              >
                <div
                  className="w-full h-48 md:h-64 rounded-lg mb-4"
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
            className="col-span-full py-12 text-center rounded-2xl mb-12"
            style={{
              backgroundColor: "#fff8f0",
              borderColor: "#ffa726",
              borderWidth: "2px",
            }}
          >
            <div className="max-w-md mx-auto">
              <p
                className="text-lg font-semibold mb-2"
                style={{ color: "#e65100" }}
              >
                Unable to load Best Sellers
              </p>
              <p className="text-sm mb-4" style={{ color: "#666666" }}>
                {error}
              </p>
              <button
                onClick={() => {
                  dispatch(clearSectionError(SECTION_SLUG));
                  dispatch(asyncGetSection(SECTION_SLUG));
                }}
                className="px-6 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundColor: primaryColor }}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8 mb-12 md:mb-14 lg:mb-16">
            {products && products.length > 0 ? (
              products
                .slice(0, 6)
                .map((item, key) => <ProductCard item={item} key={key} />)
            ) : (
              <div
                className="col-span-full py-12 md:py-16 text-center rounded-2xl"
                style={{
                  backgroundColor: creamBg,
                  borderColor: primaryColor,
                  borderWidth: "2px",
                }}
              >
                <p
                  className="text-lg font-semibold"
                  style={{ color: darkMaroon }}
                >
                  No products available
                </p>
              </div>
            )}
          </div>
        )}

        {/* View All Button - Only show if there are products */}
        {!loading && !error && products.length > 0 && (
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="inline-flex font-semibold text-sm md:text-base py-3 md:py-4 px-7 sm:px-10 md:px-12 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: primaryColor,
                color: "#FFFFFF",
                boxShadow: `0 10px 25px rgba(131, 39, 41, 0.2)`,
              }}
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BestSeller;
