import SpotifyProvider from "@/services/SpotifyProvider"

export async function POST() {
  const url = await SpotifyProvider.retriveLoginUrl()
  return Response.json({ url })
}