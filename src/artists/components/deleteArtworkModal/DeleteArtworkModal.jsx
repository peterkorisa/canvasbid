import React, { useRef } from "react";
import { artworkService } from "../../../services/artworkService";

const DeleteArtworkModal = ({ artwork, setArtworks }) => {
  const modalRef = useRef(null);
  const handleDeleteAccept = async () => {
    try {
      const targetId = artwork.artworkId || artwork.id;
      
      // If it's a locally generated fake pending ID, do not call the backend.
      const isPendingLocalOnly = typeof targetId === 'string' && targetId.startsWith('pending-');

      if (targetId && !isPendingLocalOnly) {
        await artworkService.delete(targetId);
      }
      
      // Update local state
      setArtworks((prev) => prev.filter((a) => (a.artworkId || a.id) !== targetId));
      
      // Update local storage
      const pendingArtworks = JSON.parse(localStorage.getItem('artistPendingArtworks') || '[]');
      const updatedPending = pendingArtworks.filter(a => (a.artworkId || a.id) !== targetId);
      localStorage.setItem('artistPendingArtworks', JSON.stringify(updatedPending));
      
      modalRef.current.close();
    } catch (error) {
      alert("Failed to delete artwork: " + error.message);
    }
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
