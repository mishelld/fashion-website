import "./AdvertSection.css";
import model7 from "../assets/model7.jpg";
import model8 from "../assets/model8.jpg";
import model9 from "../assets/model9.jpg";
import model10 from "../assets/model10.jpg";
import { useNavigate } from "react-router-dom";

function AdvertSection() {
  const navigate = useNavigate();

  return (
    <>
      <div className="advert-container">
        <div className="advert-left-side">
          <div className="img-container">
            <img src={model7} alt="Advert 1" />
            <div className="overlay">
              <h2>Men's Collection</h2>
              <button onClick={() => navigate("/cartPage")}>Buy Now</button>
            </div>
          </div>
        </div>
        <div className="advert-right-side">
          <div className="img-container">
            <img src={model10} alt="Advert 2" />
            <div className="overlay">
              <h2>Women's Collection</h2>
              <button onClick={() => navigate("/cartPage")}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdvertSection;
