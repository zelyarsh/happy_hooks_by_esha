import MediaLibrary from "../../components/admin/media/MediaLibrary";

function MediaLibraryPage() {
  return (
    <div className="space-y-8">

      <div>

        <p className="uppercase tracking-[4px] text-pink-500 font-semibold">
          Store Assets
        </p>

        <h1 className="text-4xl font-bold mt-2">
          Media Library
        </h1>

        <p className="text-gray-500 mt-2">
          Upload and manage product images, homepage banners and Instagram media.
        </p>

      </div>

      <MediaLibrary />

    </div>
  );
}

export default MediaLibraryPage;