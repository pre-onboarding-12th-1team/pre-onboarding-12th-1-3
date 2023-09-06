import classNames from 'classnames/bind'
import useDebounce from 'hooks/useDebounce'
import { ChangeEventHandler, ComponentProps, FC, useCallback, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { changeInput, setSick } from 'redux/sickSlice'
import sick from 'services/sick'

import styles from './searchInput.module.scss'

const cx = classNames.bind(styles)

const SearchInput: FC<ComponentProps<'input'>> = ({ ...props }) => {
  const { input } = useAppSelector((state) => state.sicks)
  const dispatch = useAppDispatch()
  const fetchSick = useCallback(
    async (value: string) => {
      const { data } = await sick.getSick(value)
      console.info('calling api')
      dispatch(setSick(data))
    },
    [dispatch],
  )

  const debounce = useDebounce(fetchSick, 500)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(changeInput(e.currentTarget.value))
  }

  useEffect(() => {
    debounce(input)
  }, [debounce, input])

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
