import { CarouselPlugin } from "./CarouselSection/Carousel";
import CategoriesSection from "./Categories/CategoriesSection";
import FeaturedFacilities from "./FeaturedProducts/FeaturedProducts";
import FlashSale from "./FlashSale/FlashSale";
import BrandsSection from "./BrandsSection/BrandsSection";
import Newsletter from "./Newsletter/Newsletter";

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
      {/* Newsletter */}
      <Newsletter />
      {/* Testimonial */}
      {/* <Testimonial /> */}
      {/* Our Partners */}
      <BrandsSection />
    </div>
  );
};

export default Home;
