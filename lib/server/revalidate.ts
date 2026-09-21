import { revalidatePath } from "next/cache";

/** The site is small; after any content change, rebuild every public route. */
export function revalidateSite() {
  revalidatePath("/", "layout");
}
