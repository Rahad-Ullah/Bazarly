import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import sliderImg1 from "../../../assets/images/laptop-offer.webp";
import sliderImg2 from "../../../assets/images/happy-hour-home-banner.png";
import { Link } from "react-router-dom";

export function CarouselPlugin() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const totalItems = 2;

  // Autoplay effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, [totalItems]);

  return (
    <div className="relative w-full h-48 sm:h-56 md:h-[390px] lg:h-[500px] 2xl:h-[600px] max-w-screen-2xl mx-auto">
      <div className="relative">
        {/* slider items 1 */}
        <div
          key={0}
          className={`absolute inset-0 transition-opacity duration-500 ${
            0 === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="">
            <CardContent className="flex items-center justify-center p-0">
              <Link to={""} className="w-full">
                <img
                  src={sliderImg1}
                  alt="slider"
                  className="w-full h-full max-h-[500px] 2xl:max-h-[600px]"
                />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* slider items 2 */}
        <div
          key={1}
          className={`absolute inset-0 transition-opacity duration-500 ${
            1 === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Card className="">
            <CardContent className="flex items-center justify-center p-0">
              <Link to={""} className="w-full">
                <img
                  src={sliderImg2}
                  alt="slider"
                  className="w-full h-full max-h-[500px] 2xl:max-h-[600px]"
                />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* dot sliding */}
      <div className="absolute inset-x-0 bottom-4 hidden md:flex justify-center space-x-2 ">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-6 ${
              index === currentIndex ? "bg-primary" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
