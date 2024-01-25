import SpotifyProvider from "services/SpotifyProvider"

export async function POST(request, context) {
  const url = await SpotifyProvider.retriveLoginUrl()
  return Response.json({ url })
}