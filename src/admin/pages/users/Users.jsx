import React from "react";

const Users = () => {

  
  const users = [
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
      status: "pending",
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
  ];
  return (
    <div className="">
      <div className="overflow-x-auto ps-8">
        <table className="table ">
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
            {users.map((user, index) => {
              return (
                <tr key={index}>
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
                         
                          className="btn !bg-[#00D390] btn-success btn-xs text-[#ffffff]"
                        >
                          Accept
                        </button>
                      </th>
                      <th className="!p-0">
                        <button className="btn !bg-[#ff1313]  btn-ghost btn-xs text-[#ffffff]">
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
