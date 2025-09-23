import "../styles/Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const handleScroll = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (!href) return;
    const targetId = href.slice(1);
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const [open, setOpen] = useState(false);
  const toggleHamburger = () => setOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <a
            href="/"
            className="navbar-link"
            data-nav-link=""
            onClick={handleScroll}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/"
            className="navbar-link"
            data-nav-link=""
            onClick={handleScroll}
          >
            Idk
          </a>
        </li>
      </ul>

      <div className="hamburger-and-dropdown">
        <div className="hamburger">
          <div id="hamburger-container">
            <div
              id="hamburger"
              className={open ? "open" : ""}
              onClick={toggleHamburger}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
          <ul className="dropdown-item-container">
            <a
              className="navLinks"
              href="/"
              data-nav-link=""
              onClick={() => setOpen((prev) => !prev)}
            >
              <li className="dropdown-item">Home</li>
            </a>
            <a
              className="navLinks"
              href="/"
              onClick={() => setOpen((prev) => !prev)}
            >
              <li className="dropdown-item">Idk</li>
            </a>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
