import "./HeroSection.css"; // optional if you want separate styling
import modelImage from "../assets/model.png"; // your image path
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div id="home" className="Hero-container">
      <div className="left-side">
        <div className="left-container">
          <h1 className="page-title">Ethereal Allure</h1>
          <h3 className="page-prg">
            Let yourself be the center — effortlessly radiant and captivating.
            Every detail lifts you up, celebrating your quiet confidence. Glow
            from within, while the world softly fades away.
          </h3>
          <button onClick={() => navigate("/shop")} className="buy-now-btn">
            Shop Collection
          </button>
        </div>
      </div>
      <div className="mid-side">
        <img src={modelImage} alt="model" className="image" />
      </div>
    </div>
  );
}

export default HeroSection;
