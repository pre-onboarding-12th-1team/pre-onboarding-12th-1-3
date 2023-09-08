import classNames from 'classnames/bind'
import List from 'components/List'
import useEvent from 'hooks/useEvent'
import { forwardRef, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'redux/hooks'
import { changeInput, selectSick } from 'redux/sickSlice'

import styles from './searchRecommendation.module.scss'

const cx = classNames.bind(styles)

const START_INDEX = -1

// eslint-disable-next-line react/display-name
const SearchRecommendation = forwardRef<HTMLDivElement>((_, ref) => {
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

  useEvent('keydown', (e: KeyboardEvent) => {
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

  const handleClickList: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(changeInput(e.currentTarget.value))
  }

  return (
    <div className={cx('recommendationBox')} ref={ref}>
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
              onClick={handleClickList}
            />
          )
        })}
      </ul>
    </div>
  )
})

export default SearchRecommendation
