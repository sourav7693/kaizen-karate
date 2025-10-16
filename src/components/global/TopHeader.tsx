
const TopHeader = () => {
  return (
    <section className="md:px-18 px-4 z-[60] w-full flex bg-white">
      <div className="w-full h-[10rem] hidden text-defined-purple md:flex flex-col self-start pt-2 sm:gap-2 md:gap-0 items-center">
        <h1 className="text-5xl  font-extrabold">
          KAIZEN KARATE - DO ASSOCIATION
        </h1>
        <p>
          WKF & AKF AFFILIATED NATIONAL FEDERATION FOR THE SPORTS OF KARATE IN
          INDIA
        </p>
        <p>
          AFFILIATED WITH{" "}
          <span className="font-bold">WORLD KARATE FEDERATION, ASIAN KARATE FEDERATION</span>
        </p>
        <p>
          WKF RECOGNISED BY <span className="font-bold">THE INTERNATIONAL OLYMPIC COMMITTEE</span>
        </p>
      </div>
    </section>
  );
};

export default TopHeader;