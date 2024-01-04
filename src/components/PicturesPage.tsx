import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import { selectPictures } from "../features/picture/pictureSlice";
import Picture from "./Picture";
import { selectAlbums } from "../features/album/albumSlice";

const PicturesPage: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);

  const pictures = useSelector(selectPictures).filter(
    (picture) => picture.albumId === Number(urlParams.get("album"))
  );

  const album = useSelector(selectAlbums).find(
    (album) => album.id === Number(urlParams.get("album"))
  );

  const albumOwnerId = album ? album.userId : null;

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      <div className="flex justify-center mt-5 items-center">
        <input
          className="w-7/12 border text-sm rounded-lg ring-1 ring-indigo-600 border-indigo-600 block p-2.5 bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-indigo-600 hover:file:bg-indigo-700 file:cursor-pointer file:text-white"
          id="file_input"
          type="file"
        />
      </div>
      <div className="flex justify-center p-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 w-4/5 gap-6 select-none">
          {pictures.map((picture) => (
            <Picture
              key={picture.id}
              picture={picture}
              albumOwnerId={albumOwnerId}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PicturesPage;
