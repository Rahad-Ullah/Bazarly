import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeader";

const BrandsSection = () => {
  return (
    <div className="py-16 lg:py-20">
      <Container>
        <div>
          {/* section header */}
          <SectionHeading
            heading="Popular Brands"
            subHeading="Discover the trusted names that bring you quality and style!"
          />

          {/* logos container */}
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 gap-8 pt-12">
            <div>
              <img
                src="https://www.logo.wine/a/logo/Samsung/Samsung-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Lenovo_Vibe_K4_Note/Lenovo_Vibe_K4_Note-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Apple_Inc./Apple_Inc.-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/LG_Corporation/LG_Corporation-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Sony/Sony-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/HP_Inc./HP_Inc.-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Asus/Asus-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Xiaomi_Mi_1/Xiaomi_Mi_1-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Dell/Dell-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
            <div>
              <img
                src="https://www.logo.wine/a/logo/Nvidia/Nvidia-Logo.wine.svg"
                alt="logo image"
                className="grayscale hover:grayscale-0"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BrandsSection;
