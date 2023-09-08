import classNames from 'classnames/bind'
import List from 'components/List'
import useKeyEvent from 'hooks/useKeyEvent'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { selectSick } from 'redux/sickSlice'

import styles from './searchRecommendation.module.scss'

const cx = classNames.bind(styles)

const START_INDEX = -1

const SearchRecommendation = () => {
  const { sicks, input } = useAppSelector((state) => state.sicks)
  const dispatch = useAppDispatch()
  const [itemIndex, setItemIndex] = useState(START_INDEX)
  const liRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    if (liRef.current) {
      liRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [itemIndex])

  useEffect(() => {
    setItemIndex(START_INDEX)
  }, [input])

  useKeyEvent((e: KeyboardEvent) => {
    if (e.isComposing) return
    if (sicks.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        if (itemIndex >= sicks.length - 1) {
          setItemIndex(START_INDEX + 1)
          dispatch(selectSick(sicks[START_INDEX + 1].sickNm))
          return
        }
        setItemIndex(itemIndex + 1)
        dispatch(selectSick(sicks[itemIndex + 1].sickNm))
        break
      case 'ArrowUp':
        if (itemIndex < 0) return setItemIndex(sicks.length - 1)
        setItemIndex(itemIndex - 1)
        dispatch(selectSick(sicks[itemIndex - 1]?.sickNm || input))
    }
  })

  return (
    <div className={cx('recommendationBox')}>
      <p className={cx('recommendationTitle')}>추천 검색어</p>
      <ul className={cx('recommendationUl')}>
        {sicks?.length === 0 && (
          <p className={cx('resultEmpty')}>해당 검색결과가 없습니다.</p>
        )}
        {sicks.map((sick, index) => {
          const key = `${index}-${sick.sickNm}`
          return (
            <List
              key={key}
              keyword={input}
              liRef={(el) => {
                if (index === itemIndex) {
                  liRef.current = el
                }
              }}
              selected={index === itemIndex}
              sick={sick.sickNm}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default SearchRecommendation
