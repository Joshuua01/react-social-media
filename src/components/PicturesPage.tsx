import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { addPicture, selectPictures } from "../features/picture/pictureSlice";
import Picture from "./Picture";
import { selectAlbums } from "../features/album/albumSlice";
import { useRef, useState } from "react";
import { AppDispatch } from "../tools/store";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";

const PicturesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const urlParams = new URLSearchParams(window.location.search);
  const currentUser = useSelector(selectCurrentUser);
  const inputFile = useRef<HTMLInputElement | null>(null);
  const pictures = useSelector(selectPictures).filter(
    (picture) => picture.albumId === Number(urlParams.get("album"))
  );
  const album = useSelector(selectAlbums).find(
    (album) => album.id === Number(urlParams.get("album"))
  );
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadedImage, setIsUploadedImage] = useState(false);
  const [imageTitle, setImageTitle] = useState("");
  const albumOwnerId = album ? album.userId : null;

  const handlePictureSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handlePictureAdd = () => {
    inputFile.current?.click();
    setIsUploadedImage(true);
  };

  const handlePictureUpload = () => {
    if (imageUrl) {
      dispatch(
        addPicture({
          albumId: Number(urlParams.get("album")),
          title: imageTitle,
          url: imageUrl,
        })
      );
      setImageUrl("");
      setImageTitle("");
      setIsUploadedImage(false);
      if (inputFile.current && inputFile.current.value) {
        inputFile.current.value = "";
      }
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-slate-900">
      <Navbar />
      {currentUser?.id === albumOwnerId && (
        <div className="w-full mt-5 flex justify-center items-center">
          <div className="w-7/12 flex">
            <div className="w-3/5 min-w-0">
              <input
                className="hidden"
                id="file_input"
                type="file"
                onChange={handlePictureSelect}
                ref={inputFile}
              />
              <input
                type="text"
                placeholder="Enter title..."
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="relative block w-full rounded-l-md text-sm border ring-1 ring-gray-600 py-1.5 focus:ring-indigo-600 focus:border-indigo-600 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
              />
            </div>
            {isUploadedImage ? (
              <button
                type="button"
                onClick={handlePictureUpload}
                className="min-w-0 flex-1 relative items-center gap-x-1.5 rounded-r-md px-3 py-1.5 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
              >
                Upload Picture
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePictureAdd}
                className="min-w-0 flex-1 relative items-center gap-x-1.5 rounded-r-md px-3 py-1.5 text-sm font-semibold text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
              >
                Add Picture
              </button>
            )}
          </div>
        </div>
      )}
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
