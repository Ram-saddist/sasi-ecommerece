import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function NavbarComponent() {
  const [user, setUser] = useState(null);

  // Watch Firebase Auth state
 useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      await currentUser.reload(); // Refresh emailVerified
      if (currentUser.emailVerified) {
        setUser(currentUser); // ✅ only set if verified
      } else {
        setUser(null); // ❌ hide until verified
      }
    } else {
      setUser(null);
    }
  });

  return () => unsubscribe();
}, []);


  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">ELCS</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ittalk">IT Talk</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/progress">Progress</Link>
            </li>
          </ul>

          <ul className="navbar-nav mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link fw-bold">Hi, {user.email}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-primary btn-sm" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
