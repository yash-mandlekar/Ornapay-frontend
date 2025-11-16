import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

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
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5"
                >
                  <div className="flex items-center gap-14">
                    <div>
                      <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-22">
                        <a href={product.link}>{product.title}</a>
                      </h2>

                      <div>
                        <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                          {product.badgeText}
                        </p>
                        <span className="flex items-center gap-3">
                          <span className="font-medium text-heading-5 text-red">
                            ${product.discountedPrice.toLocaleString()}
                          </span>
                          <span className="font-medium text-2xl text-dark-4 line-through">
                            ${product.price.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <Image
                        src={product.image}
                        alt={product.imageAlt}
                        width={123}
                        height={161}
                        className="rounded-md"
                      />
                    </div>
                  </div>
                </div>
              ))}
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
