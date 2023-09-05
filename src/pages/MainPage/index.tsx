import classNames from 'classnames/bind'
import SearchBar from 'components/SearchBar'

import styles from './mainPage.module.scss'

const cx = classNames.bind(styles)

const MainPage = () => (
  <main className={cx('main')}>
    <h1 className={cx('title')}>
      국내 모든 임상시험 검색하고
      <br />
      온라인으로 참여하기
    </h1>
    <SearchBar />
  </main>
)

export default MainPage
