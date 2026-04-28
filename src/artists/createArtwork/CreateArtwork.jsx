import CreateArtworksForm from "../components/createArtworksForm/CreateArtworksForm";

const CreateArtwork = ({ tags }) => {
  return (
    <div className="flex flex-col items-center w-full gap-3">
      <div className=" self-center">
        <h2 className="text-3xl font-serif">Add your latest artwork</h2>
      </div>
      <CreateArtworksForm tags={tags} />
    </div>
  );
};

export default CreateArtwork;
