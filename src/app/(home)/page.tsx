
import Image from "next/image";


const Home = () => {
  return (
    <>
      <section
        id="Services"
        className="container max-w-[1130px] mx-auto flex flex-col pt-[100px] gap-[30px]"
      >
        <h2 className="font-bold text-[32px] leading-[48px] text-center">
          We Ensure You <br />
          Fly With Us Forever
        </h2>
        <div className="flex justify-between">
          <div className="flex flex-col gap-[30px] w-[220px]">
            <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
              <Image width={35} height={35} src="/assets/images/icons/profile-2user.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl leading-[36px]">Talented Crew</p>
              <p className="leading-[30px] text-flysha-off-purple">
                Our jets protected by metal that can’t be destroyed.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] w-[220px]">
            <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
              <Image width={35} height={35} src="/assets/images/icons/shield-tick.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl leading-[36px]">Safe Guard</p>
              <p className="leading-[30px] text-flysha-off-purple">
                Our jets protected by metal that can’t be destroyed.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] w-[220px]">
            <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
              <Image width={35} height={35} src="/assets/images/icons/crown.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl leading-[36px]">Best Awards</p>
              <p className="leading-[30px] text-flysha-off-purple">
                Our jets protected by metal that can’t be destroyed.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] w-[220px]">
            <div className="flex shrink-0 w-[70px] h-[70px] rounded-full items-center justify-center bg-flysha-light-purple">
              <Image width={35} height={35} src="/assets/images/icons/building-3.svg" alt="icon" />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold text-2xl leading-[36px]">
                Pickup at Home
              </p>
              <p className="leading-[30px] text-flysha-off-purple">
                Our jets protected by metal that can’t be destroyed.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section
  id="Selected"
  className="container max-w-[1130px] mx-auto flex flex-col pt-[100px] gap-[30px]"
>
  <div className="flex justify-between items-center">
    <h2 className="font-bold text-[32px] leading-[48px] text-center">
      Best Selective
    </h2>
    <div className="flex gap-[10px]">
      <button className="flex shrink-0 w-10 h-10 items-center justify-center bg-white rounded-full">
        <Image width={20} height={20}
          src="/assets/images/icons/arrow-right.svg"
          className="rotate-180"
          alt="icon"
        />
      </button>
      <button className="flex shrink-0 w-10 h-10 items-center justify-center bg-white rounded-full">
        <Image width={20} height={20} src="/assets/images/icons/arrow-right.svg" alt="icon" />
      </button>
    </div>
  </div>
  <div className="grid grid-cols-4 gap-[30px]">
    <div className="flex flex-col gap-5">
      <div className="rounded-[30px] h-[310px] overflow-hidden">
        <Image width={120} height={60}
          src="/assets/images/thumbnail/thumbnail1.png"
          className="w-full h-[310px] object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-[14px] items-center">
        <div className="flex shrink-0 w-8 h-8">
          <Image width={120} height={60}
            src="/assets/images/icons/crown-white.svg"
            className="w-8 h-8"
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-bold text-lg">First Lounge</p>
          <p className="text-flysha-off-purple">Manhanggattan</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-5">
      <div className="rounded-[30px] h-[310px] overflow-hidden">
        <Image width={120} height={60}
          src="/assets/images/thumbnail/thumbnail2.png"
          className="w-full h-[310px] object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-[14px] items-center">
        <div className="flex shrink-0 w-8 h-8">
          <Image width={120} height={60}
            src="/assets/images/icons/crown-white.svg"
            className="w-8 h-8"
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-bold text-lg">Business First</p>
          <p className="text-flysha-off-purple">Gulfstream 109-BB</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-5">
      <div className="rounded-[30px] h-[310px] overflow-hidden">
        <Image width={120} height={60}
          src="/assets/images/thumbnail/thumbnail3.png"
          className="w-full h-[310px] object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-[14px] items-center">
        <div className="flex shrink-0 w-8 h-8">
          <Image width={120} height={60}
            src="/assets/images/icons/crown-white.svg"
            className="w-8 h-8"
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-bold text-lg">Pickup at Home</p>
          <p className="text-flysha-off-purple">Bentley Banta</p>
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-5">
      <div className="rounded-[30px] h-[310px] overflow-hidden">
        <Image width={120} height={60}
          src="/assets/images/thumbnail/thumbnail4.png"
          className="w-full h-[310px] object-cover"
          alt="thumbnail"
        />
      </div>
      <div className="flex gap-[14px] items-center">
        <div className="flex shrink-0 w-8 h-8">
          <Image width={120} height={60}
            src="/assets/images/icons/crown-white.svg"
            className="w-8 h-8"
            alt="icon"
          />
        </div>
        <div className="flex flex-col gap-[2px]">
          <p className="font-bold text-lg">Fly Roam</p>
          <p className="text-flysha-off-purple">Capung A19-22</p>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Home;
