import React from "react";

type ModalProps = {
  onClickAccept: () => void;
  onClickCancel: () => void;
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = (props) => {
  if (!props.isOpen) {
    return;
  }

  return (
    <div>
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-slate-900 opacity-90 z-50"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-10 w-2/5 flex justify-center items-center flex-col gap-5">
          <div className="text-xs font-bold tracking-wider uppercase">
            Are you sure?
          </div>
          <div className="flex gap-x-5 w-full items-center justify-between">
            <button
              type="button"
              className="flex-1 items-center rounded-md px-3 py-3 text-xs font-bold tracking-wider uppercase text-white  bg-indigo-600 ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 transition-all duration-150"
              onClick={props.onClickAccept}
            >
              Accept
            </button>
            <button
              type="button"
              className="flex-1 items-center rounded-md px-3 py-3 text-xs font-bold tracking-wider uppercase text-white  bg-red-600 ring-1 ring-red-600 hover:bg-red-800 hover:ring-red-800 transition-all duration-150"
              onClick={props.onClickCancel}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
