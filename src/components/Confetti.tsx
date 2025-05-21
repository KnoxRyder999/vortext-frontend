
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

interface ConfettiProps {
  isActive: boolean;
}

const Confetti = ({ isActive }: ConfettiProps) => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!isActive) return null;

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 z-50 pointer-events-none"
      options={{
        fullScreen: {
          enable: true,
          zIndex: 1,
        },
        particles: {
          number: {
            value: 100,
          },
          color: {
            value: [
              "#9b87f5", // Primary purple
              "#D946EF", // Pink
              "#F97316", // Orange
              "#0EA5E9", // Blue
              "#F2FCE2", // Soft green
              "#FEF7CD", // Soft yellow
            ],
          },
          shape: {
            type: ["circle", "square", "triangle"],
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0,
              sync: false,
              startValue: "max",
              destroy: "min",
            },
          },
          size: {
            value: { min: 3, max: 7 },
          },
          life: {
            duration: {
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
            speed: { min: 10, max: 20 },
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
            animation: {
              enable: true,
              speed: 30,
            },
          },
          tilt: {
            enable: true,
            direction: "random",
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 30,
            },
          },
          roll: {
            enable: true,
            darken: {
              enable: true,
              value: 25,
            },
          },
        },
        emitters: {
          position: {
            x: 50,
            y: 20,
          },
          size: {
            width: 100,
            height: 0,
          },
          rate: {
            delay: 0,
            quantity: 50,
          },
        },
      }}
    />
  );
};

export default Confetti;
