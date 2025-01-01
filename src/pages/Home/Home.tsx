import { CarouselPlugin } from "./CarouselSection/Carousel";
import CategoriesSection from "./Categories/CategoriesSection";
import FeaturedFacilities from "./FeaturedProducts/FeaturedProducts";
import FlashSale from "./FlashSale/FlashSale";

const Home = () => {
  return (
    <div>
      <CarouselPlugin />
      {/* categories */}
      <CategoriesSection />
      {/* featured facilities */}
      <FeaturedFacilities />
      {/* flash sale */}
      <FlashSale />
      {/* Testimonial */}
      {/* <Testimonial /> */}
      {/* Our Partners */}
      {/* <PartnersSection /> */}
    </div>
  );
};

export default Home;
