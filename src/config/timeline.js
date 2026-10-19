/**
 * Staggered reveal timeline configuration.
 * Controls the exact timings for the transition from Loader to Home.
 */
export const TIMELINE = {
  // 0ms: progress = 100%. Loader text & bar blur and fade out over 600ms. Lightning flickers off over 400ms.
  loaderExitDuration: 600,

  // 600ms: Loader unmounts. Hold starfield only for 300ms (until 900ms).
  starfieldHoldDuration: 300,

  // 900ms: Navbar fades in (opacity 0 -> 1) and slides down (12px -> 0) over 500ms.
  navbarFadeIn: 900,

  // 1200ms: Title Line 1 ("Turning Ideas") and MusicCard reveal over 600ms.
  title1Reveal: 1200,

  // 1350ms (150ms later): Title Line 2 ("Into Reality") reveals over 600ms.
  title2Reveal: 1350,

  // 1600ms+: Staggered content (100ms apart)
  typewriterReveal: 1600,
  bioReveal: 1700,
  buttonsReveal: 1800,
  socialReveal: 1900,
};
