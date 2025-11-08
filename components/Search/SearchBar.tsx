"use client"
import debounce from 'lodash/debounce'
import { useCallback, useOptimistic, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormControl } from 'react-bootstrap'

export default function SearchBar({
  value,
  onChange = () => { },
  useUrlToStore,
  placeholder = "Search",
  helperText = "Search for track, artist or playlist",
}: {
  value?: string,
  onChange?: (value: string) => void,
  useUrlToStore?: boolean,
  placeholder?: string
  helperText?: string
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [, startTransition] = useTransition()

  const [, setOptimisticKeyword] = useOptimistic<string>(value)

  const makeSearch = useCallback(debounce((inputValue) => {
    if (useUrlToStore) {
      startTransition(() => {
        setOptimisticKeyword(inputValue)
        const queryParams = new URLSearchParams(searchParams)
        queryParams.set('q', inputValue)
        replace(`?${queryParams.toString()}`)
      })
    } else {
      onChange(inputValue)
    }
  }, 600), [])

  const searchHandler = (e) => {
    const inputValue = e.target.value
    makeSearch(inputValue)
  }

  return (
    <>
      <div>
        <FormControl defaultValue={value} placeholder={placeholder} onChange={searchHandler} />
      </div>
      {helperText && <p className='mt-3'>{helperText}</p>}
    </>
  )
}
