
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

interface ConfettiProps {
  isActive: boolean;
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await container?.refresh();
  }, []);

  if (!isActive) return null;

  return (
    <Particles
      id="confetti-particles"
      className="fixed inset-0 z-50 pointer-events-none"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
        particles: {
          number: {
            value: 0,
          },
          color: {
            value: ["#00FFFC", "#FC00FF", "#fffc00"],
          },
          shape: {
            type: ["circle", "square"],
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              minimumValue: 0,
              speed: 2,
              startValue: "max",
              destroy: "min",
            },
          },
          size: {
            value: 4,
            random: {
              enable: true,
              minimumValue: 2,
            },
          },
          life: {
            duration: {
              sync: true,
              value: 5,
            },
            count: 1,
          },
          move: {
            enable: true,
            gravity: {
              enable: true,
              acceleration: 10,
            },
            speed: {
              min: 10,
              max: 20,
            },
            decay: 0.1,
            direction: "none",
            straight: false,
            outModes: {
              default: "destroy",
              top: "none",
            },
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            direction: "random",
            move: true,
            animation: {
              enable: true,
              speed: 60,
            },
          },
          tilt: {
            direction: "random",
            enable: true,
            move: true,
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 60,
            },
          },
          roll: {
            darken: {
              enable: true,
              value: 25,
            },
            enable: true,
            speed: {
              min: 15,
              max: 25,
            },
          },
          wobble: {
            distance: 30,
            enable: true,
            move: true,
            speed: {
              min: -15,
              max: 15,
            },
          },
        },
        emitters: {
          life: {
            count: 0,
            duration: 0.1,
            delay: 0.4,
          },
          rate: {
            delay: 0.1,
            quantity: 150,
          },
          size: {
            width: 0,
            height: 0,
          },
        },
      }}
    />
  );
};

export default Confetti;
