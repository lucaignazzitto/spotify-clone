import { cookies } from 'next/headers'
import pageBg from "@/public/images/bubble-3.jpg"
import BackgroundHandler from '@/components/Backound/Handler'
import GenericAlbumHero from '@/components/Hero/Album/GenericHero'
import { CategoryInteface } from '@/lib/models/category.interface'
import { AlbumInterface } from '@/lib/models/album.inteface'

async function loadCategory(id: string) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/browse/categories/${id}`, {
    headers: { Cookie: (await cookies()).toString() },
  })
   
  if (response.ok) {
    const categ = await response.json() as CategoryInteface
    return {
      href: categ.href,
      name: categ.name,
      images: categ.icons,
      total_tracks: 0,
    } as AlbumInterface
  } else {
    return
  }
}

export default async function CategoriesPage ({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params
  const category = await loadCategory(id)

  return (
    <div className={"mb-5"}>
      <BackgroundHandler src={pageBg} />
      <GenericAlbumHero album={category} showExtras={false} showShuffle={false} showPlay={false} showLike={false} />
      <div className='mt-3 mt-lg-4'>
        <p>No list, deprecated by spotify</p>
      </div>
    </div>
  )
}
