import { CarouselPlugin } from "./CarouselSection/Carousel";
import CategoriesSection from "./Categories/CategoriesSection";
import FeaturedFacilities from "./FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <div>
      {/* banner section */}
      {/* <BannerSection /> */}
      <CarouselPlugin />
      {/* categories */}
      <CategoriesSection />
      {/* featured facilities */}
      <FeaturedFacilities />
      {/* How it works */}
      {/* <HowItWorksSection /> */}
      {/* Testimonial */}
      {/* <Testimonial /> */}
      {/* Our Partners */}
      {/* <PartnersSection /> */}
      {/* Footer section */}
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
