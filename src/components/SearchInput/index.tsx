import classNames from 'classnames/bind'
import { ChangeEventHandler, ComponentProps, FC } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { changeInput } from 'redux/sickSlice'

import styles from './searchInput.module.scss'

const cx = classNames.bind(styles)

const SearchInput: FC<ComponentProps<'input'>> = ({ ...props }) => {
  const { input } = useAppSelector((state) => state.sicks)
  const dispatch = useAppDispatch()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeInput(e.currentTarget.value))
  }

  return (
    <input
      className={cx('searchInput')}
      placeholder="질환명을 입력해 주세요."
      value={input}
      onChange={handleChange}
      {...props}
    />
  )
}

export default SearchInput
