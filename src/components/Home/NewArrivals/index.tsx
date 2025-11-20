"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import ProductItem from "@/components/Common/ProductItem";
import shopData from "@/components/Shop/shopData";
import apiClient from "@/hooks/useAxios";

const NewArrival = () => {
  const [Products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get(`/api/products`);
        console.log(data);

        if (data) {
          setProducts(data.products);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        </div>

        {/* Loading skeleton or products grid */}
        {Loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {[...Array(4)].map((_, i) => (
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {Products && Products.length > 0 ? (
              Products.map((item, key) => (
                <ProductItem item={item} key={key} />
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