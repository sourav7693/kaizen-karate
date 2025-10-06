"use client";
import SubBanner from '@/components/global/SubBanner';
import MainTemplate from '@/templates/MainTemplate'
import useElementHeight from "@/hooks/useElementHeight";
import { useState, useEffect } from "react";
import Image from 'next/image';

const page = () => {
  const classes = [
    {
      title: "Traditional Karate",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque blanditiis maxime libero est non iste, aliquam, ratione veniam, voluptatum quis nostrum. Deleniti nostrum omnis facilis, saepe alias ab mollitia deserunt assumenda possimus, iste tempora modi distinctio minus amet nesciunt delectus commodi! Eveniet quia in, iure quam possimus id quo adipisci voluptatum soluta assumenda iste, distinctio ipsa. Dolores quas vitae rem iste, atque enim perferendis adipisci incidunt harum culpa quidem saepe dolorum totam? Quisquam impedit molestias iusto rem blanditiis eum deleniti eligendi nulla veniam maiores odit perferendis, praesentium et tempore amet illum odio illo! Dolore autem, eos adipisci eaque quis saepe!",
      imageUrl: "/images/class1.jpg",
    },
    {
      title: "Sports Karate",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque blanditiis maxime libero est non iste, aliquam, ratione veniam, voluptatum quis nostrum. Deleniti nostrum omnis facilis, saepe alias ab mollitia deserunt assumenda possimus, iste tempora modi distinctio minus amet nesciunt delectus commodi! Eveniet quia in, iure quam possimus id quo adipisci voluptatum soluta assumenda iste, distinctio ipsa. Dolores quas vitae rem iste, atque enim perferendis adipisci incidunt harum culpa quidem saepe dolorum totam? Quisquam impedit molestias iusto rem blanditiis eum deleniti eligendi nulla veniam maiores odit perferendis, praesentium et tempore amet illum odio illo! Dolore autem, eos adipisci eaque quis saepe!",
      imageUrl: "/images/class2.jpg",
    },
    {
      title: "Self Defence for Women’s",
      detail:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque blanditiis maxime libero est non iste, aliquam, ratione veniam, voluptatum quis nostrum. Deleniti nostrum omnis facilis, saepe alias ab mollitia deserunt assumenda possimus, iste tempora modi distinctio minus amet nesciunt delectus commodi! Eveniet quia in, iure quam possimus id quo adipisci voluptatum soluta assumenda iste, distinctio ipsa. Dolores quas vitae rem iste, atque enim perferendis adipisci incidunt harum culpa quidem saepe dolorum totam? Quisquam impedit molestias iusto rem blanditiis eum deleniti eligendi nulla veniam maiores odit perferendis, praesentium et tempore amet illum odio illo! Dolore autem, eos adipisci eaque quis saepe!",
      imageUrl: "/images/class3.jpg",
    },
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
    <MainTemplate>
      <SubBanner heading="Our Classes" />
      <section className="self-padding">
        <h1 className='text-xl md:text-3xl font-bold text-defined-purple'>Our Training & Classes</h1>
        <div className="flex flex-col justify-center items-center gap-8">
          {classes.map((classItem, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row w-full h-auto justify-between gap-8"
            >
              <div className="w-full md:w-[40%] h-full rounded-xl">
                <Image
                  src={classItem.imageUrl}
                  alt={classItem.title}
                  width={500}
                  height={500}
                  className=" w-full h-full object-cover rounded-xl"
                  style={{
                    height: isSmallScreen ? "auto" : `${rightSideHeight}px`,
                  }}
                />
              </div>
              <div
                className="w-full md:w-[60%] h-full flex flex-col gap-2"
                ref={leftSideRef}
              >
                <h1 className="text-2xl font-bold text-defined-purple">
                  {classItem.title}
                </h1>
                <p className="text-defined-brown text-justify">
                  {classItem.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainTemplate>
  );
}

export default page