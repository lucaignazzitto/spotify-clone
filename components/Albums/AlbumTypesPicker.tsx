import { IncludesGroup } from "@/lib/models/album.inteface"
import Link from "next/link"

export const ALBUMNS_GROUP = [
  {
    group: 'album',
    title: 'Albums'
  },
  {
    group: 'single',
    title: 'Single and EP'
  },
  {
    group: 'compilation',
    title: 'Compilations'
  }
]

export default function AlbumTypesPicker({ activeGroup, redirectPath }: { activeGroup?: IncludesGroup | undefined, redirectPath?: (group: IncludesGroup) => string }) {
  return (
    ALBUMNS_GROUP.map((type) => (
      <Link href={redirectPath ? redirectPath(type.group as IncludesGroup) : { query: { group: type.group } }} scroll={false} key={type.group} className={`btn btn-small btn-rounded ${activeGroup === type.group ? 'btn-light' : 'btn-dark'} fs-12`}>{type.title}</Link>
    ))
  )
}