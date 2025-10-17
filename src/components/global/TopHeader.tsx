import { Dancing_Script } from "next/font/google";
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const TopHeader = () => {
  return (
    <section className="md:px-18 px-4 z-[60] w-full flex bg-white">
      <div className="w-full h-[10rem] hidden text-defined-purple md:flex flex-col self-start pt-2 sm:gap-2 md:gap-0 items-center">
        <h1 className="text-5xl  font-extrabold text-red-500 text-shadow-lg ">
          KAIZEN KARATE - DO ASSOCIATION INDIA
        </h1>
        <div className={`font-semibold text-xl text-center`}>
          <p>AFFILIATED TO OKINAWA GOJU-RYU KARATE-DO FEDERATION MALAYSIA</p>
          <p>MEMBER : WORLD KARATE MASTERS FEDERATION (WKMF)</p>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;
