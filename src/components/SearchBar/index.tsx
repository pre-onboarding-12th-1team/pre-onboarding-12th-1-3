import classNames from 'classnames/bind'
import SearchButton from 'components/SearchButton'
import SearchInput from 'components/SearchInput'
import SearchRecommendation from 'components/SearchRecommendation'
import { useState } from 'react'

import styles from './searchBar.module.scss'

const cx = classNames.bind(styles)

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <form className={cx('searchBar')}>
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
