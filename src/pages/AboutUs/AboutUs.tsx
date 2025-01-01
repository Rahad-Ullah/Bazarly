import Container from "@/components/shared/Container";
import MissionSection from "./MissionSection";
import OurTeamSection from "./OurTeamSection";
import ContactSection from "./ContactSection";

const AboutUs = () => {
  return (
    <div>
      <Container>
        {/* page header */}
        <div className="flex flex-col items-center text-center gap-4 font-medium py-14 md:py-16 lg:py-20">
          <span className="text-sm font-semibold border rounded-full px-3 py-1">
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 pt-2 max-w-screen-lg">
            Bazarly is bringing shopping back to the future.
          </h1>
          <p className="font-medium md:text-lg">
            Buy everything you need. It's time to start loving
            it.
          </p>
        </div>
        {/* images gallery section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <img
              src="https://www.bbpsmv.com/images/sports/sports-banner.jpg"
              alt="sports image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="md:col-span-6">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Youth-soccer-indiana.jpg/1200px-Youth-soccer-indiana.jpg"
              alt="sports image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="md:col-span-3">
            <img
              src="https://www.washingtonpost.com/resizer/MeGFFLJZINBpnH8JEK_HWevLJ9o=/arc-anglerfish-washpost-prod-washpost/public/7GUDLGQP3UI6VESMWNGQTO6JJA.jpg"
              alt="sports image"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
        {/* our mission section */}
        <MissionSection />
        {/* our team section */}
        <OurTeamSection />
        {/* history and achievement section */}
        {/* <HistorySection /> */}
        {/* contact section */}
        <ContactSection />
      </Container>
    </div>
  );
};

export default AboutUs;
