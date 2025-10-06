"use client";
import { useEffect, useRef } from "react";

export default function HomeSlider() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      (videoRef.current as HTMLVideoElement)
        .play()
        .catch((error) => console.log("Autoplay blocked:", error));
    }
  }, []);

  return (
    <div className="w-full h-full">
      <video
        ref={videoRef}
        width="1440"
        height="550"
        loop
        autoPlay
        muted
        playsInline
        className="w-full h-[16rem] md:h-[35rem] object-cover"
      >
        <source src="/videos/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
}