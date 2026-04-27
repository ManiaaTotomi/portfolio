export function HeroSplashLayer() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-280px] h-[1120px] w-[1500px] -translate-x-1/2 rounded-full opacity-80 blur-[82px] sm:h-[1280px] sm:w-[1740px] lg:top-[-250px]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,14,255,0.16) 0%, rgba(255,14,255,0.09) 34%, rgba(90,18,96,0.07) 54%, rgba(4,4,4,0) 78%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -translate-x-1/2 rounded-full blur-[76px]"
        style={{
          left: "calc(50% - 33px)",
          top: "-201px",
          width: `${980 * 1.52}px`,
          height: `${900 * 1.52}px`,
          opacity: 0.34,
          background:
            "radial-gradient(circle, rgba(255,14,255,0.34) 0%, rgba(255,14,255,0.16) 34%, rgba(255,14,255,0.06) 58%, rgba(255,14,255,0) 82%)",
        }}
      />
    </>
  );
}
