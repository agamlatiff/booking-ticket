import Navbar from "@/app/_components/Navbar";
import Image from "next/image";
import Link from "next/link";

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
              <div className="flex flex-col gap-4">
                <p className="font-semibold">Seat Class</p>
                <label
                  htmlFor="economy"
                  className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="seat"
                    id="economy"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Economy
                </label>
                <label
                  htmlFor="business"
                  className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="seat"
                    id="business"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Business
                </label>
                <label
                  htmlFor="first"
                  className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="seat"
                    id="first"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  First
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-semibold">Flight</p>
                <label
                  htmlFor="direct"
                  className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="flight"
                    id="direct"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Direct
                </label>
                <label
                  htmlFor="transit"
                  className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="flight"
                    id="transit"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Transit
                </label>
                <label
                  htmlFor="transits"
                  className="font-semibold flex items-center gap-[10px] has-[:checked]:text-white"
                >
                  <input
                    type="radio"
                    name="flight"
                    id="transits"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-full checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Transits ~5
                </label>
              </div>
              <div className="flex flex-col gap-4">
                <p className="font-semibold">Airlines</p>
                <label
                  htmlFor="garda"
                  className="font-semibold flex items-center gap-[10px] text-white"
                >
                  <input
                    type="checkbox"
                    name="airlines"
                    id="garda"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Garda Flying
                </label>
                <label
                  htmlFor="angga"
                  className="font-semibold flex items-center gap-[10px] text-white"
                >
                  <input
                    type="checkbox"
                    name="airlines"
                    id="angga"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Angga Air
                </label>
                <label
                  htmlFor="singaparna"
                  className="font-semibold flex items-center gap-[10px] text-white"
                >
                  <input
                    type="checkbox"
                    name="airlines"
                    id="singaparna"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Singaparna
                </label>
                <label
                  htmlFor="jakafly"
                  className="font-semibold flex items-center gap-[10px] text-white"
                >
                  <input
                    type="checkbox"
                    name="airlines"
                    id="jakafly"
                    className="w-[18px] h-[18px] appearance-none checked:border-[3px] checked:border-solid checked:border-flysha-black rounded-[6px] checked:bg-flysha-light-purple ring-2 ring-flysha-off-purple checked:ring-white"
                  />
                  Jakafly
                </label>
              </div>
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
