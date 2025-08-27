import Navbar from "@/app/_components/Navbar";
import { getUser } from "@/lib/auth";
import Image from "next/image";
import React from "react";
import CheckoutCart from "./_components/CheckoutCart";
import Link from "next/link";

const SuccessPage = async () => {
  
  const {user} = await getUser()
  return (
    <>
      <section
        id="Header"
        className="bg-[url('/assets/images/background/airplane.png')] bg-no-repeat bg-cover bg-left-top h-[290px] relative"
      >
        <div className="Header-content bg-gradient-to-r from-[#080318] to-[rgba(8,3,24,0)] h-[290px]">
          <Navbar />
          <div className="w-full h-[15px] bg-gradient-to-t from-[#080318] to-[rgba(8,3,24,0)] absolute bottom-0" />
        </div>
      </section>

      <section
        id="Content"
        className="container max-w-[1130px] mx-auto -mt-[103px] z-10 relative"
      >
        <div className="checkout-container flex justify-center items-center gap-[100px]">
<CheckoutCart user={user}/>
            <div className="flex flex-col p-[20px_20px_25px] border-b-2 border-dotted border-flysha-grey gap-4 relative">
              <div className="flex w-[300px] h-[130px] shrink-0 rounded-[14px] overflow-hidden bg-[#EDE8F5]">
                <Image width={300} height={130}
                  src="/assets/images/background/airplane.png"
                  className="w-full h-full object-cover"
                  alt="thumbnail"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-[2px]">
                  <p className="font-bold text-lg text-flysha-black">
                    Angga Fly
                  </p>
                  <p className="text-sm text-flysha-grey">
                    AF-293 • First Class
                  </p>
                </div>
                <div className="flex h-fit">
                  <Image width={25} height={25}
                    src="/assets/images/icons/Star.svg"
                    className="w-5 h-5"
                    alt="star"
                  />
                  <Image width={25} height={25}
                    src="/assets/images/icons/Star.svg"
                    className="w-5 h-5"
                    alt="star"
                  />
                  <Image width={25} height={25}
                    src="/assets/images/icons/Star.svg"
                    className="w-5 h-5"
                    alt="star"
                  />
                  <Image width={25} height={25}
                    src="/assets/images/icons/Star.svg"
                    className="w-5 h-5"
                    alt="star"
                  />
                  <Image width={25} height={25}
                    src="/assets/images/icons/Star.svg"
                    className="w-5 h-5"
                    alt="star"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center w-[370px] absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 -bottom-[30px]">
                <div className="w-[30px] h-[30px] rounded-full flex shrink-0 bg-flysha-black" />
                <div className="w-[30px] h-[30px] rounded-full flex shrink-0 bg-flysha-black" />
              </div>
            </div>
            <div className="flex flex-col gap-[10px] p-[25px_20px_20px]">
              <div className="flex justify-between text-flysha-black">
                <span>Date</span>
                <span className="font-semibold">10 March 2024</span>
              </div>
              <div className="flex justify-between text-flysha-black">
                <span>Time</span>
                <span className="font-semibold">09:00 - 12:00</span>
              </div>
              <div className="flex justify-between text-flysha-black">
                <span>Airport</span>
                <span className="font-semibold">CGK - PDV</span>
              </div>
              <div className="flex justify-between text-flysha-black">
                <span>Name</span>
                <span className="font-semibold">Angga Risky</span>
              </div>
              <div className="flex justify-between text-flysha-black">
                <span>Seat Choosen</span>
                <span className="font-semibold">3C</span>
              </div>
              <div className="flex justify-between text-flysha-black">
                <span>Passport No.</span>
                <span className="font-semibold">AB2091MB</span>
              </div>
              <div className="flex justify-between text-flysha-black">
                <span>Passenger</span>
                <span className="font-semibold">1 Person</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[42px] w-fit">
            <h1 className="font-bold text-[32px] leading-[48px]">
              Success Checkout. <br />
              Enjoy Your Best Flight.
            </h1>
            <div className="flex flex-col gap-[14px]">
              <Link
                href="/available/flights"
                className="font-bold text-flysha-black bg-flysha-light-purple rounded-full h-12 w-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] flex justify-center items-center"
              >
                Book More Flights
              </Link>
              <Link
                href="/my-tickets"
                className="font-semibold bg-flysha-black hover:bg-flysha-bg-purple border border-white hover:border-0 rounded-full h-12 w-full transition-all duration-300 flex justify-center items-center"
              >
                View My Tickets
              </Link>
            </div>

        </div>
      </section>
    </>
  );
};

export default SuccessPage;
