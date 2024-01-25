import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-3.jpg"
import GenericPlaylists from "@/components/Playlists/GenericPlaylists"
import style from "./Page.module.scss"

async function loadCategory(id) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/browse/categories/${id}/playlists`, {
    headers: { Cookie: cookies().toString() },
  })
   
  if (response.ok) {
    return response.json()
  } else {
    return []
  }
}

export default async function CategoriesPage ({ params }) {
  const categories = await loadCategory(params.id)
  return (
    <main className={style.CategoryPage}>
      <div className="page-background" style={{ backgroundImage: `url(${pageBg.src})`}}></div>
      <h1>Category Playlists</h1>
      <div className='mt-4 mt-lg-5'>
        <GenericPlaylists direction="horizontal" itemsPerRow={4} playlists={categories?.playlists?.items} />
      </div>
    </main>
  )
}
