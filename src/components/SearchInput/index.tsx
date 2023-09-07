import classNames from 'classnames/bind'
import { ChangeEventHandler, ComponentProps, FC, KeyboardEventHandler } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { changeInput, selectSick } from 'redux/sickSlice'

import styles from './searchInput.module.scss'

const cx = classNames.bind(styles)

const SearchInput: FC<ComponentProps<'input'>> = ({ ...props }) => {
  const { input, selectedSick } = useAppSelector((state) => state.sicks)
  const dispatch = useAppDispatch()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeInput(e.currentTarget.value))
  }

  const handleDelete: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      if (selectedSick) {
        dispatch(changeInput(selectedSick.slice(0, selectedSick.length - 1)))
        dispatch(selectSick(''))
        return
      }
      dispatch(changeInput(input.slice(0, input.length - 1)))
    }
  }

  return (
    <input
      className={cx('searchInput')}
      placeholder="질환명을 입력해 주세요."
      value={selectedSick || input}
      onChange={handleChange}
      onKeyDown={handleDelete}
      {...props}
    />
  )
}

export default SearchInput
