import { getCityFilter } from "./lib/data";
import { searchFlight } from "./lib/actions";
import NavbarLight from "../_components/NavbarLight";
import FlightSearchWidget from "./_components/FlightSearchWidget";
import DestinationCard from "./_components/DestinationCard";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import Image from "next/image";

const HomePage = async () => {
  const filter = await getCityFilter();

  return (
    <div className="bg-background-light text-text-dark min-h-screen flex flex-col relative overflow-x-hidden font-display">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top Right Pastel Circle */}
        <div className="absolute -top-10 -right-20 w-[400px] h-[400px] bg-pastel-blue/50 rounded-full blur-3xl opacity-60" />

        {/* Floating Airplane - Top Right */}
        <div className="absolute top-40 right-[10%] w-32 h-32 hidden lg:block animate-bounce" style={{ animationDuration: "4s" }}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ9HIJqcvp7ie_6ZaS-Bv6a4xLLRnEl4N2poJWUl5wPekrXbx6AQ76qboxLwyPRYDUfXmwWm7owSaRWRe1HjNXkakBmN0LoWOoB2uDyhxa_NR34FDSKI9ZTeaLLKHtn8l1id9idlKMThzYFPslcsE0YeP62AtHrS3ja71VK5OilYEBegIRNkCiWt8nCyiuPI5pyguHd53eWLnTXE6Sx6t1rrwzI5J6ZfuxWB6XL34v0zOGGVnHQD-2LCClZsaowtisYR1C4pVZzYk"
            alt="3D airplane"
            width={128}
            height={128}
            className="w-full h-full object-contain drop-shadow-xl transform rotate-12"
          />
        </div>

        {/* Bottom Left Pastel Circle */}
        <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-pastel-yellow/40 rounded-full blur-3xl opacity-60" />

        {/* Floating Suitcase - Bottom Left */}
        <div className="absolute bottom-20 left-[5%] w-40 h-40 hidden lg:block animate-bounce" style={{ animationDuration: "5s" }}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsGzuG8f5lxTylCC4ZKD6EqVsDPFx1S-5H3LLbu3WeK9SbgzNOBdMrvt52UPPo2sMGvM5WrLwHbogjUrVK-GWqwHmNhPEdkS4ETOXgOvQGkiLme2tje0IjUqBoKlVazgJfpPqWcVby1Lj8bTnqELLD13qpLxlah7jEss3gVuAUeNarsIE9ME-DLRQ7cOtflV9mP5Zbe0LF-d88VMhY4j51zCEDmsQobPoDBtWmryVMX1CPSIrP_lMeSHhIVRqGAg1sJcmHx94niB8"
            alt="3D suitcase"
            width={160}
            height={160}
            className="w-full h-full object-contain drop-shadow-xl transform -rotate-6"
          />
        </div>

        {/* Floating Cloud - Top Left */}
        <div className="absolute top-32 left-[15%] w-24 h-24 hidden lg:block animate-pulse" style={{ animationDuration: "8s" }}>
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc9lzJR35E8BkbwsctTgzBL6QW0_N5LIVDybEy6G4ZEDMMab12cfDlzxFviUn33h2rJCRgZfFTP1E7rCd-8f5ZEgIMAefe6w6ZY9VI3G-2dZg5EbDy3M_BqufGdStt1uX78M7fOEuV4t9XE82nDoeFZG3E1rs7pooMfqA6DYXKJ9Yfo_uQPuLMrrEgm2r16RGrgM3e6rvMmw41Rc3NKGxARYlRow1Ih3cju5JUK-SFmNfCFY7DHuotK-k4WsyxhiakV9s9ajeCbnw"
            alt="3D cloud"
            width={96}
            height={96}
            className="w-full h-full object-contain drop-shadow-lg opacity-80"
          />
        </div>
      </div>

      {/* Navigation */}
      <NavbarLight />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 py-10 lg:py-20">
        {/* Hero Text */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-yellow text-yellow-700 text-xs font-bold uppercase tracking-wider mb-4 border border-yellow-200">
            <Flame className="w-4 h-4" />
            Best prices guaranteed
          </div>
          <h1 className="text-text-dark text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
            Where will your <br />
            <span className="text-sky-primary relative inline-block">
              dreams
              <svg
                className="absolute w-full h-3 bottom-1 left-0 text-yellow-300 -z-10 opacity-60"
                preserveAspectRatio="none"
                viewBox="0 0 100 10"
              >
                <path
                  d="M0 5 Q 50 10 100 5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                />
              </svg>
            </span>{" "}
            take you?
          </h1>
          <p className="text-gray-600 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Discover unique destinations and book flights with ease. Your next
            adventure is just a search away.
          </p>
        </div>

        {/* Search Widget */}
        <FlightSearchWidget cities={filter} searchAction={searchFlight} />

        {/* Popular Destinations */}
        <div className="mt-16 w-full max-w-5xl">
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="text-2xl font-bold text-text-dark">
              Popular Destinations
            </h3>
            <Link
              href="/available-flights"
              className="text-sky-primary font-bold text-sm hover:underline flex items-center gap-1"
            >
              See all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
            <DestinationCard
              image="/assets/images/thumbnail/thumbnail1.png"
              location="Bali"
              country="Indonesia"
              price="$450"
            />
            <DestinationCard
              image="/assets/images/thumbnail/thumbnail2.png"
              location="Tokyo"
              country="Japan"
              price="$680"
            />
            <DestinationCard
              image="/assets/images/thumbnail/thumbnail3.png"
              location="Singapore"
              country="Singapore"
              price="$320"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 FlyHigher. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
