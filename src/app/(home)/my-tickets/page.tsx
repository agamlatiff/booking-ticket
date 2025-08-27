import Navbar from "@/app/_components/Navbar";
import Image from "next/image";

const MyTicketsPage = () => {
  return (
    <>
      <section
        id="Header"
        className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top h-[290px] relative"
      >
        <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] h-[290px]">
          <Navbar />
          <div className="title container max-w-[1130px] mx-auto flex flex-col gap-1 pt-[50px] pb-[68px]">
            <h1 className="font-bold text-[32px] leading-[48px]">My Tickets</h1>
            <p className="font-medium text-lg leading-[27px]">
              183,042 flights avaiable
            </p>
          </div>
          <div className="w-full h-[15px] bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)] absolute bottom-0" />
        </div>
      </section>

      <section
        id="Content"
        className="container max-w-[1130px] mx-auto flex justify-end -mt-[60px] pb-[100px] z-10 relative"
      >
        <div className="ticket-container flex flex-col w-[900px] gap-6">
          <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
            <div className="flex gap-[16px] items-center">
              <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                <Image height={100} width={100}
                  src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 1.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col justify-center-center gap-[2px]">
                <p className="font-bold text-lg">Angga Fly</p>
                <p className="text-sm text-flysha-off-purple">Business Class</p>
              </div>
            </div>
            <p className="w-fit h-fit font-bold text-lg">12 Jan 2024</p>
            <div className="flex items-center gap-[30px]">
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">14:00</p>
                <p className="text-sm text-flysha-off-purple">CGK</p>
              </div>
              <Image height={100} width={100} src="/assets/images/icons/plane-dotted.svg" alt="icon" />
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">22:40</p>
                <p className="text-sm text-flysha-off-purple">PDV</p>
              </div>
            </div>
            <a
              href="my-ticket-details.html"
              className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
            >
              Details
            </a>
          </div>
          <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
            <div className="flex gap-[16px] items-center">
              <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                <Image height={100} width={100}
                  src="/assets/images/background/airplane.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col justify-center-center gap-[2px]">
                <p className="font-bold text-lg">Angga Fly</p>
                <p className="text-sm text-flysha-off-purple">Business Class</p>
              </div>
            </div>
            <p className="w-fit h-fit font-bold text-lg">12 Jan 2024</p>
            <div className="flex items-center gap-[30px]">
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">14:00</p>
                <p className="text-sm text-flysha-off-purple">CGK</p>
              </div>
              <Image height={100} width={100} src="/assets/images/icons/plane-dotted.svg" alt="icon" />
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">22:40</p>
                <p className="text-sm text-flysha-off-purple">PDV</p>
              </div>
            </div>
            <a
              href="my-ticket-details.html"
              className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
            >
              Details
            </a>
          </div>
          <div className="ticket-card flex justify-between items-center rounded-[20px] p-5 bg-flysha-bg-purple">
            <div className="flex gap-[16px] items-center">
              <div className="flex shrink-0 w-[90px] h-[70px] rounded-[14px] overflow-hidden">
                <Image height={100} width={100}
                  src="/assets/images/thumbnail/airplane-taking-off-sunset-scene-generative-ai 2.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex flex-col justify-center-center gap-[2px]">
                <p className="font-bold text-lg">Angga Fly</p>
                <p className="text-sm text-flysha-off-purple">Business Class</p>
              </div>
            </div>
            <p className="w-fit h-fit font-bold text-lg">12 Jan 2024</p>
            <div className="flex items-center gap-[30px]">
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">14:00</p>
                <p className="text-sm text-flysha-off-purple">CGK</p>
              </div>
              <Image height={100} width={100} src="/assets/images/icons/plane-dotted.svg" alt="icon" />
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">22:40</p>
                <p className="text-sm text-flysha-off-purple">PDV</p>
              </div>
            </div>
            <a
              href="my-ticket-details.html"
              className="font-bold text-flysha-black bg-flysha-light-purple rounded-full p-[12px_20px] h-[48px] transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF]"
            >
              Details
            </a>
          </div>
          <p className="text-center text-sm text-[#A0A0AC] h-fit">
            You’ve reached the end of results.
          </p>
        </div>
      </section>
    </>
  );
};

export default MyTicketsPage;
