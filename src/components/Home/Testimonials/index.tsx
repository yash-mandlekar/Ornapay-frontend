"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef } from "react";
import testimonialsData from "./testimonialsData";
import Image from "next/image";

// Import Swiper styles
import "swiper/css/navigation";
import "swiper/css";
import SingleItem from "./SingleItem";

const Testimonials = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <section
      className="overflow-hidden py-16 sm:py-20"
      style={{
        background: "linear-gradient(135deg, #f5f1ed 0%, #ede8e3 100%)",
      }}
    >
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="swiper testimonial-carousel common-carousel">
          {/* Section title */}
          <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span
                className="flex items-center gap-2.5 font-semibold text-sm mb-2"
                style={{ color: "#832729" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="#832729"
                  />
                </svg>
                Testimonials
              </span>
              <h2
                className="font-bold text-2xl sm:text-3xl lg:text-4xl"
                style={{ color: "#4F1719" }}
              >
                What Our Customers Say
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Hear from our satisfied customers about their experience
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="swiper-button-prev w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md"
                style={{ borderColor: "#832729", backgroundColor: "#ffffff" }}
                aria-label="Previous testimonial"
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fill: "#832729" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.4881 4.43057C15.8026 4.70014 15.839 5.17361 15.5694 5.48811L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5695C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51192C14.7001 4.19743 15.1736 4.161 15.4881 4.43057Z"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="swiper-button-next w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
                style={{ backgroundColor: "#832729" }}
                aria-label="Next testimonial"
              >
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ fill: "#ffffff" }}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.51192 4.43057C8.82641 4.161 9.29989 4.19743 9.56946 4.51192L15.5695 11.5119C15.8102 11.7928 15.8102 12.2072 15.5695 12.4881L9.56946 19.4881C9.29989 19.8026 8.82641 19.839 8.51192 19.5695C8.19743 19.2999 8.161 18.8264 8.43057 18.5119L14.0122 12L8.43057 5.48811C8.161 5.17361 8.19743 4.70014 8.51192 4.43057Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            slidesPerView={3}
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1000: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonialsData.map((item, key) => (
              <SwiperSlide key={key}>
                <SingleItem testimonial={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
