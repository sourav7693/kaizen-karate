import mongoose, { Model } from "mongoose";

export interface GalleryDocument extends mongoose.Document {
  gallerId: string;
  name: string;
  gallery_image: {
    public_id: string;
    secure_url: string;
  };
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const gallerySchema = new mongoose.Schema<GalleryDocument>(
  {
    gallerId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gallery_image: {
      type: Object,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true }
);

const Gallery: Model<GalleryDocument> =
  mongoose.models.Gallery ||
  mongoose.model<GalleryDocument>("Gallery", gallerySchema);

export default Gallery;