import Home from "./page/Home";
import Contact from "./page/Contactus";
import LoginForm from "./page/Login";
import RegisterForm from "./page/Register";
import Dashboard from "./admin/pages/dashboard/Dashboard";
import Artists from "./admin/pages/artists/Artists";
import Artworks from "./admin/pages/artworks/Artworks";
import Users from "./admin/pages/users/Users";
import Auctions from "./admin/pages/auctions/Auctions";
import AdminMain from "./admin/pages/adminMain/AdminMain";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Productpage from "./page/Product_page";
function App() {
  return (
    <>
      <div className="">
        {" "}
        {/* To avoid content hidden behind fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          {/* Admin Routes */}
          <Route path="/admin/" element={<Dashboard />}>
            <Route index element={<AdminMain />} />
            <Route path="artists" element={<Artists />} />
            <Route path="artworks" element={<Artworks />} />
            <Route path="users" element={<Users />} />
            <Route path="auctions" element={<Auctions />} />
          </Route>
          <Route path="/artworks" element={<Artworks />} />
          <Route path="/p" element={<Productpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
