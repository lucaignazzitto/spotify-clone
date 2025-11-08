import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation'

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("me");

  revalidatePath('/', 'layout')
  return redirect('/login')
}