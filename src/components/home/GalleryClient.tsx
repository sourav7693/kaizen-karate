"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GalleryDocument } from "@/models/Gallery";

const GalleryClient = ({ Gallery }: { Gallery: GalleryDocument[] }) => {
    const [slidesToShow, setSlidesToShow] = useState(4);

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 460) {
          setSlidesToShow(1);
        } else if (window.innerWidth <= 860) {
          setSlidesToShow(3);
        } else if (window.innerWidth <= 1024) {
          setSlidesToShow(4);
        } else {
          setSlidesToShow(4);
        }
      };

      window.addEventListener("resize", handleResize);
      handleResize();

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);
  return (
    <section className="flex flex-col gap-4">
      <div className="py-4 flex gap-4 items-center justify-center">
        <div className="w-[80rem] py-4">
          <Swiper
            slidesPerView={slidesToShow}
            spaceBetween={10}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            className="w-full flex items-center justify-center"
          >
            {Gallery.map(
              (gallery) =>
                gallery.status && (
                  <SwiperSlide
                    key={gallery.galleryId}
                    className="!flex items-center justify-center"
                  >
                    <div className="relative w-64 h-64 flex items-center justify-center rounded-lg overflow-hidden">
                      <Image
                        src={gallery.gallery_image.secure_url}
                        alt={gallery.galleryId}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </SwiperSlide>
                )
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

export default GalleryClient