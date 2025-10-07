export const dynamic = "force-dynamic";
import { GalleryDocument } from "@/models/Gallery";
import GalleryClient from "./GalleryClient";

const GallerySection = ({ Gallery }: { Gallery: GalleryDocument[] }) => {
  
  return (
    <section className="flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-defined-purple">Gallery</h1>
      <GalleryClient Gallery={Gallery} />
    </section>
  );
};

export default GallerySection;
