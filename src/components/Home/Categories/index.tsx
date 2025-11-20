"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import data from "./categoryData";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const Categories = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.init();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-12 sm:pt-16 md:pt-20 lg:pt-24">
      <div
        className="max-w-7xl w-full mx-auto px-4 sm:px-8 xl:px-0"
        style={{ borderBottomColor: "#e5d9d0", borderBottomWidth: "1px" }}
      >
        <div className="swiper categories-carousel common-carousel">
          {/* Section Title */}
          <div className="pr-2 mb-8 sm:mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <Sparkles size={20} style={{ color: "#832729" }} />
                <span
                  className="font-semibold text-xs sm:text-sm uppercase tracking-wide"
                  style={{ color: "#832729" }}
                >
                  Collections
                </span>
              </div>
              <h2
                className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                style={{ color: "#4F1719" }}
              >
                Browse by Category
              </h2>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={handlePrev}
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                style={{
                  borderColor: "#e5d9d0",
                  color: "#832729",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f1ed";
                  e.currentTarget.style.borderColor = "#832729";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#e5d9d0";
                }}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                className="w-9 sm:w-10 h-9 sm:h-10 rounded-full border transition-all duration-300 flex items-center justify-center hover:scale-110 active:scale-95"
                style={{
                  borderColor: "#e5d9d0",
                  color: "#832729",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f5f1ed";
                  e.currentTarget.style.borderColor = "#832729";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderColor = "#e5d9d0";
                }}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            ref={sliderRef}
            spaceBetween={16}
            slidesPerView={6}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              1000: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
            }}
          >
            {data.map((item, key) => (
              <SwiperSlide key={key}>
                <SingleItem item={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;