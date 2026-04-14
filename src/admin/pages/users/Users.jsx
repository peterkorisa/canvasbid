import React, { useState } from "react";

const Users = () => {
  function acceptArtists(id) {
    // console.log(i);
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, role: "artist", status: "active" } : user,
    );
    setusers(updatedUsers);
  }
  function declineArtist(id) {
    setusers((prev) =>
      prev.map((user) =>
        id === user.id ? { ...user, role: "user", status: "declined" } : user,
      ),
    );
  }

  const [users, setusers] = useState([
    {
      id: 1,
      name: "Ahmed Hassan",
      email: "ahmed@gmail.com",
      role: "user",
      status: "pending",
    },
    {
      id: 2,
      name: "Sara Ali",
      email: "sara@gmail.com",
      role: "user",
      status: "declined",
    },
    {
      id: 3,
      name: "Mohamed Tarek",
      email: "mohamed@gmail.com",
      role: "user",
      status: "pending",
    },
    {
      id: 4,
      name: "Nour Khaled",
      email: "nour@gmail.com",
      role: "user",
      status: "pending",
    },
    {
      id: 5,
      name: "Omar Adel",
      email: "omar@gmail.com",
      role: "user",
      status: "active",
    },
    {
      id: 6,
      name: "Laila Mostafa",
      email: "laila@gmail.com",
      role: "artist",
      status: "active",
    },
    {
      id: 7,
      name: "Youssef Samy",
      email: "youssef@gmail.com",
      role: "artist",
      status: "active",
    },
    {
      id: 8,
      name: "Mona Hany",
      email: "mona@gmail.com",
      role: "admin",
      status: "active",
    },
    {
      id: 9,
      name: "Karim Nabil",
      email: "karim@gmail.com",
      role: "user",
      status: "pending",
    },
    {
      id: 10,
      name: "Hana Magdy",
      email: "hana@gmail.com",
      role: "user",
      status: "pending",
    },
  ]);

  return (
    <div>
      <div className="overflow-x-auto ps-8">
        <table className="table">
          {/* head */}
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
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                        {/* <div className="text-sm opacity-50">United States</div> */}
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>

                  {user.status == "pending" && (
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
                          className="btn !bg-[#ff1313]  btn-ghost btn-xs text-[#ffffff]"
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
      </div>
    </div>
  );
};

export default Users;
