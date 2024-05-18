import { COUNT_RATED_ON_PAGE } from "../constants/constants";
import { RatedId } from "../types/types";

export const getRatedIdsOnPage = (page: number, ratedIds: Array<RatedId>): Array<RatedId> => {
    let ratedPart;
    const startIndex = (page * COUNT_RATED_ON_PAGE) - COUNT_RATED_ON_PAGE;

    if(ratedIds.length >= page * COUNT_RATED_ON_PAGE) {
        ratedPart = [...ratedIds.slice(startIndex, startIndex + COUNT_RATED_ON_PAGE)];
    } else {
        ratedPart = [...ratedIds.slice(startIndex)];
    }

    return ratedPart;
}
