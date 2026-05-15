import React, { useEffect, useState } from "react";
import { notificationService } from "../services/notificationService";
import { formatImage } from "../utils/imageUtils";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationService.getNotifications();
        console.log("Notifications API Response:", response);

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

        dataToSet.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.date || a.timestamp || 0);
          const dateB = new Date(b.createdAt || b.date || b.timestamp || 0);
          return dateB - dateA;
        });

        setNotifications(dataToSet);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        if (err.message && err.message.includes("404")) {
          setNotifications([]);
        } else {
          setError(err.message || "Failed to load notifications.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />
      <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h1 className="text-4xl font-black text-[#5937E0] mb-8 drop-shadow-sm">
          My Notifications
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 bg-base-200 rounded-box shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h3 className="text-xl font-bold text-base-content">
              No notifications yet
            </h3>
            <p className="text-base-content/70 mt-2">
              When you win an artwork bid, you'll see it here!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {notifications.map((notification, index) => {
              let msg = notification.message || notification.content || "";
              let data = null;
              if (msg && msg.startsWith("{")) {
                try { data = JSON.parse(msg); } catch (e) {}
              }

              const displayTitle = data?.title || notification.title || notification.header || "Bid Update";
              const displayText = data?.text || data?.message || msg;
              const displayImage = data?.artworkId || notification.artworkId;

              return (
                <div
                  key={notification.id || index}
                  className="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="card-body p-6 flex flex-row items-start gap-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden text-black">
                        {notification.image || displayImage ? (
                          <img 
                            src={notification.image ? formatImage(notification.image) : `http://localhost:5028/api/Artwork/${displayImage}/image`} 
                            alt="Artwork" 
                            className="object-cover w-full h-full hover:scale-110 transition-transform duration-300" 
                          />
                        ) : (
                          <div className="bg-gradient-to-br from-[#5937E0] to-[#FF9E0C] w-full h-full flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h2 className="card-title text-lg font-bold text-primary">
                        {displayTitle}
                      </h2>
                      <div className="text-base-content/80 mt-1">
                        <div>
                          <p className="font-medium text-black">{displayText}</p>
                          {(data?.amount || notification.amount || notification.price) && (
                            <p className="text-[#FF9E0C] font-bold mt-1">
                              Final Price: ${data?.amount || notification.amount || notification.price}
                            </p>
                          )}
                          {(data?.artistName || notification.artistName) && (
                            <p className="text-sm opacity-70 text-black">
                              Artist: {data?.artistName || notification.artistName}
                            </p>
                          )}
                        </div>
                      </div>
                      {notification.createdAt || notification.date || notification.timestamp ? (
                        <p className="text-xs text-base-content/50 mt-2">
                          {new Date(notification.createdAt || notification.date || notification.timestamp).toLocaleString()}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Notifications;
