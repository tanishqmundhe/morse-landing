import { Film } from "./film";

/**
 * Somebody's camera, in a call tile.
 *
 * The app draws a tile two ways: the person's picture on their profile colour
 * when the camera is off, and the camera itself when it is on. The page only
 * ever showed the first, which is why a product about people talking had no
 * people in it. This is the second — so wherever a `<Cam>` goes, the avatar
 * disc comes out, because a profile picture painted over a live feed is not a
 * state the app has.
 *
 * One file per profile colour, keyed the same way the stills were
 * (`/app/cam-<colour>.mp4`), so every tile in the app picks up its own person.
 * Loading, pausing offscreen and holding still for reduced motion are all
 * Film's, inherited rather than rebuilt.
 *
 * The people are Pexels footage, listed in docs/DESIGN.md. They are not
 * released models, so they stand in a generic call and never carry a quote or
 * an endorsement.
 */
export function Cam({ colour, className = "" }: { colour: string; className?: string }) {
  return <Film src={`/app/cam-${colour}.mp4`} poster={`/app/cam-${colour}.jpg`} className={className} />;
}
