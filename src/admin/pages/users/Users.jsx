import React, { useState, useEffect } from "react";
import { authService } from "../../../services/authService";
import { LoadingSpinner } from "../../../component/LoadingSpinner";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingArtists = async () => {
    try {
      setLoading(true);
      const data = await authService.getPendingArtists();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to load pending artists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingArtists();
  }, []);

  const acceptArtists = async (id) => {
    try {
      await authService.approveArtist(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      alert("Artist approved successfully!");
    } catch (err) {
      alert("Failed to approve artist: " + (err.message || "Unknown error"));
    }
  };

  const declineArtist = async (id) => {
    try {
      await authService.rejectArtist(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      alert("Artist rejected successfully!");
    } catch (err) {
      alert("Failed to reject artist: " + (err.message || "Unknown error"));
    }
  };

  if (loading) return <LoadingSpinner text="Loading pending artists..." />;

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto ps-8">
        {users.length === 0 ? (
          <p className="text-gray-500 py-4 text-center text-lg">No pending artists to review.</p>
        ) : (
          <table className="table">
            <thead className="text-[#FF9E0C]">
              <tr>
                <th className="">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12 bg-gray-200">
                            <img
                              src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                              alt="Avatar"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{user.name || user.userName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>Artist</td>
                    <td>
                      <span className="badge badge-warning gap-1">
                        {user.status}
                      </span>
                    </td>

                    {user.status && user.status.toLowerCase() === "pending" && (
                      <>
                        <th className="!p-0 w-[10%]">
                          <button
                            onClick={() => {
                              acceptArtists(user.id);
                            }}
                            className="btn !bg-[#00D390] btn-success btn-xs text-[#ffffff]"
                          >
                            Accept
                          </button>
                        </th>
                        <th className="!p-0">
                          <button
                            onClick={() => {
                              declineArtist(user.id);
                            }}
                            className="btn !bg-[#ff1313] btn-ghost btn-xs text-[#ffffff]"
                          >
                            Decline
                          </button>
                        </th>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
