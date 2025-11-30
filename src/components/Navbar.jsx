import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./Navbar.css";
export default function NavbarComponent() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Watch Firebase Auth state (only show verified users)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setUser(currentUser.emailVerified ? currentUser : null);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    signOut(auth).catch((err) => console.error("Error signing out:", err));
  };

  return (
    <header className="nav-wrapper">
      <nav className="nav-glass" aria-label="Primary">
        {/* LEFT: Logo (ELCS always visible) */}
        <div className="nav-left">
          <Link to="/" className="nav-logo" aria-label="ELCS Home">
            <img
              src="/images/ELCS_final_logo.png"
              alt="ELCS Logo"
              style={{ height: "55px", width: "auto", borderRadius: "10px" }}
            /> 
          </Link>
        </div>

        {/* CENTER: Desktop links */}
        <ul className="nav-links-desktop">
          <li><Link to="/ittalk" className="nav-link">IT Talk</Link></li>
          <li><Link to="/login" className="nav-link">Login</Link></li>
          <li><Link to="/progress" className="nav-link">Progress</Link></li>
        </ul>

        {/* RIGHT: Desktop CTA + Mobile Hamburger */}
        <div className="nav-right">
          <Link to="/products" className="btn-primary desktop-only">Products</Link>

          {/* Mobile toggle on the far right */}
          <button
            className="nav-toggle"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* MOBILE DROPDOWN (full width, stacked) */}
        <ul className={`nav-links-mobile ${open ? "is-open" : ""}`}>
          <li><Link to="/ittalk" className="nav-link mobile-item">IT Talk</Link></li>
          <li><Link to="/login" className="nav-link mobile-item">Login</Link></li>
          <li><Link to="/progress" className="nav-link mobile-item">Progress</Link></li>

          {/* Mobile-only CTA */}
          <li>
            <Link to="/products" className="btn-primary btn-block">Products</Link>
          </li>

          {/* Auth actions (only if logged in) */}
          {user ? (
            <>
              <li className="mobile-auth">
                <span className="hello">Hi, {user.email}</span>
              </li>
              <li>
                <Link to="/profile" className="btn-link btn-block">Profile</Link>
              </li>
              <li>
                <button className="btn-outline btn-block" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : null}
        </ul>
      </nav>
    </header>
  );
}



// import { Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { auth } from '../firebase/config';
// import { onAuthStateChanged, signOut } from 'firebase/auth';

// export default function NavbarComponent() {
//   const [user, setUser] = useState(null);

//   // Watch Firebase Auth state
//  useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//     if (currentUser) {
//       await currentUser.reload(); // Refresh emailVerified
//       if (currentUser.emailVerified) {
//         setUser(currentUser); // ✅ only set if verified
//       } else {
//         setUser(null); // ❌ hide until verified
//       }
//     } else {
//       setUser(null);
//     }
//   });

//   return () => unsubscribe();
// }, []);


//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("User signed out.");
//       })
//       .catch((error) => {
//         console.error("Error signing out:", error);
//       });
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//       <div className="container">
//         <Link className="navbar-brand fw-bold" to="/">ELCS</Link>

//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="mainNavbar">
//           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//             <li className="nav-item">
//               <Link className="nav-link" to="/products">Products</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/ittalk">IT Talk</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/progress">Progress</Link>
//             </li>
//           </ul>

//           <ul className="navbar-nav mb-2 mb-lg-0">
//             {user ? (
//               <>
//                 <li className="nav-item">
//                   <span className="nav-link fw-bold">Hi, {user.email}</span>
//                 </li>
//                 <li className="nav-item">
//                   <Link className="nav-link" to="/profile">Profile</Link>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn btn-outline-primary btn-sm" to="/login">Login</Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }
