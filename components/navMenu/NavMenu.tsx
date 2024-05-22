import styles from './NavMenu.module.css';
import cn from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PATHS } from '../../constants/constants';

export const NavMenu = () => {
  const pathname = usePathname();

  return (
    <ul className={styles.list}>
      {PATHS.map((item) => (
      <li className={cn(styles.listItem, pathname?.startsWith(item.path) && styles.active)} key={item.title}>
        <Link href={item.path}>{item.title}</Link>
      </li>
      ))}
    </ul>
);}
