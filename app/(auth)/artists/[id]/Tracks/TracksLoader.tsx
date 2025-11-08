import TracksLoader from '@/components/Loader/TracksLoader';

type Props = {
  className?: string,
  title?: string
}

export default function ArtistHeroLoader ({ className = "", title = "Popular songs" }: Props) {

  return (
    <div className={className}>
      <span className={`section-title`}>{title}</span>
      <div className='mt-4 mt-lg-5'>
        <TracksLoader direction='vertical' times={5} />
      </div>
    </div>
  )
}