//pending artwork

import PendingArtworksTable from "../../components/pendingArtworksTable/PendingArtworksTable";

const Artworks = ({ pendingArtworks, setPendingArtworks }) => {
  return (
    <div>
      <PendingArtworksTable
        pendingArtworks={pendingArtworks}
        setPendingArtworks={setPendingArtworks}
      />
    </div>
  );
};

export default Artworks;
