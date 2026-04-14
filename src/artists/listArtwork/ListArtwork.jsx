import ArtworksCard from "../components/artworksCard/ArtworksCard";

const ListArtwork = ({ artworks,setArtworks,tags}) => {
  return (
    <div className="grid  grid-cols-1  lg:grid-cols-2 gap-5">
      {artworks.map((artwork) => (
      <ArtworksCard key={artwork.id} artworks={artworks} artwork={artwork} setArtworks={setArtworks} tags={tags}/>
      ))}
    </div>
  );
};

export default ListArtwork;
