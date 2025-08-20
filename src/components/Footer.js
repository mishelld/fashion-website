import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <h2 className="footer-logo">LUXE</h2>
        <p className="footer-tagline">
          Elevating your style with premium fashion pieces that define modern
          elegance and timeless sophistication.
        </p>
      </div>

      <div className="footer-links">
        <div className="footer-column">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Shop</h3>
          <ul>
            <li>
              <a href="#">Women's Collection</a>
            </li>
            <li>
              <a href="#">Men's Collection</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Sale</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Support</h3>
          <ul>
            <li>
              <a href="#">Size Guide</a>
            </li>
            <li>
              <a href="#">Shipping & Returns</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
            <li>
              <a href="#">Press</a>
            </li>
            <li>
              <a href="#">Sustainability</a>
            </li>
          </ul>
        </div>

        <div className="footer-column newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to get special offers and updates.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 LUXE Fashion. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
