import classNames from 'classnames/bind'

import styles from './searchRecommendation.module.scss'

const cx = classNames.bind(styles)

const SearchRecommendation = () => (
  <div className={cx('recommendation')}>
    <p>최근 검색어</p>
  </div>
)

export default SearchRecommendation
