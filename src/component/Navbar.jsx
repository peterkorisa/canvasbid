import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getToken, removeToken, removeUser, getUserRole, getUser } from "../services/api";
import { authService } from "../services/authService";
import { notificationService } from "../services/notificationService";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userName, setUserName] = useState("");
  const [toastNotification, setToastNotification] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const prevCountRef = useRef(-1);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
    if (token) {
      const role = getUserRole();
      setUserRole(role);
      const user = getUser();
      if (user && user.email) {
        setUserName(user.email.split("@")[0]);
      }
    }
  }, []);

  // Polling for notifications
  useEffect(() => {
    if (!isLoggedIn || userRole !== "Buyer") return;

    let isMounted = true;
    
    const fetchNotifs = async () => {
      try {
        const response = await notificationService.getNotifications();
        let dataToSet = [];
        if (Array.isArray(response)) {
          dataToSet = response;
        } else if (response && Array.isArray(response.data)) {
          dataToSet = response.data;
        } else if (response && Array.isArray(response.notifications)) {
          dataToSet = response.notifications;
        } else if (response && typeof response === 'object') {
          dataToSet = [response];
        } else if (response && typeof response === 'string') {
          dataToSet = [{ message: response }];
        }

        const localNotifs = JSON.parse(localStorage.getItem('localNotifications') || '[]');
        dataToSet = [...localNotifs, ...dataToSet];

        const seen = new Set();
        dataToSet = dataToSet.filter(n => {
           const key = (n.message || n.content || n.body || '') + (n.title || n.header || '');
           if (seen.has(key)) return false;
           seen.add(key);
           return true;
        });

        if (isMounted) {
           const totalCount = dataToSet.length;
           const prevCount = prevCountRef.current;
           
           if (window.location.pathname === '/notifications') {
              localStorage.setItem('readNotificationsCount', totalCount.toString());
              setUnreadCount(0);
           } else {
              const readCount = parseInt(localStorage.getItem('readNotificationsCount') || '0', 10);
              setUnreadCount(Math.max(0, totalCount - readCount));
           }

           if (totalCount > prevCount && prevCount !== -1) {
              // New notification!
              const newNotif = dataToSet[0]; // Assuming first is newest, or we just take any new one
              setToastNotification(newNotif);
              setTimeout(() => {
                if (isMounted) setToastNotification(null);
              }, 5000);
           }
           prevCountRef.current = totalCount;
        }
      } catch (err) {
        // Silently ignore polling errors
      }
    };

    fetchNotifs(); // Fetch immediately on mount
    const interval = setInterval(fetchNotifs, 10000); // Poll every 10 seconds

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [isLoggedIn, userRole]);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setUserRole(null);
    setUserName("");
    navigate("/");
  };

  const getDashboardLink = () => {
    if (userRole === "Admin") return "/admin";
    if (userRole === "Artist") return "/artists/";
    return "/artworks";
  };

  return (
    <div className="">
      <div className="navbar bg-transparent shadow-sm w-full fixed top-0 left-0 z-50 backdrop-blur-md">
        {/* Left Section */}
        <div className="navbar-start ">
          {/* Mobile Menu */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow "
            >
              <li>
                <Link
                  to="/"
                  style={{ textShadow: "2px 2px 5px #000000" }}
                  className="!text-[#FF9E0C] !font-bold "
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/artworks"
                  style={{ textShadow: "2px 2px 5px #000000" }}
                  className="!text-[#FF9E0C] !font-bold"
                >
                  Artworks
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ textShadow: "2px 2px 5px #000000" }}
                  className="!text-[#FF9E0C] !font-bold"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost text-3xl !font-black !text-[#5937E0]"
          >
            Canvas Bid
          </Link>
        </div>

        {/* Center Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-base">
            <li>
              <Link
                to="/"
                style={{ textShadow: "2px 2px 5px #000000" }}
                className="!text-[#FF9E0C] !font-bold tracking-[0.1rem]"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/artworks"
                style={{ textShadow: "2px 2px 5px #000000" }}
                className="!text-[#FF9E0C] !font-bold tracking-[0.1rem]"
              >
                Artworks
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ textShadow: "2px 2px 5px #000000" }}
                className="!text-[#FF9E0C] !font-bold tracking-[0.1rem]"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Buttons */}
        <div className="navbar-end gap-2">
          {isLoggedIn ? (
            <>
              <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost">
                <span className="text-sm">{userName}</span>
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to={getDashboardLink()}>
                    {userRole === "Admin" ? "Admin Dashboard" : userRole === "Artist" ? "My Artworks" : "Dashboard"}
                  </Link>
                </li>
                {userRole === "Buyer" && (
                  <>
                    <li>
                      <Link to="/watchlist">My Watchlist</Link>
                    </li>
                    <li>
                      <Link to="/notifications">Notifications</Link>
                    </li>
                  </>
                )}
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
            {userRole === "Buyer" && (
              <Link to="/notifications" className="btn btn-ghost btn-circle relative ml-2">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  {unreadCount > 0 && (
                    <span className="badge badge-sm badge-secondary indicator-item font-bold">{unreadCount}</span>
                  )}
                </div>
              </Link>
            )}
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">
                Login
              </Link>
              <Link to="/register" className=" btn btn-primary !text-white">
                Register
              </Link>
            </>
          )}

          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              className="theme-controller"
              value="synthwave"
            />

            {/* sun icon */}
            <svg
              className="swap-off h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-on h-10 w-10 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>

      {/* Real-time Notification Toast */}
      {toastNotification && (
        <div className="toast toast-top toast-center z-[100] mt-16 cursor-pointer" onClick={() => { navigate('/notifications'); setToastNotification(null); }}>
          <div className="alert alert-info shadow-lg flex items-start gap-4 bg-primary text-primary-content hover:bg-primary-focus transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6 mt-1" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <h3 className="font-bold">{toastNotification.title || toastNotification.header || "New Notification!"}</h3>
              <div className="text-sm">{toastNotification.message || toastNotification.content || toastNotification.body || "You have a new update."}</div>
            </div>
            <button className="btn btn-sm btn-ghost ml-2" onClick={() => setToastNotification(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
