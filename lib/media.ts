/** Editorial covers; these are not documentary photographs of TAM projects. */
export function articleCover(slug: string): string {
  const covers: Record<string, string> = {
    "what-tank-bottoms-are-actually-worth": "/media/blog/what-tank-bottoms-are-actually-worth.jpg",
    "why-non-entry-changes-the-hse-case": "/media/blog/why-non-entry-changes-the-hse-case.jpg",
    "reading-api-653-as-an-owner": "/media/blog/reading-api-653-as-an-owner.jpg",
    "qualifying-to-work-in-the-gulf": "/media/blog/qualifying-to-work-in-the-gulf.jpg",
  };
  return covers[slug] ?? covers["what-tank-bottoms-are-actually-worth"];
}

/** Separate thumbnails keep the journal index from repeating article hero imagery. */
export function articleThumb(slug: string): string {
  const thumbs: Record<string, string> = {
    "what-tank-bottoms-are-actually-worth": "/media/services/svc-03.jpg",
    "why-non-entry-changes-the-hse-case": "/media/services/svc-04.jpg",
    "reading-api-653-as-an-owner": "/media/services/svc-05.jpg",
    "qualifying-to-work-in-the-gulf": "/media/services/svc-06.jpg",
  };
  return thumbs[slug] ?? thumbs["what-tank-bottoms-are-actually-worth"];
}

export const blogHero = "/media/terminal-night.webp";
