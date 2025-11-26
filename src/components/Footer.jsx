import React from "react";
import "./Footer.css"; // small optional CSS

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5 footer-shadow footer">

      {/* Top Section */}
      <div className="container">

        <div className="row gy-4">

          {/* Company Address */}
          <div className="col-md-4">
            <h5 className="fw-bold">ELCS Pvt Ltd</h5>
            <p className="mb-1">#24, Tech Valley, Electronic City</p>
            <p className="mb-1">Bengaluru, Karnataka 560100</p>
            <p className="mb-1">India</p>
          </div>

          {/* Contact */}
          <div className="col-md-4">
            <h6 className="fw-semibold text-primary">Contact</h6>
            <p className="mb-1"><strong>Email:</strong> info@elcs.com</p>
            <p className="mb-1"><strong>WhatsApp:</strong> +91 98765 43210</p>
            <p className="mb-1"><strong>Phone:</strong> +91 91234 56789</p>
          </div>

          {/* Social Links */}
          <div className="col-md-4">
            <h6 className="fw-semibold text-primary">Follow Us</h6>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-light text-decoration-none">📸</a>
              <a href="#" className="text-light text-decoration-none">💼</a>
              <a href="#" className="text-light text-decoration-none">💻</a>
            </div>
          </div>

        </div>

        {/* Sales Bar Graph */}
        {/* <div className="text-center mt-5">
          <h6 className="fw-semibold text-primary">Sales Overview</h6>

          <div className="d-flex justify-content-center align-items-end gap-4 mt-3 sales-bars">
            <div className="bar bg-primary" style={{ height: "60%" }}>Q1</div>
            <div className="bar bg-primary" style={{ height: "80%" }}>Q2</div>
            <div className="bar bg-primary" style={{ height: "50%" }}>Q3</div>
            <div className="bar bg-primary" style={{ height: "90%" }}>Q4</div>
          </div>
        </div> */}

        {/* Partner Companies */}
        {/* <div className="text-center mt-5">
          <h6 className="fw-semibold text-primary">Companies Collided With Us</h6>
          <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
            <span className="badge bg-secondary p-2 px-3">TechNova</span>
            <span className="badge bg-secondary p-2 px-3">ElectroSys</span>
            <span className="badge bg-secondary p-2 px-3">VoltEdge</span>
            <span className="badge bg-secondary p-2 px-3">CodeLogic</span>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="text-center text-secondary mt-4 pt-3 border-top">
          © {new Date().getFullYear()} ELCS Pvt Ltd. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
