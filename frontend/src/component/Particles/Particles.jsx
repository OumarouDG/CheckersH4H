import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";

const ParticlesComponent = () => {
  // Particle configuration options
  const options = useMemo(() => ({
    background: {
      color: "#000", // black background
    },
    particles: {
      number: {
        value: 60, // Number of particles
      },
      size: {
        value: 2, // Size of particles
      },
      move: {
        enable: true, // Particles will move
        speed: 1, // Movement speed
      },
      links: {
        enable: true, // Enable linking
        distance: 240, // Distance to link particles
        color: "#ffffff", // Link color (white)
        opacity: 0.4, // Opacity of the links
        width: 1, // Link width
      },
    },
  }), []);

  // Initialize particles engine with loadSlim
  const particlesInit = useCallback((engine) => {
    loadSlim(engine); // Load the slim version of the engine
  }, []);

  // Render the Particles component
  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticlesComponent;
