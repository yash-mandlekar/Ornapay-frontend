import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import FullScreenHeroSlider from "./FullScreenHeroSlider";

// Featured product interface
interface FeaturedProduct {
  id: number;
  title: string;
  link: string;
  discountedPrice: number;
  price: number;
  image: string;
  imageAlt: string;
  badgeText: string;
}

// Featured products data
const featuredProducts: FeaturedProduct[] = [
  {
    id: 1,
    title: "Rose Gold Tennis Bracelet",
    link: "#",
    discountedPrice: 1499,
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=123&h=161&fit=crop",
    imageAlt: "tennis bracelet",
    badgeText: "limited time offer",
  },
  {
    id: 2,
    title: "Sapphire Halo Pendant",
    link: "#",
    discountedPrice: 999,
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=123&h=161&fit=crop",
    imageAlt: "sapphire pendant",
    badgeText: "limited time offer",
  },
];

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-51.5 bg-[#E5EAF4]">
      <div className="w-full mx-auto px-4 sm:px-8 xl:px-10">
        <div className="flex flex-wrap gap-5">
          <div className="w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <FullScreenHeroSlider />
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
