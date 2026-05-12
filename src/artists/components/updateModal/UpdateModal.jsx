import { useRef } from "react";
import UpdateArtworkForm from "../updateArtworkForm/UpdateArtworkForm";

const UpdateModal = ({ artwork, tags, setArtworks, artworks }) => {
  const modalRef = useRef();

  return (
    <div className="">
      <button className="btn btn-warning !bg-warning" onClick={() => modalRef.current.showModal()}>
        Update
      </button>
      <dialog ref={modalRef} className="modal text-black ">
        <div className="modal-box !pb-0">
          <h3 className="font-bold text-lg">Update your artwork</h3>
          <UpdateArtworkForm
            modalRef={modalRef}
            artwork={artwork}
            tags={tags}
            artworks={artworks}
            setArtworks={setArtworks}
          />
          <div className="modal-action ">
            <form method="dialog" >

            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default UpdateModal;
