import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  const options = useMemo(
    () => ({
      particles: {
        number: {
          value: 100, // Number of stars
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: ["#ffffff", "#ffff99", "#ffcc00", "#ffdd55"], // Star colors
        },
        shape: {
          type: "star",
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 0.3,
            opacity_min: 0.3,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 2 },
          random: true,
          anim: {
            enable: true,
            speed: 1.5,
            size_min: 0.5,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 2, // Fixed slow falling speed
          direction: "bottom",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          angle: {
            value: 90,
            offset: 15, // Slight tilt variation
          },
        },
        collisions: {
          enable: true, // Enable bouncing effect
          mode: "bounce",
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "bubble",
          },
          onclick: {
            enable: true,
            mode: "repulse",
          },
          resize: true,
        },
        modes: {
          bubble: {
            distance: 200,
            size: 3,
            duration: 2,
            opacity: 1,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
        },
      },
      retina_detect: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default ParticlesComponent;
