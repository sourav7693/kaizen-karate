import Link from "next/link";
import React from "react";
import { FaFacebook, FaGoogle, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaPhoneVolume, FaWhatsapp } from "react-icons/fa6";

const TopHeader = () => {
  return (
    <section className="md:px-18 px-4 z-[60] w-full flex bg-defined-yellow">
      <div className="w-full h-[3rem] hidden text-defined-purple md:flex justify-between sm:gap-2 md:gap-0 items-center">
        <div className=" flex items-center gap-2 font-medium">
          <Link
            className="hover:scale-105 transition-all duration-300"
            href={"https://share.google/EBAbLakR1LeQSacxq"}
            target="_blank"
          >
            <FaGoogle className=" size-5" />
          </Link>
          <Link
            className="hover:scale-105 transition-all duration-300"
            href={"https://www.youtube.com/@kaizenkarateassociationindia"}
            target="_blank"
          >
            <FaYoutube className=" size-5" />
          </Link>
          <Link
            className="hover:scale-105 transition-all duration-300"
            href={"https://www.instagram.com/kaizenkarate07/"}
            target="_blank"
          >
            <FaInstagram className=" size-5" />
          </Link>
          <Link
            className="hover:scale-105 transition-all duration-300"
            href={"https://www.facebook.com/kaizenkarateindia/"}
            target="_blank"
          >
            <FaFacebook className=" size-5" />
          </Link>
        </div>
        <div className="xlg:text-base text-sm flex items-center gap-2 font-medium">
          <FaPhoneVolume className=" size-5" />{" "}
          <Link href={"tel:+919832480087"}>+91 98324 80087</Link>
        </div>
      </div>
    </section>
  );
};

export default TopHeader;