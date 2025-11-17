import { SearchInterface } from '@/lib/models/search.interface';
import { CategoryInteface } from '@/lib/models/category.interface';
import { cookies } from 'next/headers';
import { Metadata } from 'next'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Categories from '@/components/Categories/Categories'
import pageBg from "@/public/images/bubble-3.jpg"
import SearchList from '@/components/Search/List'
import SearchBar from '@/components/Search/SearchBar'
import BackgroundHandler from '@/components/Backound/Handler'

async function getCategories() {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/browse/categories?limit=${12}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: ['artist-album']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        const { items = [] } = res.categories
        return items as CategoryInteface[]
      })
  } else {
    return []
  }
}

async function getResults(keyword: string) {
  const response = await fetch(`${process.env.NEXT_LOCAL_DOMAIN}api/search?keyword=${encodeURIComponent(keyword)}`, {
    headers: { Cookie: (await cookies()).toString() },
    next: {
      revalidate: 3600,
      tags: ['artist-album']
    }
  })

  if (response.ok) {
    return response.json()
      .then((res) => {
        return res.results as SearchInterface
      })
  } else {
    return []
  }
}

export function generateMetadata(): Metadata {
  return {
    title: "What do you wanna hear?",
  }
}

export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q: keyword = '' } = await searchParams
  const categories = await getCategories()
  const results = keyword && await getResults(keyword) as SearchInterface

  return (
    <div>
      <BackgroundHandler src={pageBg} />
      <Container>
        <Row>
          <Col xs={12} lg={10} xl={8} className="mx-auto">
            <h1 className="page-title">What do you wanna hear?</h1>
            <section className={`pt-4`}>
              <SearchBar value={keyword} useUrlToStore />
            </section>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {
              keyword && keyword.length > 0 ?
                <SearchList results={results} key={keyword} />
                : <Categories categories={categories} notFoundMessage={""} />
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}
