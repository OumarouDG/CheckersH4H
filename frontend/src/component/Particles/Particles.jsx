import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";

const ParticlesComponent = () => {

  const options = useMemo(() => ({
    background: {
      color: "#000", 
    },
    particles: {
      number: {
        value: 60,
      },
      size: {
        value: 2, 
      },
      move: {
        enable: true, 
        speed: 1,
      },
      links: {
        enable: true,
        distance: 240, 
        color: "#ffffff", 
        opacity: 0.4, 
        width: 1, 
      },
    },
  }), []);

 
  const particlesInit = useCallback((engine) => {
    loadSlim(engine); 
  }, []);


  return <Particles id="tsparticles" init={particlesInit} options={options} />;
};

export default ParticlesComponent;
