import React from "react";
import SingleItem from "./SingleItem";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import shopData from "@/components/Shop/shopData";

const BestSeller = () => {
  const primaryColor = "#832729";
  const darkMaroon = "#4F1719";
  const creamBg = "#f5f1ed";

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

        {/* Grid of Best Sellers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8 mb-12 md:mb-14 lg:mb-16">
          {/* Best Sellers items */}
          {shopData && shopData.length > 0 ? (
            shopData.slice(1, 7).map((item, key) => (
              <SingleItem item={item} key={key} />
            ))
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

        {/* View All Button */}
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
      </div>
    </section>
  );
};

export default BestSeller;