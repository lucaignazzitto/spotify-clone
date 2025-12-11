
"use server";
import { cacheTag, revalidatePath, revalidateTag } from "next/cache";

export async function revalidateByPath(path: string, type?: 'layout' | 'page') {
  console.log('revalidatePath', path, type)
  revalidatePath(path, type);
}

export async function revalidateByTag(tag: string, profile?: string) {
  console.log('revalidateByTag', tag)
  revalidateTag(tag, profile || 'max');
}