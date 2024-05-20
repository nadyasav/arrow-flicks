import { MAX_TOTAL_PAGES, MOVIES_ON_PAGE } from "../constants/constants";

export const getTotalPages = (total: number) => {
    return total <= MAX_TOTAL_PAGES ? Math.ceil(total / MOVIES_ON_PAGE) : Math.ceil(MAX_TOTAL_PAGES / MOVIES_ON_PAGE);
}
