export const CTRLEAT_LIQUID_MOTION = {
  // Higher = reacts more to scroll movement.
  sensitivity: 0.0009,
  // Caps the per-wheel input impulse.
  maxImpulse: 0.08,

  // Higher = blobs can travel farther before being clamped.
  maxVelocityX: 0.2,
  maxVelocityY: 0.28,

  // Input smoothing:
  // Lower smoothing = gentler acceleration.
  impulseSmoothing: 0.08,
  // Closer to 1 = wheel energy lingers longer.
  impulseDecay: 0.9,

  // Inertia controls:
  // Closer to 1 = longer glide, lower = faster stop.
  velocityDamping: 0.955,
  positionDamping: 0.989,

  // Maps internal physics to visible travel distance.
  driftScaleX: 130,
  driftScaleY: 165,

  // Smaller threshold = longer settle time.
  settleThreshold: 0.00025,

  // How long active glow stays after a scroll burst.
  activeGlowMs: 720,

  // Blob rendering response:
  // More pixels = stronger corner drift arc.
  cornerTravelPixels: 30,
  // Higher ms = more fluid/laggy liquid feel.
  blobResponseMs: 620,
} as const;
