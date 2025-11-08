import ArtistHeroLoader from "@/components/Loader/ArtistHeroLoader"
import TracksLoader from "@/components/Loader/TracksLoader"

export default function Loading () {
  return (
    <>
      <ArtistHeroLoader />
      <TracksLoader times={10} direction="vertical" className="mt-5" />
    </>
  )
}