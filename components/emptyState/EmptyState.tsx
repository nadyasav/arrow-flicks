import { useRouter } from "next/navigation";
import styles from './EmptyState.module.css';
import Image from 'next/image';
import { PrimaryButton } from "../primaryButton/PrimaryButton";
import Link from "next/link";
import cn from 'classnames';

export default function EmptyState(props: { withLogo: boolean, type: '404' | 'movies' }) {
  const router = useRouter();

  return (
    <div className={cn(styles.page, props.type === '404' && styles.notFaund)}>
      {props.withLogo &&
      <div className={styles.logoBox}>
        <Link href='/'>
          <Image alt='logo' src='/img/logo.svg' width="100" height="100" layout="responsive" objectFit="contain"></Image>
        </Link>
      </div>}
      {props.type === '404' &&
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.imgBox}>
              <Image alt='404_img' src='/img/404.svg' width="100" height="100" layout="responsive" objectFit="contain"></Image>
            </div>
            <div className={styles.textBox404}>
              <h2 className={styles.title}>We can’t find the page you are looking for</h2>
              <PrimaryButton onClick={()=>router.push('/movies')}>Go Home</PrimaryButton>
            </div>
          </div>
        </div>}
      {props.type === 'movies' &&
        <div className={styles.content}>
          <div className={styles.contentInner}>
            <div className={styles.imgBoxEmpty}>
              <Image alt='empty_img' src='/img/empty.svg' width="100" height="100" layout="responsive" objectFit="contain"></Image>
            </div>
            <div className={styles.textBox}>
              <h2 className={styles.title}>You haven&apos;t rated any films yet</h2>
              <PrimaryButton onClick={()=>router.push('/movies')}>Find movies</PrimaryButton>
            </div>
          </div>
        </div>}
    </div>
  )
}
