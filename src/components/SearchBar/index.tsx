import classNames from 'classnames/bind'
import SearchButton from 'components/SearchButton'
import SearchInput from 'components/SearchInput'
import SearchRecommendation from 'components/SearchRecommendation'
import { FormEvent, useState } from 'react'

import styles from './searchBar.module.scss'
// import { useAppSelector } from 'redux/hooks'

const cx = classNames.bind(styles)

const SearchBar = () => {
  // const { input } = useAppSelector((state) => state.sicks)

  const [isFocused, setIsFocused] = useState(false)

  const startSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    alert(e.currentTarget.querySelector('input')?.value)
  }

  return (
    <form className={cx('searchBar')} onSubmit={startSearch}>
      <SearchInput
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
      <SearchButton />
      {isFocused && <SearchRecommendation />}
    </form>
  )
}

export default SearchBar
