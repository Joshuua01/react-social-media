import { useDispatch, useSelector } from "react-redux";
import { IPicture } from "../entities/IPicture";
import { selectCurrentUser } from "../features/currentUser/currentUserSlice";
import { AppDispatch } from "../tools/store";
import { removePicture } from "../features/picture/pictureSlice";

interface PictureProps {
  picture: IPicture;
  albumOwnerId: number | null;
}

const Picture: React.FC<PictureProps> = ({ picture, albumOwnerId }) => {
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch<AppDispatch>();
  const handleDeletePicture = () => {
    dispatch(removePicture(picture.id));
  };

  return (
    <div className="flex justify-center items-center flex-col col-span-1 relative">
      <img className="" src={picture.url} alt={picture.title} />
      <div className="absolute bottom-0 top-0 bg-slate-800 bg-opacity-80 text-white w-full flex justify-center items-center p-7 opacity-0 hover:opacity-100 transition-all duration-300">
        {picture.title}
      </div>
      {currentUser?.id == albumOwnerId && (
        <svg
          viewBox="0 0 448 512"
          fill="currentColor"
          className="w-5 h-5 cursor-pointer absolute top-0 right-0 m-2"
          onClick={handleDeletePicture}
        >
          <path
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z"
            className="text-indigo-600 hover:text-red-600 "
          />
        </svg>
      )}
    </div>
  );
};

export default Picture;
