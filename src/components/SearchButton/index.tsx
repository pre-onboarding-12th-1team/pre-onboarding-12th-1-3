import { GlassIcon } from 'assets/svgs'
import classNames from 'classnames/bind'
import { ComponentProps, FC } from 'react'

import styles from './searchButton.module.scss'

const cx = classNames.bind(styles)

type SearchButtonProps = ComponentProps<'button'>

const SearchButton: FC<SearchButtonProps> = ({ ...props }) => (
  <button className={cx('searchButton', 'absoluteRight')} type="submit" {...props}>
    <GlassIcon className={cx('searchIcon')} />
  </button>
)

export default SearchButton
