import React, { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import "./Home.css";

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // includes links, move, opacity, size, etc.
    }).then(() => setReady(true));
  }, []);

  const particlesLoaded = useCallback(async () => {}, []);

  return (
    <div className="home-page">
      {/* Fixed background image for the whole page */}
      <div className="home-bg" />

      {/* Full-screen particles overlay (fixed, transparent) */}
      {ready && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fullScreen: { enable: true, zIndex: 1 }, // fixed behind content, above bg
            background: { color: { value: "transparent" } },
            fpsLimit: 60,
            detectRetina: true,
            particles: {
              number: { value: 130, density: { enable: true, area: 800 } },
              color: { value: "#ffffff" },
              shape: { type: "circle" },
              opacity: { value: 0.6 },
              size: { value: { min: 1, max: 3 } },
              links: {
                enable: true,
                color: "#ffffff",
                distance: 200,
                opacity: 0.35,
                width: 1
              },
              move: {
                enable: true,
                speed: 1.2,
                outModes: { default: "out" }
              }
            },
            interactivity: {
              events: {
                onHover: { enable: true, mode: "grab" },
                onClick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                grab: { distance: 140, links: { opacity: 0.8 } },
                push: { quantity: 3 },
                repulse: { distance: 120 }
              }
            }
          }}
        />
      )}

      {/* Your page content sits above particles & bg */}
      <section className="home-hero">
        <h1>Welcome to My Site</h1>
      </section>

      {/* Demo extra content to show scrolling keeps background */}
      <section className="home-section">
        <p>
          Add more sections here. The background image and particles stay put
          while the page scrolls.
        </p>
      </section>
    </div>
  );
}
