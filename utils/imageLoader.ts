import { IMG_URL } from "../constants/constants";

export const imageLoader = ({ src }: { src: string }) => `${IMG_URL}${src}`;
