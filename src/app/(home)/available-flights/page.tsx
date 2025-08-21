import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import Link from "next/link";
import FilterClass from "./_components/FilterClass";
import FIlterFlight from "./_components/FIlterFlight";
import FilterAirline from "./_components/FilterAirline";

const AvailableFlightsPage = () => {
  return (
    <>
      <>
        <section
          id="Header"
          className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top h-[290px] relative"
        >
          <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] h-[290px]">
            <Navbar />
            <div className="title container max-w-[1130px] mx-auto flex flex-col gap-1 pt-[50px] pb-[68px]">
              <h1 className="font-bold text-[32px] leading-[48px]">
                Jakarta to Shanghai
              </h1>
              <p className="font-medium text-lg leading-[27px]">
                183,042 flights avaiable
              </p>
            </div>
            <div className="w-full h-[15px] bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)] absolute bottom-0" />
          </div>
        </section>
        <section
          id="Content"
          className="container max-w-[1130px] mx-auto -mt-[33px] z-10 relative pb-[105px]"
        >
          <div className="flex w-full">
            <form className="ticket-filter flex flex-col shrink-0 w-[230px] gap-[30px] text-flysha-off-purple">
              <FilterClass />
              <FIlterFlight />
              <FilterAirline />
            </form>
            <div className="ticket-container flex flex-col w-full gap-6">
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 1.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Angga Fly</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 28.495.220</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/background/airplane.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Angga Fly</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 5.392.444</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Angga Fly</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 589.309.392</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Super Air Star</p>
                    <p className="text-sm text-flysha-off-purple">
                      Economy Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">09:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">13:00</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 5.392.444</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Super Air Star</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 5.392.444</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Angga Fly</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 28.495.220</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Angga Fly</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 28.495.220</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
                <div className="flex gap-[16px] items-center">
                  <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                    <Image
                      width={120}
                      height={120}
                      src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                      className="w-full h-full object-cover"
                      alt="thumbnail"
                    />
                  </div>
                  <div className="flex flex-col justify-center-center gap-[2px]">
                    <p className="font-bold text-lg">Angga Fly</p>
                    <p className="text-sm text-flysha-off-purple">
                      Business Class
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-[30px]">
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">14:00</p>
                    <p className="text-sm text-flysha-off-purple">CGK</p>
                  </div>
                  <Image
                    width={120}
                    height={120}
                    src="/assets/images/icons/plane-dotted.svg"
                    alt="icon"
                  />
                  <div className="flex flex-col gap-[2px] text-center">
                    <p className="font-bold text-lg">22:40</p>
                    <p className="text-sm text-flysha-off-purple">PDV</p>
                  </div>
                </div>
                <p className="w-fit h-fit font-bold text-lg">Rp 5.392.444</p>
                <Link
                  href="choose-seat.html"
                  className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
                >
                  Book Flight
                </Link>
              </div>
              <p className="text-center text-sm text-[#A0A0AC] h-fit">
                You’ve reached the end of results.
              </p>
            </div>
          </div>
        </section>
      </>
    </>
  );
};

export default AvailableFlightsPage;
