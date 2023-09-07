import classNames from 'classnames/bind'
import List from 'components/List'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectSick } from 'redux/sickSlice'

import styles from './searchRecommendation.module.scss'

const cx = classNames.bind(styles)

const START_INDEX = -1

const SearchRecommendation = () => {
  const { sicks, input } = useAppSelector((state) => state.sicks)
  const dispatch = useAppDispatch()
  const [itemIndex, setItemIndex] = useState(START_INDEX)

  useEffect(() => {
    setItemIndex(START_INDEX)
  }, [input])

  useEffect(() => {
    const handleSelectItem = (e: KeyboardEvent) => {
      if (e.isComposing) return

      if (e.key === 'ArrowDown' && itemIndex < sicks.length - 1) {
        setItemIndex(itemIndex + 1)
        dispatch(selectSick(sicks[itemIndex + 1].sickNm))
      } else if (e.key === 'ArrowUp' && itemIndex > START_INDEX) {
        setItemIndex(itemIndex - 1)
        dispatch(selectSick(sicks[itemIndex - 1]?.sickNm || input))
      }
    }
    window.addEventListener('keydown', handleSelectItem)

    return () => window.removeEventListener('keydown', handleSelectItem)
  }, [dispatch, input, itemIndex, sicks, sicks.length])

  return (
    <ul className={cx('recommendation')}>
      <p>추천 검색어</p>
      {sicks.map((sick, index) => {
        const key = `${index}-${sick.sickNm}`
        return (
          <List
            key={key}
            keyword={input}
            selected={index === itemIndex}
            sick={sick.sickNm}
          />
        )
      })}
    </ul>
  )
}

export default SearchRecommendation
