import Image from "next/image";

const ChooseSeatPage = () => {
  return (
    <section
      id="Chosse-Seat"
      className="container flex flex-col sm:flex-row items-center sm:items-start justify-between sm:w-[904px] pt-10 mx-auto sm:pb-0 min-h-screen"
    >
      <div className="flex h-[calc(100vh-40px)] items-end">
        <div className="flex shrink-0 w-[409px] overflow-visible relative">
          <div className="plane-body absolute overflow-x-hidden sm:overflow-visible bottom-0">
            <Image
              src="/assets/images/background/plane-body.svg"
              className="z-0"
              alt="images"
            />
            <Image
              src="/assets/images/background/plane-windshield.svg"
              className="z-10 absolute transform -translate-x-1/2 left-1/2 top-[18px]"
              alt="images"
            />
            <div className="flex justify-center w-[927px] shrink-0 absolute transform -translate-x-1/2 left-[54%] bottom-0 -z-10 ">
              <Image
                src="/assets/images/background/plane-wings.svg"
                className="w-[927px]"
                alt="images"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 mb-[30px] px-[30px] w-full z-50">
            <div className="flex gap-[30px]">
              <div className="flex items-center gap-[6px]">
                <div className="w-[14px] h-[14px] flex shrink-0 rounded-full bg-flysha-light-purple" />
                <span className="font-semibold">Selected</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[14px] h-[14px] flex shrink-0 rounded-full bg-flysha-dark-grey" />
                <span className="font-semibold">Taken</span>
              </div>
              <div className="flex items-center gap-[6px]">
                <div className="w-[14px] h-[14px] flex shrink-0 rounded-full bg-flysha-black border border-white" />
                <span className="font-semibold">Available</span>
              </div>
            </div>
            <form className="flex flex-col gap-5">
              <div className="seat-row flex justify-between">
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="1A"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      1A
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="1A"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="1B"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      1B
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="1B"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                </div>
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="1C"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      1C
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="1C"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="1D"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      1D
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="1D"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                </div>
              </div>
              <div className="seat-row flex justify-between">
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="2A"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      2A
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="2A"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="2B"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      2B
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="2B"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                </div>
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="2C"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      2C
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="2C"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="2D"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      2D
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="2D"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="seat-row flex justify-between">
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="3A"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      3A
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="3A"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="3B"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      3B
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="3B"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                </div>
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="3C"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      3C
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="3C"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="3D"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      3D
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="3D"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                </div>
              </div>
              <div className="seat-row flex justify-between">
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="4A"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      4A
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="4A"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="4B"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      4B
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="4B"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                </div>
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="4C"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      4C
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="4C"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="4D"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      4D
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="4D"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="seat-row flex justify-between">
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="5A"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      5A
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="5A"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="5B"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      5B
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="5B"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                </div>
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="5C"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      5C
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="5C"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="5D"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      5D
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="5D"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="seat-row flex justify-between">
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="6A"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      6A
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="6A"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="6B"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      6B
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="6B"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                      disabled
                    />
                  </div>
                </div>
                <div className="seat-col flex gap-[19px]">
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="6C"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      6C
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="6C"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                  <div className="group flex shrink-0 w-[60px] h-[60px] items-center justify-center relative">
                    <label
                      htmlFor="6D"
                      className="absolute font-bold text-[20px] group-has-[:disabled]:text-[#797684] group-has-[:checked]:text-flysha-black"
                    >
                      6D
                    </label>
                    <input
                      type="radio"
                      name="seat"
                      id="6D"
                      className="w-[60px] h-[60px] appearance-none rounded-[15px] checked:bg-flysha-light-purple ring-2 ring-white checked:ring-flysha-light-purple disabled:ring-0 disabled:bg-flysha-dark-grey"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[30px] mt-[61px] pb-[30px]">
        <h1 className="font-bold text-[32px] leading-[48px] text-center">
          Jakarta to Shanghai
        </h1>
        <div className="flex flex-col items-center gap-[30px] w-[335px]">
          <div className="flex flex-col gap-[10px] w-full">
            <div className="flex justify-center shrink-0">
              <Image
                src="/assets/images/icons/plane-dotted-curve.svg"
                alt="icon"
              />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">14:00</p>
                <p className="text-sm text-flysha-off-purple">CGK</p>
              </div>
              <div className="flex flex-col gap-[2px] text-center">
                <p className="font-bold text-lg">22:40</p>
                <p className="text-sm text-flysha-off-purple">PDV</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="flex shrink-0 w-full h-[130px] rounded-[14px] overflow-hidden">
              <Image
                src="/assets/images/background/airplane.png"
                className="w-full h-full object-cover"
                alt="image"
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-[2px]">
                <p className="font-bold text-lg">Angga Fly</p>
                <p className="text-sm text-flysha-grey">AF-293 • First Class</p>
              </div>
              <div className="flex h-fit">
                <Image
                  src="/assets/images/icons/Star.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <Image
                  src="/assets/images/icons/Star.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <Image
                  src="/assets/images/icons/Star.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <Image
                  src="/assets/images/icons/Star.svg"
                  className="w-5 h-5"
                  alt="star"
                />
                <Image
                  src="/assets/images/icons/Star.svg"
                  className="w-5 h-5"
                  alt="star"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <div className="flex justify-between">
              <span>Date</span>
              <span className="font-semibold">10 March 2024</span>
            </div>
            <div className="flex justify-between">
              <span>Seat Choosen</span>
              <span className="font-semibold">3C</span>
            </div>
            <div className="flex justify-between">
              <span>Passenger</span>
              <span className="font-semibold">1 Person</span>
            </div>
            <div className="flex justify-between">
              <span>Seat Price</span>
              <span className="font-semibold">Rp 25.590.333</span>
            </div>
          </div>
          <a
            href="checkout.html"
            className="font-bold text-flysha-black bg-flysha-light-purple rounded-full h-12 w-full transition-all duration-300 hover:shadow-[0_10px_20px_0_#B88DFF] flex justify-center items-center"
          >
            Continue to Book
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChooseSeatPage;
