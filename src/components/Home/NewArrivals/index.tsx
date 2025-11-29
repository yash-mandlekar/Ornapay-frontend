"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { asyncGetSection } from "@/redux/features/sections/sections-thunk";
import { clearSectionError } from "@/redux/features/sections/sections-slice";
import ProductCard from "@/components/Common/ProductCard";

const SECTION_SLUG = "new-arrivals";

const NewArrival = () => {
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

  // Hide section entirely if it doesn't exist (404 or not found)
  if (error && (error.includes("404") || error.includes("not found"))) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* Section title */}
        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2.5 mb-2">
              <Sparkles
                size={20}
                style={{ color: "#832729" }}
                className="flex-shrink-0"
              />
              <span
                className="font-semibold text-sm md:text-base"
                style={{ color: "#832729" }}
              >
                This Week&apos;s Favorites
              </span>
            </div>
            <h2
              className="font-bold text-2xl md:text-3xl lg:text-4xl"
              style={{ color: "#4F1719" }}
            >
              New Arrivals
            </h2>
          </div>

          {/* View All Button - Only show if there are products */}
          {!loading && !error && products.length > 0 && (
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 font-semibold text-base py-3 px-7 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: "#832729",
                color: "#FFFFFF",
                boxShadow: "0 10px 25px rgba(131, 39, 41, 0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.95";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              View All
              <ArrowRight size={18} />
            </Link>
          )}
        </div>

        {/* Loading skeleton or products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(8)].map((_, i) => (
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
            className="col-span-full py-12 text-center rounded-2xl"
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
                Unable to load New Arrivals
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
                style={{ backgroundColor: "#832729" }}
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products && products.length > 0 ? (
              products
                .slice(0, 8)
                .map((item, key) => <ProductCard item={item} key={key} />)
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
                  No products available at the moment
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrival;
