import React from "react";

const PendingArtworksTable = ({ pendingArtworks,handleAccept,handleDecline}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead className="text-[#FF9E0C]">
            <tr>
              <th>Artwork</th>
              <th>Artist</th>
              <th>status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingArtworks.map((art) => (
              <tr key={art.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={art.images[0]}
                          alt="Artwork's photo"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{art.title}</div>
                      
                    </div>
                  </div>
                </td>
                <td>
                 {art.artistName}
                  
                  
                </td>
                <td>{art.status}</td>
                <th className=" flex flex-row gap-4">
                  <button onClick={()=>handleAccept(art.id)} className="btn !bg-success btn-success">Accept</button>
                  <button onClick={()=>handleDecline(art.id)} className="btn !bg-error btn-error">decline</button>
                </th>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingArtworksTable;
