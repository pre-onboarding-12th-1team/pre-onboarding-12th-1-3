import classNames from 'classnames/bind'
import { ChangeEventHandler, ComponentProps, FC, useState } from 'react'

import styles from './searchInput.module.scss'

const cx = classNames.bind(styles)

const SearchInput: FC<ComponentProps<'input'>> = ({ ...props }) => {
  const [value, setValue] = useState('')

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  return (
    <input
      className={cx('searchInput')}
      placeholder="질환명을 입력해 주세요."
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}

export default SearchInput
