import Navbar from "@/app/_components/Navbar";
import CompanyLogos from "@/app/_components/CompanyLogos";

export const metadata = {
  title: "About - FlyHigher",
  description: "Learn more about FlyHigher flight booking",
};

const AboutPage = () => {
  return (
    <>
      <section
        id="Header"
        className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top min-h-screen relative"
      >
        <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] min-h-screen">
          <Navbar />
          <div className="container max-w-[1130px] mx-auto flex flex-col gap-8 pt-[80px] pb-[68px]">
            <div className="title flex flex-col gap-4">
              <h1 className="font-bold text-[48px] leading-[60px]">
                About FlyHigher
              </h1>
              <p className="font-medium text-xl leading-[30px] text-flysha-off-purple max-w-[600px]">
                Your trusted partner for seamless flight bookings. We connect you
                to destinations worldwide with the best airlines at competitive prices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-flysha-bg-purple rounded-[20px] p-6">
                <div className="text-4xl font-bold text-flysha-light-purple mb-2">500+</div>
                <div className="text-flysha-off-purple">Destinations</div>
              </div>
              <div className="bg-flysha-bg-purple rounded-[20px] p-6">
                <div className="text-4xl font-bold text-flysha-light-purple mb-2">50K+</div>
                <div className="text-flysha-off-purple">Happy Travelers</div>
              </div>
              <div className="bg-flysha-bg-purple rounded-[20px] p-6">
                <div className="text-4xl font-bold text-flysha-light-purple mb-2">24/7</div>
                <div className="text-flysha-off-purple">Customer Support</div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="font-bold text-2xl mb-4">Our Mission</h2>
              <p className="text-flysha-off-purple leading-relaxed max-w-[800px]">
                To make air travel accessible, affordable, and enjoyable for everyone.
                We believe that exploring the world should be simple, and we're here to
                make that happen with transparent pricing, easy booking, and exceptional service.
              </p>
            </div>
          </div>
          <CompanyLogos />
        </div>
      </section>
    </>
  );
};

export default AboutPage;
