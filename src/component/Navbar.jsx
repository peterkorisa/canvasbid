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
