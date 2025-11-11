import { mediaPlaceholder } from '@/utils/helpers'
import { UserInterface } from '@/lib/models/user.interface'
import Image from 'next/image'

export default async function Hero({ me }: { me: UserInterface }) {
  const [medium, small] = me?.images
  const image = medium || small

  return (
    <div className={"relative"}>
      <div className={"flex items-center"}>
        {image && image.url ?
          <div className={"relative rounded-lg overflow-hidden grow-0 shrink-0 basis-40 lg:basis-auto"}>
            <Image
              src={image.url}
              width={200}
              height={200}
              alt={`${me.display_name} profile image`}
              className="position-relative img-fluid"
              placeholder="blur"
              blurDataURL={mediaPlaceholder}
              loading="lazy"
            />
          </div> : null
        }
        <div className={"relative -ml-10 p-5! pr-0! lg:ml-10 lg:p-0! text-[12px] flex overflow-hidden justify-center flex-col min-h-52 rounded-lg backdrop-blur-2xl bg-black/10 lg:bg-black/0 lg:backdrop-blur-none"}>
          <div className={"capitalize"}>{me.product}</div>
          <h1 className="text-6xl">{me?.display_name}</h1>
          <div>{me?.followers?.total} Followers</div>
        </div>
      </div>
    </div>
  )
}