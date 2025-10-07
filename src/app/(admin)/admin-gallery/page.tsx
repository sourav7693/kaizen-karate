import { getAllGallery } from "@/actions/gallery";
import AddToGallery from "@/components/admin/AddToGallery"
import GalleryList from "@/components/admin/GalleryList";
import { GalleryResponse } from "@/models/Gallery";
const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page } = await searchParams;
  const pageData = await getGalleryData(page);

  return (
    <section>      
      <div className="self-padding">
        <AddToGallery />
        <GalleryList Gallerys={pageData.data} pagination={pageData.pagination}/>
      </div>
    </section>
  );
};

export default page

async function getGalleryData(
  page: number | string = 1
): Promise<GalleryResponse> {
  try {
    const sliders = await getAllGallery(parseInt((page as string) ?? "1"));
    return sliders;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
        limit: 10,
        totalPages: 0,
      },
    };
  }
}