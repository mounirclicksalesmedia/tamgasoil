import { notFound, permanentRedirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getPages } from "@/lib/content";
export default async function Page({params}: {params:Promise<{locale:string;slug:string}>}) {
 const {locale,slug}=await params;if(!isLocale(locale)||!getPages(locale).blog.posts.some(post=>post.slug===slug))notFound();permanentRedirect(`/${locale}/news/${slug}`);
}
