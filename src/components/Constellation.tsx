"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
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

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: "transparent" },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 130, density: { enable: true, area: 850 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: {
          value: 0.7,
          random: { enable: true, minimumValue: 0.35 },
        },
        size: { value: { min: 1, max: 2.4 } },
        move: {
          enable: true,
          speed: { min: 0.75, max: 2.2 },
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
        links: {
          enable: true,
          distance: 120,
          color: "#ffffff",
          opacity: 0.12,
          width: 0.4,
        },
      },
      interactivity: {
        detectsOn: "canvas" as const,
        events: {
          onHover: { enable: true, mode: "grab" },
          onClick: { enable: false },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 220,
            links: { opacity: 0.45 },
          },
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

