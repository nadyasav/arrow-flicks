import styles from './CardPoster.module.css';
import Image from 'next/image';
import { imageLoader } from '../../../../utils/imageLoader';
import { MovieCardSize } from '../../../../types/types';
import cn from 'classnames';

interface ICardPoster {
  src?: string;
  alt?: string;
  size?: MovieCardSize;
}

const posterSize = {
  sm: {
    width: 119,
    height: 170
  },
  lg: {
    width: 250,
    height: 352
  }
}

export default function CardPoster({ src, alt, size = 'sm' }: ICardPoster) {
  return (
    <div className={cn(styles.imgBox, styles[size])}>
      {src ?
        <Image alt={alt ? alt : ''} loader={imageLoader} src={src} {...posterSize[size]}></Image>
        : <Image className={styles.icon} src="/img/emptyPoster.svg" alt='' width={57} height={44}></Image>
      }
    </div>
  );
}
