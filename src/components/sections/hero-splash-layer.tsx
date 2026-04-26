export function HeroSplashLayer() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-222px] h-[793px] w-[838px] -translate-x-1/2 scale-[1.28] bg-[url('/images/hero-blur-color.svg')] bg-[length:233.46%_241.24%] bg-center bg-no-repeat"
      />

      <div
        className="pointer-events-none absolute -translate-x-1/2"
        style={{
          left: "calc(50% - 33px)",
          top: "-201px",
          width: `${980 * 1.52}px`,
          height: `${900 * 1.52}px`,
          opacity: 0.3,
        }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,rgba(255,14,255,0.38)_0%,rgba(255,14,255,0.2)_34%,rgba(255,14,255,0.08)_62%,rgba(255,14,255,0)_84%)] blur-[76px]" />
      </div>
    </>
  );
}
