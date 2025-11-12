import Tracks from "@/components/Tracks/Tracks"
import Artists from '@/components/Artists/Artists'
import GenericAlbums from "@/components/Albums/GenericAlbums"
import { SearchInterface } from '@/lib/models/search.interface';

export default function SearchList({ results }: { results?: SearchInterface }) {
  return (
    <div>
      <section className={`page-section`}>
        <Tracks tracks={results?.tracks?.items} showImage={true} title={"Songs"} showOptions />
      </section>
      <section className={`page-section`}>
        <Artists direction='horizontal' artists={results?.artists?.items} title={"Artists"} />
      </section>
      <section className={`page-section`}>
        <GenericAlbums albums={results?.albums?.items} title={"Albums"} useLinkToArtist />
      </section>
    </div>
  )
}
