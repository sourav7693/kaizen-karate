"use client"
import useElementHeight from "@/hooks/useElementHeight";
import { useState, useEffect } from "react";
import EnquiryForm from "./EnquiryForm";
import Image from "next/image";
import { MdDone } from "react-icons/md";
const AboutSection1 = () => {

  const info = [
    "Authentic Training: Teach the world-renowned, balanced Okinawa Goju-ryu style.",
    "Certified Authority: Affiliated with KAI and WKMf; train with national coaches.",
    "Proven Success: 15 years of excellence with champions at national and international levels.",    
  ];

     const [rightSideHeight, leftSideRef] = useElementHeight<HTMLDivElement>();
     const [isSmallScreen, setIsSmallScreen] = useState(false);

     useEffect(() => {
       const handleResize = () => {
         setIsSmallScreen(window.innerWidth < 768);
       };

       handleResize();
       window.addEventListener("resize", handleResize);

       return () => {
         window.removeEventListener("resize", handleResize);
       };
     }, []);

  return (
    <section className="flex flex-col md:flex-row w-full h-auto justify-between gap-8">
      <div className="w-full md:w-[40%] h-full rounded-xl">
        <Image
          src="/images/abs1.jpg"
          alt="about-1"
          width={500}
          height={500}
          className=" w-full h-full object-cover rounded-xl"
          priority
          style={{ height: isSmallScreen ? "auto" : `${rightSideHeight}px` }}
        />
      </div>

      <div
        className="w-full md:w-[60%] h-full flex flex-col gap-4"
        ref={leftSideRef}
      >
        <h1 className="text-2xl font-bold text-defined-purple">
          Siliguri&apos;s Leading Karate Academy: 15 Years of Goju-Ryu Excellence
        </h1>

        <p className="text-defined-brown text-justify">
          The Kaizen Karate-Do Association India (KKA) is the trusted, leading
          Karate Academy in Siliguri, guided by the philosophy of Kaizen—meaning
          “continuous improvement.” For over 15 glorious years, we have been
          committed to providing comprehensive martial arts training in the
          authentic Okinawa Goju-ryu style, emphasizing a powerful balance of
          hard (Go) and soft (Ju) techniques. Our institute is officially
          affiliated with the Karate Association of India (KAI) and the
          prestigious World Karate Masters Federation (WKMf), ensuring our
          curriculum and instruction meet national and international standards.
          We offer three core programs: rigorous Traditional Karate training,
          competitive Sports Karate led by our KAI-certified national coaches,
          and essential Self Defence for Women and students. We believe training
          is about more than physical skill; it is about teaching respect,
          discipline, focus, and fostering the essential attitude of &apos;Never Give
          Up.&apos; If you are looking for a highly accomplished and certified Karate
          Academy in North Bengal to build confidence, athleticism, and life
          skills, join KKA. Our champions prove that we prepare every student
          for success in the dojo and in life.
        </p>

        <div className="flex flex-col gap-2 w-full">
          {info.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <MdDone className="text-defined-yellow" />
              <p className="text-defined-purple font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection1