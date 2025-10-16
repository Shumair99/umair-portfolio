"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

type ConstellationProps = {
  className?: string;
};

export default function Constellation({ className }: ConstellationProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
    }).then(() => {
      if (mounted) setReady(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      detectRetina: true,
      fpsLimit: 60,
      particles: {
        number: {
          value: 200,
          density: { enable: true, area: 800 },
        },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
          value: 0.7,
          random: { enable: true, minimumValue: 0.3 },
        },
        size: {
          value: { min: 1, max: 2.2 },
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
        links: {
          enable: true,
          distance: 140,
          color: "#ffffff",
          opacity: 0.25,
          width: 0.6,
        },
      },
      interactivity: {
        detectsOn: "canvas",
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: false, mode: [] },
          resize: true,
        },
        modes: {
          grab: { distance: 180, links: { opacity: 0.35 } },
        },
      },
    }),
    [],
  );

  if (!ready) {
    return null;
  }

  return <Particles className={className} options={options} />;
}
