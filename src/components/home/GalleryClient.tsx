"use client";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GalleryDocument } from "@/models/Gallery";

import "swiper/css";

const GalleryClient = ({ Gallery }: { Gallery: GalleryDocument[] }) => {
  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="py-4 w-full">
        <Swiper
          spaceBetween={20}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          breakpoints={{
            0: { slidesPerView: 1 }, // mobile
            640: { slidesPerView: 2 }, // small screens
            860: { slidesPerView: 3 }, // tablets
            1024: { slidesPerView: 4 }, // desktop
          }}
          className="w-full"
        >
          {Gallery.filter((g) => g.status).map((gallery) => (
            <SwiperSlide
              key={gallery.galleryId}
              className="!flex items-center justify-center"
            >
              <div className="relative w-64 h-64 rounded-lg overflow-hidden">
                <Image
                  src={gallery.gallery_image.secure_url}
                  alt={gallery.galleryId}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default GalleryClient;
