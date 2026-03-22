"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CtrlEatScreenShowcase, type SplashTone } from "@/components/sections/ctrleat-screen-showcase";
import { CTRLEAT_LIQUID_MOTION } from "@/components/sections/ctrleat-motion-config";

interface MobileScreen {
  src: string;
  alt: string;
  desktopOffset: string;
  height: number;
  width: number;
  isShowcase?: boolean;
  splashTone?: SplashTone;
}

interface CtrlEatScreensMotionGridProps {
  screens: readonly MobileScreen[];
}

interface Drift {
  x: number;
  y: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function CtrlEatScreensMotionGrid({ screens }: CtrlEatScreensMotionGridProps) {
  const [isActive, setIsActive] = useState(false);
  const [drift, setDrift] = useState<Drift>({ x: 0, y: 0 });
  const [knobs] = useState({
    sensitivity: CTRLEAT_LIQUID_MOTION.sensitivity,
    inertia: CTRLEAT_LIQUID_MOTION.velocityDamping,
    fluidity: CTRLEAT_LIQUID_MOTION.blobResponseMs,
    travel: CTRLEAT_LIQUID_MOTION.driftScaleY,
  });
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isActiveRef = useRef(false);
  const impulseRef = useRef<Drift>({ x: 0, y: 0 });
  const velocityRef = useRef<Drift>({ x: 0, y: 0 });
  const currentRef = useRef<Drift>({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const animateRef = useRef<() => void>(() => undefined);
  const activeTimeoutRef = useRef<number | null>(null);
  const velocityDamping = knobs.inertia;
  const positionDamping = clamp(knobs.inertia + 0.052, 0.9, 0.995);
  const driftScaleY = knobs.travel;
  const driftScaleX = knobs.travel * 0.82;

  const startAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      return;
    }
    frameRef.current = window.requestAnimationFrame(() => animateRef.current());
  }, []);

  useEffect(() => {
    animateRef.current = () => {
      const current = currentRef.current;
      const impulse = impulseRef.current;
      const velocity = velocityRef.current;

      velocity.x = clamp(
        velocity.x + impulse.x * CTRLEAT_LIQUID_MOTION.impulseSmoothing,
        -CTRLEAT_LIQUID_MOTION.maxVelocityX,
        CTRLEAT_LIQUID_MOTION.maxVelocityX,
      );
      velocity.y = clamp(
        velocity.y + impulse.y * CTRLEAT_LIQUID_MOTION.impulseSmoothing,
        -CTRLEAT_LIQUID_MOTION.maxVelocityY,
        CTRLEAT_LIQUID_MOTION.maxVelocityY,
      );
      impulse.x *= CTRLEAT_LIQUID_MOTION.impulseDecay;
      impulse.y *= CTRLEAT_LIQUID_MOTION.impulseDecay;

      current.x += velocity.x;
      current.y += velocity.y;
      velocity.x *= velocityDamping;
      velocity.y *= velocityDamping;
      current.x *= positionDamping;
      current.y *= positionDamping;

      const nextDrift = {
        x: current.x * driftScaleX,
        y: current.y * driftScaleY,
      };

      setDrift((prev) => {
        if (Math.abs(prev.x - nextDrift.x) < 0.05 && Math.abs(prev.y - nextDrift.y) < 0.05) {
          return prev;
        }
        return nextDrift;
      });

      const settledX = Math.abs(velocity.x) < CTRLEAT_LIQUID_MOTION.settleThreshold;
      const settledY = Math.abs(velocity.y) < CTRLEAT_LIQUID_MOTION.settleThreshold;
      const centeredX = Math.abs(current.x) < 0.002;
      const centeredY = Math.abs(current.y) < 0.002;

      if (!isActiveRef.current && settledX && settledY && centeredX && centeredY) {
        currentRef.current = { x: 0, y: 0 };
        impulseRef.current = { x: 0, y: 0 };
        velocityRef.current = { x: 0, y: 0 };
        setDrift({ x: 0, y: 0 });
        frameRef.current = null;
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => animateRef.current());
    };
  }, [driftScaleX, driftScaleY, positionDamping, velocityDamping]);

  useEffect(() => {
    return () => {
      if (activeTimeoutRef.current !== null) {
        window.clearTimeout(activeTimeoutRef.current);
      }
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const activate = useCallback(() => {
    isActiveRef.current = true;
    setIsActive(true);
    if (activeTimeoutRef.current !== null) {
      window.clearTimeout(activeTimeoutRef.current);
    }
    activeTimeoutRef.current = window.setTimeout(() => {
      isActiveRef.current = false;
      setIsActive(false);
      activeTimeoutRef.current = null;
    }, CTRLEAT_LIQUID_MOTION.activeGlowMs);
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) {
        return;
      }

      const isInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!isInside) {
        return;
      }

      activate();
      const normalizedX = clamp((event.clientX - rect.left) / rect.width, 0, 1) - 0.5;
      const impulseY = clamp(
        -event.deltaY * knobs.sensitivity,
        -CTRLEAT_LIQUID_MOTION.maxImpulse,
        CTRLEAT_LIQUID_MOTION.maxImpulse,
      );
      impulseRef.current.y = clamp(
        impulseRef.current.y + impulseY,
        -CTRLEAT_LIQUID_MOTION.maxImpulse * 2.4,
        CTRLEAT_LIQUID_MOTION.maxImpulse * 2.4,
      );
      impulseRef.current.x = clamp(
        impulseRef.current.x + impulseY * normalizedX * 1.8,
        -CTRLEAT_LIQUID_MOTION.maxImpulse * 1.8,
        CTRLEAT_LIQUID_MOTION.maxImpulse * 1.8,
      );
      startAnimation();
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [activate, knobs.sensitivity, startAnimation]);

  return (
    <div
      className="relative mx-auto mt-28 flex w-full max-w-[1319px] flex-wrap items-start justify-center gap-x-8 gap-y-10 lg:mt-32 lg:flex-nowrap lg:justify-between lg:gap-[69px]"
      ref={containerRef}
    >
      {screens.map((screen) => (
        <div className={screen.desktopOffset} key={screen.src}>
          {screen.isShowcase ? (
            <CtrlEatScreenShowcase
              alt={screen.alt}
              blobResponseMs={knobs.fluidity}
              driftX={drift.x}
              driftY={drift.y}
              height={screen.height}
              isActive={isActive}
              sizes="(min-width: 1280px) 392px, (min-width: 768px) 40vw, 85vw"
              splashTone={screen.splashTone ?? "greenGold"}
              src={screen.src}
              width={screen.width}
            />
          ) : (
            <Image
              alt={screen.alt}
              className="h-auto w-[295px] sm:w-[330px] lg:w-[392px]"
              height={screen.height}
              sizes="(min-width: 1280px) 392px, (min-width: 768px) 40vw, 85vw"
              src={screen.src}
              width={screen.width}
            />
          )}
        </div>
      ))}
    </div>
  );
}
