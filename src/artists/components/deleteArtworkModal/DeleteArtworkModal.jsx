import React, { useRef } from "react";

const DeleteArtworkModal = ({ artwork, setArtworks }) => {
  const modalRef = useRef(null);
  const handleDeleteAccept = () => {
    //send deletedArtwork to backend
    setArtworks((prev) => prev.filter((a) => a.id !== artwork.id));
    modalRef.current.close();
  };

  return (
    <div>
      <button
        className="btn btn-error !bg-error"
        onClick={() => modalRef.current?.showModal()}
      >
        Delete
      </button>
      <dialog ref={modalRef} className="modal text-black">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Message</h3>
          <p className="py-4">
            Are you sure you want to delete the {artwork.title} artwork?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={handleDeleteAccept}
              className="btn btn-success !bg-success"
            >
              yes
            </button>
            <button
              onClick={() => modalRef.current?.close()}
              className="btn btn-error !bg-error"
            >
              no
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default DeleteArtworkModal;
