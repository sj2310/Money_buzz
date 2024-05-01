import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import "./navbar.css";
import bull from "../images/bull.png";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const signUserOut = async () => {
    await signOut(auth);
    setIsOpen(!isOpen);
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <img className="bull" src={bull} alt=""></img>
        <Link to="/">
          <h1 className="nav-title">Money Buzz</h1>
        </Link>
      </div>
      <div className="nav-right">
        {!user ? (
          <div className="menu">
            <div
              className={`container ${isOpen ? "change" : ""}`}
              onClick={toggleMenu}
            >
              <div className="bar1" ></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <div className={`dropDown ${isOpen ? "openMenu" : ""}`}>
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/login" onClick={toggleMenu}>Login</Link>
            </div>
          </div>
        ) : (
          <div className="menu">
            <div
              className={`container ${isOpen ? "change" : ""}`}
              onClick={toggleMenu}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            <div className={`dropDown ${isOpen ? "openMenu" : ""}`}>
              <Link to="/" onClick={toggleMenu}>Home</Link>
              <Link to="/createpost" onClick={toggleMenu}>Post</Link>
              <Link  onClick={()=>signUserOut()} to="/" >Logout</Link>
            </div>
          </div>
        )}
        <div className="nav-profile">
          {user && (
            <span className="profileLogout">
              <img src={user?.photoURL || ""} alt="" className="dp-small" />
              {/* <button className="logout-button" onClick={signUserOut}>
                Logout
              </button> */}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
