import classNames from 'classnames/bind'
import useDebounce from 'hooks/useDebounce'
import {
  ChangeEventHandler,
  ComponentProps,
  FC,
  useCallback,
  useEffect,
  useState,
} from 'react'
import sick from 'services/sick'
import { SickResponseData } from 'types/sick'

import styles from './searchInput.module.scss'

const cx = classNames.bind(styles)

const SearchInput: FC<ComponentProps<'input'>> = ({ ...props }) => {
  const [value, setValue] = useState('')
  const [_, setSicks] = useState<SickResponseData>([])
  const fetchSick = useCallback(async (value: string) => {
    if (!value.length) return
    const { data } = await sick.getSick(value)
    setSicks(data)
  }, [])

  const debounce = useDebounce(fetchSick, 1000)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  useEffect(() => {
    debounce(value)
  }, [debounce, value])

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
