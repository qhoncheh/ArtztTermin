import { useEffect, useState } from "react";
import { navbarStyles } from "../../assets/dummyStyles";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  useClerk,
  UserButton,
} from "@clerk/clerk-react";
import logo from "../../assets/logo.png";
import { Key, Menu, User, X } from "lucide-react";

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

  // Hide and show navbar on scroll
 useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
// doctor login
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        setIsDoctorLoggedIn(Boolean(e.newValue));
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);
// close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  const navItems = [
    { label: "Startseite", href: "/" },
    { label: "Ärzte", href: "/doctors" },
    { label: "Leistungen", href: "/services" },
    { label: "Termine", href: "/appointments" },
    { label: "Kontakt", href: "/contact" },
  ];

  return (
    <>
      <div className={navbarStyles.navbarBorder}></div>
      <nav
        className={`${navbarStyles.navbarContainer} 
          ${showNavbar ? navbarStyles.navbarVisible : navbarStyles.navbarHidden}`}
        ref={navRef}
      >
        <div className={navbarStyles.contentWrapper}>
          <div className={navbarStyles.flexContainer}>
            {/* Logo */}
            <Link to="/" className={navbarStyles.logoLink}>
              <div className={navbarStyles.logoContainer}>
                <div className={navbarStyles.logoImageWrapper}>
                  <img
                    src={logo}
                    alt="Artzt bild"
                    className={navbarStyles.logoImage}
                  />
                </div>
              </div>
              <div className={navbarStyles.logoTextContainer}>
                <h1 className={navbarStyles.logoTitle}>Medicare</h1>
                <p className={navbarStyles.logoSubtitle}>Gesundheitslösungen</p>
              </div>
            </Link>
            <div className={navbarStyles.desktopNav}>
              <div className={navbarStyles.navItemsContainer}>
                {navItems.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`${navbarStyles.navItem} ${
                        isActive
                          ? navbarStyles.navItemActive
                          : navbarStyles.navItemInactive
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className={navbarStyles.rightContainer}>
              <SignedOut>
                <Link
                  to="/doctor-admin/login"
                  className={navbarStyles.doctorAdminButton}
                >
                  <User className={navbarStyles.doctorAdminIcon} />
                  <span className={navbarStyles.doctorAdminText}>
                    Arztverwaltung
                  </span>
                </Link>
                <button
                  onClick={() => clerk.openSignIn()}
                  className={navbarStyles.loginButton}
                >
                  <Key className={navbarStyles.loginIcon} />
                  Anmelden
                </button>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>

              {/* to toggle */}
              <button
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                className={navbarStyles.mobileToggle}
              >
                {!isOpen ? (
                  <Menu className={navbarStyles.toggleIcon} />
                ) : (
                  <X className={navbarStyles.toggleIcon} />
                )}
              </button>
            </div>
          </div>
          {/* mobile navigation  */}
          {isOpen && (
            <div className={navbarStyles.mobileMenu}>
              {navItems.map((item,index) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={index}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`${navbarStyles.mobileMenuItem} ${
                      isActive
                        ? navbarStyles.mobileMenuItemActive
                        : navbarStyles.mobileMenuItemInactive
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <SignedOut>
                <Link
                  to="/doctor-admin/login"
                  className={navbarStyles.mobileDoctorAdminButton}
                  onClick={() => setIsOpen(false)}
                >
                  Arztverwaltung
                </Link>
                <div className={navbarStyles.mobileLoginContainer}>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      clerk.openSignIn();
                    }}
                    className={navbarStyles.mobileLoginButton}
                  >Anmelden</button>
                </div>
              </SignedOut>
            </div>
          )}
        </div>
        <style>
          {navbarStyles.animationStyles}
        </style>
      </nav>
    </>
  );
};

export default Navbar;
