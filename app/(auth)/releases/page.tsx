import { cookies } from 'next/headers';
import { Metadata } from 'next'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import pageBg from "@/public/images/bubble-3.jpg"
import BackgroundHandler from '@/components/Backound/Handler'
import ReleaseAlbum from '@/components/Release/Album'

async function getReleases() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/browse/new-releases`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: ['artist-releases']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        return res.albums
      })
  } else {
    return []
  }
}


export function generateMetadata(): Metadata {
  return {
    title: "Latest releases",
  }
}

export default async function page() {
  const albums = await getReleases()

  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <div>
        <h1 className="page-title">News</h1>
        <p>Latest release for following artist, podcast and show</p>
        <div className={`mt-3 mt-lg-4`}>
          <Row>
            { albums.items.map((item) => (
              <Col xs={12} key={item.id} className='mb-4'>
                <ReleaseAlbum album={item} useType={true} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}
