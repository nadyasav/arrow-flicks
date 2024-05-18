import { RatedId } from "../types/types";

export const getRatignById = (movieId: number, ratedIds: Array<RatedId>) => {
    const index = ratedIds.findIndex((item) => item.id === movieId);
    if (index > -1) {
        return ratedIds[index].rating;
    } else {
        return 0;
    }
}
