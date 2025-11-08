import { cookies } from "next/headers"
import pageBg from "@/public/images/bubble-3.jpg"
import Hero from "./Hero/Hero"
import GenericPlaylists from "@/components/Playlists/GenericPlaylists"
import style from "./Page.module.scss"
import BackgroundHandler from "@/components/Backound/Handler"

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

export default async function Profile({ params }: { params: Promise<{ id: string }>}) {
  const me = await load()
  const { id } = await params
  const { user, spotify } = await loadPlaylist(id) as any

  return (
    <div className={style.Homepage}>
      <BackgroundHandler src={pageBg} />
      {
        me && Object.keys(me).length ?
          <>
            <Hero me={me} />
            <section className={`page-section`}>
              <GenericPlaylists
                itemsPerRow={5}
                title={<span className={`section-title`}>Playlist pubbliche</span>}
                playlists={spotify}
              />
            </section>
            <section className={`page-section`}>
              <GenericPlaylists
                itemsPerRow={5}
                title={<span className={`section-title`}>Your playlists</span>}
                playlists={user}
              />
            </section>
          </>
          : null
      }
    </div>
  )
}
