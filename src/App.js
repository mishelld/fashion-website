import "./App.css";
import HeroSection from "./components/HeroSection";
import ShopSection from "./components/ShopSection";
import AdvertSection from "./components/AdvertSection";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthForm from "./components/AuthForm";
import CartPage from "./components/CartPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function HomePage() {
  return (
    <>
      <HeroSection />
      <ShopSection />
      <AdvertSection />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Auth" element={<AuthForm />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/Shop" element={<ShopSection />} />
      </Routes>
    </Router>
  );
}

export default App;
