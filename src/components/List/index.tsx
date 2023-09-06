import { GlassIcon } from 'assets/svgs'
import classNames from 'classnames/bind'
import { ComponentProps, FC } from 'react'

import styles from './list.module.scss'

const cx = classNames.bind(styles)

interface SickListProps extends ComponentProps<'li'> {
  sick: string
  selected?: boolean
}

const List: FC<SickListProps> = ({ sick, selected, ...props }) => (
  <li className={cx('sickList', { selected: selected })} {...props}>
    <GlassIcon /> {sick}
  </li>
)

export default List
