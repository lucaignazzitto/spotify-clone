import GenericAlbumsLoader from '@/components/Loader/GenericAlbumsLoader';

type Props = {
  className?: string,
  title?: string
}

export default function AlbumsLoader ({ className = "", title = "Albumns" }: Props) {
  return (
    <div className={className}>
      { title ? <span className={`section-title`}>{title}</span> : null }
      <div className={`${title ? 'mt-5' : ''}`}>
        <GenericAlbumsLoader md={3} sm={4} xs={6} />
      </div>
    </div>
  )
}
