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

  const albumOwnerId = useSelector(selectAlbums).find(
    (album) => album.id === Number(urlParams.get("album"))
  ).userId;

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
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
