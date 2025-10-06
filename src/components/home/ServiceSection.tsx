import { ServiceData } from "@/lib/ServiceData";
import ServiceCard from "../ui/ServiceCard";
const ServiceSection = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col gap-1 items-center justify-center">
        <h1 className="font-bold text-3xl text-defined-purple">Our Services</h1>
        <p className="text-defined-brown text-center">
          Comprehensive packing, moving, transport, and storage solutions
          tailored to your relocation needs.
        </p>
      </div>

      <div className=" w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
        {ServiceData.map((item, index) => (
          <div key={index} className=" h-full flex-grow">
            <ServiceCard
              imgsrc={item.imgsrc}
              heading={item.heading}
              description={item.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;