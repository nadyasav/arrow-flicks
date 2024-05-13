import styles from './MovieDetails.module.css';
import Image from 'next/image';
import { AspectRatio } from "@mantine/core";
import { CardContainer } from '../ui/cardContainer/CardContainer';
import { MovieProductionCompanies, MovieVideo } from '../../types/types';
import { imageLoader } from '../../utils/imageLoader';
import { useState } from 'react';

interface IMovieDetails {
    videos: Array<MovieVideo>;
    overview: string;
    companies: Array<MovieProductionCompanies>;
}

export default function MovieDetails(props: IMovieDetails) {
    const { videos, overview, companies } = props;
    const [ videoKey ] = useState<string>(getVideoKey(videos));

  return (
    <CardContainer>
        <div className={styles.detailsBox}>
        {videoKey &&
            <div className={styles.video}>
            <h3 className={styles.title}>Trailer</h3>
            <div className={styles.videoBox}>
                <AspectRatio ratio={500 / 281}>
                <iframe
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
                </AspectRatio>
            </div>
            </div>}

        {overview &&
            <>
            <div className={styles.separator} />
            <div className={styles.overview}>
                <h3 className={styles.title}>Description</h3>
                <p>{overview}</p>
            </div>
            </>}

        {!!companies.length &&
            <>
            <div className={styles.separator} />
            <div className={styles.companies}>
                <h3 className={styles.title}>Production</h3>
                <ul className={styles.companiesList}>
                {companies.map((item) => ( item.name && (
                    <li className={styles.companiesItem} key={item.id}>
                    <span className={styles.companiesIconBox}>
                        {item.logo_path ?
                        <Image className={styles.companiesIcon} alt={item.name} loader={imageLoader} src={item.logo_path} width={39} height={40}></Image>
                        : <Image className={styles.companiesEmptyIcon} src="/img/emptyCompany.svg" alt='' width={20} height={20}></Image>}
                    </span>
                    <h4>{item.name}</h4>
                    </li>)
                ))}
                </ul>
            </div>
            </>}
        </div>
    </CardContainer>
  );
}

function getVideoKey(arr: Array<MovieVideo>): string{
    const video = arr.find((item) => item.official);
    return video ? video.key : '';
}
