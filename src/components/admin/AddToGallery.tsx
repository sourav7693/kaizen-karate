"use client";
import { toast } from "react-hot-toast";
import { createNewGallery } from "@/actions/gallery";
import { useActionState, useState } from "react";
import Spinner from "../ui/Spinner";

export default function AddGallery() {
  const [file, setFile] = useState<File | null>(null);
  async function addNewGallery(prevState: unknown, formData: FormData) {
    try {
      const name = formData.get("name") as string;
      const galleryImg = formData.get("component_image") as File;

      if (!name?.trim()) {
        toast.error("Gallery Name is required");
        return null;
      }

      if (!galleryImg || galleryImg.size === 0) {
        toast.error("Gallery Image is required");
        return null;
      }

      const gallery = await createNewGallery(
        name.trim().charAt(0).toUpperCase() + name.slice(1),
        galleryImg
      );

      if (!gallery) {
        toast.error("Something went wrong creating the gallery.");
        return null;
      }

      setFile(null);
      toast.success("Gallery item added successfully");
      return gallery;
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      return null;
    }
  }

  const [, formActions, isPending] = useActionState(addNewGallery, null);
  return (
    <form className="flex gap-2 items-center" action={formActions}>
      <input
        type="text"
        placeholder={`Gallery Name`}
        name="name"
        className="px-2 h-[3rem] border border-defined-purple outline-none placeholder:text-defined-blue rounded-md flex-1 capitalize placeholder:capitalize"
      />
      <div className="relative flex-1 h-[3rem] border border-defined-purple rounded-md truncate">
        <label
          htmlFor="file-input"
          className="absolute capitalize top-1/2 left-2 transform -translate-y-1/2 text-defined-blue cursor-pointer truncate"
        >
          {file ? file.name : "Choose Gallery Image"}
        </label>
        <input
          id="file-input"
          type="file"
          name="component_image"
          accept="image/*"
          onChange={(e) => setFile(e.target?.files?.[0] ?? null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer truncate"
        />
      </div>
      <button
        className="h-[3rem] flex justify-center items-center flex-1 bg-defined-purple text-base font-medium text-white rounded-md"
        type="submit"
      >
        {isPending ? (
          <div className="flex gap-6 items-center">
            <span>Adding Gallery...</span>
            <Spinner />
          </div>
        ) : (
          "Add Gallery"
        )}
      </button>
    </form>
  );
}
