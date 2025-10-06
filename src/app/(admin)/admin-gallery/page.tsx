import AddToGallery from "@/components/admin/AddToGallery"
const page = () => {
  return (
    <section>
      <div className="flex justify-between items-center p-4 w-full bg-defined-yellow/50 md:px-18 px-4">
        <h1 className="text-4xl font-bold text-defined-purple">
          Admin Gallery
        </h1>
        {/* Logout button */}
      </div>
      <div className="self-padding">
        <AddToGallery />
      </div>
    </section>
  );
}

export default page