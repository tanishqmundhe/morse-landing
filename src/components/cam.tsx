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
 *
 * **Every clip closes its own loop.** The first set cut back to frame one on
 * the last frame, which is a visible jump on a talking head and the thing that
 * made the page look like three short clips rather than a call. Each is now
 * 5.4s whose final 0.6s is a crossfade from its own tail into its own head, so
 * there is no seam to see. Re-cut them the same way if they are ever replaced.
 *
 * Four faces, not three: the notes page takes `fjord` so the same person is
 * not on screen in two sections at once.
 * Loading, pausing offscreen and holding still for reduced motion are all
 * Film's, inherited rather than rebuilt.
 *
 * The people are Pexels footage, listed in docs/DESIGN.md. They are not
 * released models, so they stand in a generic call and never carry a quote or
 * an endorsement.
 */
export function Cam({
  colour,
  className = "",
  seat = 0,
}: {
  colour: string;
  className?: string;
  /** Which tile this is. Every clip is cut from one source recording, so
   *  played from the top they all blink, nod and smile on the same frame —
   *  and a room of people moving in lockstep is exactly what makes footage
   *  read as fake. The seat number puts each tile in a different part of its
   *  clip and runs it at a slightly different speed, so they drift apart
   *  instead of holding formation. */
  seat?: number;
}) {
  return (
    <Film
      src={`/app/cam-${colour}.mp4`}
      poster={`/app/cam-${colour}.jpg`}
      className={className}
      offset={[0, 1.9, 3.5, 2.7][seat % 4]}
      rate={[1, 0.94, 1.06, 0.97][seat % 4]}
    />
  );
}
