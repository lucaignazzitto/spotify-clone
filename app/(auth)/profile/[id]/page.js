import { cookies } from "next/headers"
import pageBg from "@/public/images/bubble-3.jpg"
import Hero from "./Hero/Hero"
import GenericPlaylists from "@/components/Playlists/GenericPlaylists"
import style from "./Page.module.scss"

const limit = 20
async function loadPlaylist () {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me/playlists?limit=${limit}`, {
    headers: { Cookie: cookies().toString() },
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

async function load(userId) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/me`, {
    headers: { Cookie: cookies().toString() },
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

export default async function Profile({ params }) {
  const me = await load(params.id)
  const playlists = await loadPlaylist()

  return (
    <main className={style.Homepage}>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      {
        me && Object.keys(me).length ?
          <>
            <Hero me={me} />
            <section className={`page-section`}>
              <GenericPlaylists
                direction="horizontal"
                itemsPerRow={5}
                title={<span className={`section-title`}>Your playlists</span>}
                playlists={playlists.user}
              />
            </section>
            <section className={`page-section`}>
              <GenericPlaylists
                direction="horizontal"
                itemsPerRow={5}
                title={<span className={`section-title`}>Playlist pubbliche</span>}
                playlists={playlists.spotify}
              />
            </section>
          </>
        : null
      }
    </main>
  )
}
