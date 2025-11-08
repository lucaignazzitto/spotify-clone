import ArtistLoader from '@/components/Loader/ArtistLoader';

export default function RelatedLoader ({ className = "", title = "POPULAR SONGS" }) {

  return (
    <div className={className}>
      { title ? <span className={`section-title`}>{title}</span> : null }
      <div className={`${title ? 'mt-5' : ''}`}>
        <ArtistLoader md={3} sm={4} xs={6} />
      </div>
    </div>
  )
}