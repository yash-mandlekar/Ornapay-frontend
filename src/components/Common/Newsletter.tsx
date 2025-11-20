import React from "react";
import Image from "next/image";
import { Mail, Sparkles } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="overflow-hidden py-16">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl" style={{ borderWidth: '2px', borderColor: '#832729' }}>
          
          {/* Overlay Gradient */}
          <div 
            className="absolute -z-10 w-full h-full left-0 top-0 "
            style={{
              background: 'linear-gradient(135deg, rgba(79, 23, 25, 0.95) 0%, rgba(131, 39, 41, 0.9) 100%)'
            }}
          ></div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 px-6 sm:px-8 xl:pl-12 xl:pr-14 py-12">
            {/* Content Section */}
            <div className="max-w-[491px] w-full">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-white" />
                <span className="text-white text-sm font-semibold tracking-wide uppercase" style={{ color: '#f5f1ed' }}>
                  Exclusive Offers
                </span>
              </div>
              <h2 className="max-w-[450px] text-white font-bold text-2xl sm:text-3xl xl:text-4xl mb-3 leading-tight">
                Don&apos;t Miss Out Latest Trends & Offers
              </h2>
              <p className="text-white opacity-90 text-base" style={{ color: '#f5f1ed' }}>
                Register to receive news about the latest jewellery collections, exclusive offers & discount codes
              </p>
            </div>

            {/* Form Section */}
            <div className="max-w-[477px] w-full">
              <form>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#666666' }} />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full bg-white border-2 rounded-lg placeholder:text-gray-400 py-3 pl-12 pr-5 outline-none transition-all duration-200 focus:shadow-lg"
                      style={{ borderColor: '#e5d9d0' }}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex justify-center items-center gap-2 py-3 px-8 text-white font-semibold rounded-lg transition-all duration-300 ease-out hover:scale-105 shadow-xl"
                    style={{ 
                      backgroundColor: '#832729',
                      boxShadow: '0 10px 30px rgba(131, 39, 41, 0.3)'
                    }}
                  >
                    Subscribe
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-white text-xs mt-3 opacity-75" style={{ color: '#f5f1ed' }}>
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;