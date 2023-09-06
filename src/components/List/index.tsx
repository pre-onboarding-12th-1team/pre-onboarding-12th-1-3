import { GlassIcon } from 'assets/svgs'
import classNames from 'classnames/bind'
import { ComponentProps, FC } from 'react'
import { boldText } from 'utils/bold'

import styles from './list.module.scss'

const cx = classNames.bind(styles)

interface SickListProps extends ComponentProps<'li'> {
  sick: string
  selected?: boolean
  keyword?: string
}

const List: FC<SickListProps> = ({ sick, selected, keyword, ...props }) => (
  <li className={cx('sickList', { selected: selected })} {...props}>
    <GlassIcon /> {keyword ? boldText(sick, keyword) : sick}
  </li>
)

export default List
