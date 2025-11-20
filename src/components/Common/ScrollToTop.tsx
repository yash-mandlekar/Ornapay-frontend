"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-lg shadow-2xl transition-all duration-300 ease-out hover:scale-110 hover:shadow-xl group"
          style={{ 
            backgroundColor: '#832729',
            boxShadow: '0 10px 40px rgba(131, 39, 41, 0.3)'
          }}
          aria-label="Scroll to top"
        >
          <ChevronUp 
            className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-y-0.5" 
            strokeWidth={2.5}
          />
        </button>
      )}
    </>
  );
}