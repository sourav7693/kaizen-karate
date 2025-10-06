"use server";
import os from "os";
import { connectDb } from "@/lib/connection";
import Gallery, { GalleryDocument } from "@/models/Gallery";
import { deleteFile, uploadFile } from "@/lib/cloudinaryService";
import { generateCustomId } from "@/helper/generateCustomId";
import { parseImage } from "@/helper/parseImage";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export async function createNewGallery(name: string, gallery_image: File) {
  try {
    if (!name || !gallery_image) {
      return { success: false, message: "All fields required" };
    }

    await connectDb();

    const tempFilePath = await parseImage(gallery_image);

    const [fileUploadResult, galleryId] = await Promise.all([
      await uploadFile(tempFilePath),
      generateCustomId(Gallery, "galleryId", "galleryId"),
    ]);

    if (fileUploadResult instanceof Error) {
      return { success: false, message: "Image Upload failed" };
    }

    const newGallery = new Gallery({
      galleryId,
      name,
      gallery_image: {
        secure_url: fileUploadResult.secure_url,
        public_id: fileUploadResult.public_id,
      },
    });

    const savedGallery = await newGallery.save();

    const plainGallery = savedGallery.toObject();

    revalidatePath("/gallery");

    return { success: true, data: JSON.parse(JSON.stringify(plainGallery)) };
  } catch (error) {
    console.error("Error creating Gallery details:", error);
    return { success: false, message: "Internal server error" };
  }
}

export async function deleteExistingGallery(galleryId: string) {
  try {
    await connectDb();
    const deletedGallery = await Gallery.findOne({
      $or: [
        { galleryId },
        {
          _id: mongoose.Types.ObjectId.isValid(galleryId) ? galleryId : undefined,
        },
      ],
    });

    if (!deletedGallery) {
      return { success: false, message: "Gallery not found" };
    }

    await deleteFile(deletedGallery.gallery_image.public_id);
    await Gallery.findByIdAndDelete(deletedGallery._id);
    revalidatePath("/gallery");
    return { success: true, message: "Gallery deleted successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
}

export async function getAllGallery(
  page: number | string = 1,
  limit: number | string = 10,
  sort: string = "createdAt",
  order: "asc" | "desc" = "desc",
  status?: boolean
) {
  try {
    const filter: { status?: boolean } = {};

    if (status !== undefined) filter.status = status;

    // Pagination
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * pageSize;

    // Sorting
    const sortOrder = order === "asc" ? 1 : -1;
    const sortQuery: Record<string, 1 | -1> = { [sort]: sortOrder };

    await connectDb();

    // Fetch components with filters, pagination, and sorting
    const allGallery = await Gallery.find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(pageSize)
      .lean<GalleryDocument[]>();

    // Get total count for pagination metadata
    const totalGallery = await Gallery.countDocuments(filter);

    return {
      success: true,
      data: JSON.parse(JSON.stringify(allGallery)),
      pagination: {
        totalCount: totalGallery,
        currentPage: pageNumber,
        limit: pageSize,
        totalPages: Math.ceil(totalGallery / pageSize),
      },
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: { totalCount: 0, currentPage: 1, limit: 10, totalPages: 0 },
    };
  }
}

export async function updateGallery(
  galleryId: string,
  image?: File,
  status?: boolean,
  name?: string
) {
  try {
    await connectDb();

    const gallery = await Gallery.findOne({
      $or: [
        { galleryId },
        {
          _id: mongoose.Types.ObjectId.isValid(galleryId) ? galleryId : undefined,
        },
      ],
    });

    if (!gallery) {
      return { success: false, message: "Gallery not found", data: null };
    }

    // Update name or status if provided
    if (typeof name === "string") gallery.name = name;
    if (typeof status === "boolean") gallery.status = status;

    // Handle optional image upload
    if (image) {
      // Delete old image
      const oldPublicId = gallery.gallery_image?.public_id;
      if (oldPublicId) await deleteFile(oldPublicId);

      // Prepare and upload new image

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const tempDir = os.tmpdir(); // OS-safe
      const tempFilePath = `${tempDir}/${Date.now()}-${image.name}`;

      await import("fs/promises").then((fs) =>
        fs.writeFile(tempFilePath, buffer)
      );

      const uploadResult = await uploadFile(tempFilePath);

      if (uploadResult instanceof Error) {
        return { success: false, message: uploadResult.message, data: null };
      }

      gallery.gallery_image = {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
    }

    // Save and revalidate
    const saved = await gallery.save();
    revalidatePath("/gallery");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(saved.toObject())),
    };
  } catch (error) {
    console.error("updateGallery error:", error);
    return { success: false, message: "Server error", data: null };
  }
}
