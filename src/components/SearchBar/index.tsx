import classNames from 'classnames/bind'
import SearchButton from 'components/SearchButton'
import SearchInput from 'components/SearchInput'
import SearchRecommendation from 'components/SearchRecommendation'
import useEvent from 'hooks/useEvent'
import { FormEvent, useRef, useState } from 'react'

import styles from './searchBar.module.scss'

const cx = classNames.bind(styles)

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const startSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(e.currentTarget.querySelector('input')?.value)
  }

  useEvent('click', (e: MouseEvent) => {
    const clicked = e.target as Node
    const isInside =
      inputRef.current?.contains(clicked) || dropdownRef.current?.contains(clicked)
    setIsFocused(isInside ?? false)
  })

  return (
    <form className={cx('searchBar')} onSubmit={startSearch}>
      <SearchInput ref={inputRef} onFocus={() => setIsFocused(true)} />
      <SearchButton />
      {isFocused && <SearchRecommendation ref={dropdownRef} />}
    </form>
  )
}

export default SearchBar
