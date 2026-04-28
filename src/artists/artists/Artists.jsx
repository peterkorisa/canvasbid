import { FaUserPen } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa6";
import { FaUsersGear } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { FaPlusSquare } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

import { Link, Outlet, useNavigate } from "react-router-dom";

const Artists = () => {
  const navigate = useNavigate();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col h-screen overflow-x-hidden">
        {/* Navbar */}
        <nav className="navbar bg-base-300 w-screen ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-3xl !font-black !text-[#5937E0]">
            CanvasBid
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4 !text-white bg-[#1a1a40] grow ">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <button
                onClick={() => {
<<<<<<< HEAD
                  navigate("/artists/artworks");
=======
                  navigate("/artists/");
>>>>>>> origin/final-Attia
                }}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Artworks"
              >
                <RiAuctionFill className="text-xl" />

                <span className="is-drawer-close:hidden ">Artworks</span>
              </button>
            </li>
            {/*create artwork*/}
            <li>
              <button
                onClick={() => {
                  navigate("/artists/create");
                }}
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Create artwork"
              >
                <FaPlusSquare className="text-xl" />

                <span className="is-drawer-close:hidden ">Create artwork</span>
              </button>
            </li>
            
            {/*Delete artwork*/}

            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Artists;
