import { useState } from "react";
import { navbarStyles } from "../../assets/dummyStyles";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import logo from "../../assets/logo.png";

const STORAGE_KEY = "doctorToken_v1";

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDoctorLoggedIn, setIsDoctorLoggedIn] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });
  const location = useLocation();
  const navRef = useRef(null);
  const clerk = useClerk();
  const navigate = useNavigate();
  return (
    <> 
      <div className={navbarStyles.navbarBorder}>heee</div>
      <nav className={`${navbarStyles.navbarContainer} 
        ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden}`} ref={navRef}
      >
      <div className={navbarStyles.contentWrapper}>
        <div className={navbarStyles.flexContainer}>
          /* Logo */
          <Link to="/" className={navbarStyles.logoLink}>
            <div className={navbarStyles.logoContainer}>
              <div className={navbarStyles.logoImageWrapper}>
                <img
                  src={logo}
                  alt="Artzt bild"
                  className={navbarStyles.logoImage}
                />
              </div>
              <span className={navbarStyles.logoText}>Doctor</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className={navbarStyles.navLinksContainer}>
      </div>

      </nav>
    </>
  );
};

export default Navbar;