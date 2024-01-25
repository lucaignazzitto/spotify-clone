import TracksLoader from '@/components/Loader/TracksLoader';

export default function ArtistHeroLoader ({ className = "", title = "POPULAR SONGS" }) {

  return (
    <div className={className}>
      <span className={`section-title`}>{title}</span>
      <div className='mt-4 mt-lg-5'>
        <TracksLoader direction='veritical' times={5} />
      </div>
    </div>
  )
}