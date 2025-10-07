"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import { deleteExistingGallery, getAllGallery, updateGallery } from "@/actions/gallery";
import { GalleryDocument } from "@/models/Gallery";
import ToggleInput from "@/components/ui/ToggleInput";
import Loader from "@/components/ui/Loader";
import Spinner from "../ui/Spinner";
import { useRouter } from "next/navigation";
import { MdEditDocument } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

export default function GalleryList({
  Gallerys,
  pagination,
}: {
  Gallerys: GalleryDocument[];
  pagination: {
    totalCount: number;
    currentPage: number;
    limit: number;
    totalPages: number;
  };
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{ name?: string; image?: File }>({});
  const [tableLoading, setTableLoading] = useState(false);
  const [confirmModalId, setConfirmModalId] = useState<string | null>(null);
  const router = useRouter();
  const [gallerys, setGallerys] = useState<GalleryDocument[]>([]);
  useEffect(() => {
    setGallerys(Gallerys);
  }, [Gallerys]);

  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const loadMore = async () => {
    if (pagination.totalPages <= page) {
      return;
    }
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // optional delay
      const nextPage = page + 1;
      const newGallerys = await getAllGallery(nextPage);
      if (newGallerys?.success) {
        setGallerys((prev) => [...prev, ...newGallerys.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more FAQs", error);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  const handleEdit = async (id: string, data: typeof formData) => {
    if (!data.name && !data.image) return;
    setTableLoading(true);
    await updateGallery(id, data.image, undefined, data.name);
    setEditingId(null);
    setFormData({});
    router.refresh();
    setTableLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    setTableLoading(true);
    const res = await deleteExistingGallery(id);
    if (res.success) {
      toast.success(`"${name}" deleted successfully`);
    } else {
      toast.error("Failed to delete gallery");
    }
    setConfirmModalId(null);
    router.refresh();
    setEditingId(null);
    setTableLoading(false);
  };

  const thead = ["Name", "Image", "Actions", "Active Status"];

  if (tableLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="font-bold text-white bg-defined-purple">
            <tr>
              {thead.map((item, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {gallerys.map((item: GalleryDocument) => (
              <tr
                key={item.galleryId}
                className="bg-white border-b border-defined-brown last:border-transparent"
              >
                {/* Name */}
                <td className="px-6 py-4 font-semibold">
                  {editingId === item.galleryId ? (
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={item.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Gallery Name"
                      className="w-[80%] p-2 border border-gray-300 rounded"
                    />
                  ) : (
                    item.name
                  )}
                </td>

                {/* Image */}
                <td className="px-6 py-4">
                  {editingId === item.galleryId ? (
                    <div className="flex gap-2 items-center">
                      <input
                        type="file"
                        name="image"
                        required
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            image: e.target.files?.[0],
                          })
                        }
                        className="w-[80%] p-2 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => handleEdit(item.galleryId, formData)}
                        className="bg-defined-purple text-white px-4 py-2 rounded shadow"
                      >
                        Update
                      </button>
                      <IoIosCloseCircleOutline
                        size={26}
                        className="text-red-500 cursor-pointer"
                        onClick={() => setEditingId(null)}
                      />
                    </div>
                  ) : (
                    <Image
                      src={item.gallery_image.secure_url}
                      alt="gallery"
                      width={100}
                      height={100}
                      className="rounded w-[8rem] h-full object-cover"
                    />
                  )}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 space-x-2">
                  {editingId !== item.galleryId && (
                    <>
                      <button
                        className="p-1 bg-purple-500 text-white rounded text-sm"
                        onClick={() => setEditingId(item.galleryId)}
                      >
                        <MdEditDocument className="size-4" />
                      </button>
                      <button
                        className="p-1 bg-red-600 text-white rounded text-sm"
                        onClick={() => setConfirmModalId(item.galleryId)}
                      >
                        <FiTrash2 className="size-4" />
                      </button>
                    </>
                  )}
                </td>

                {/* Active Status */}
                <td className="px-6 py-4">
                  <ToggleInput
                    status={item.status}
                    changeStatus={() =>
                      updateGallery(
                        item.galleryId as string,
                        undefined,
                        !item.status
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {confirmModalId && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-md shadow-md p-6 w-[90%] max-w-md text-center space-y-4">
            <p className="text-lg font-semibold">
              Are you sure you want to delete this gallery?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setConfirmModalId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => {
                  const gallery = Gallerys.find(
                    (s) => s.galleryId === confirmModalId
                  );
                  if (gallery) handleDelete(gallery.galleryId, gallery.name);
                }}
              >
                {tableLoading ? (
                  <div className="flex gap-2 items-center">
                    <span className="animate-pulse">Deleting...</span>{" "}
                    <Spinner />
                  </div>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {pagination.totalPages <= page ? null : (
        <div className="flex justify-center items-center gap-4" ref={ref}>
          {/* spinner */}
          <span className="animate-pulse text-2xl font-bold">Loading...</span>
          <div
            className="size-9 inline-block rounded-full border-6 border-r-defined-purple border-solid animate-spin border-white"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      )}
    </>
  );
}
