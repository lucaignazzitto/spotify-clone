import { cookies } from "next/headers"
import { AlbumInterface } from "@/lib/models/album.inteface"
import pageBg from "@/public/images/bubble-3.jpg"
import Hero from "@/components/Me/Hero/Hero"
import GenericPlaylists from "@/components/Playlists/GenericPlaylists"
import BackgroundHandler from "@/components/Backound/Handler"
import Albums from "@/components/Albums/GenericAlbums"

const limit = 20
async function loadPlaylist(id) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/playlists?limit=${limit}&user_id=${id}`, {
    headers: { Cookie: (await cookies()).toString() as string },
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        const { spotify = [], user = [] } = res?.items || []
        return { spotify, user }
      })
  } else {
    return []
  }
}

async function load() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me`, {
    headers: { Cookie: (await cookies()).toString() as string },
    next: {
      revalidate: 10,
      tags: ['user']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        const { me = {} } = res
        return me
      })
  } else {
    return {}
  }
}

async function loadSavedAlbum() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/albums`, {
    headers: { Cookie: (await cookies()).toString() as string },
    next: {
      revalidate: 10,
      tags: ['saved-albums']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        return res.items.map(i => ({ ...i.album, added_at: i.added_at })) as AlbumInterface[]
      })
  } else {
    return {}
  }
}

export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const me = await load()
  const { id } = await params
  const { user, spotify } = await loadPlaylist(id) as any
  const albums = await loadSavedAlbum() as any

  return (
    <div>
      <BackgroundHandler src={pageBg} />
      {
        me && Object.keys(me).length ?
          <>
            <Hero me={me} />
            <section className={`page-section`}>
              <GenericPlaylists
                itemsPerRow={5}
                title={<span className={`section-title`}>Your playlists</span>}
                playlists={spotify.concat(user)}
              />
            </section>
            <section className={`page-section`}>
              <span className={`section-title`}>Saved Albums</span>
              <div className="mt-3">
                <Albums albums={albums} />
              </div>
            </section>
          </>
          : null
      }
    </div>
  )
}
