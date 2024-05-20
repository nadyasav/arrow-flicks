import { COUNT_RATED_ON_PAGE } from "../constants/constants";
import { fetchRatedMovie } from "../store/ratedSlice";
import { store } from "../store/store";
import { FetchRatedParams, IFetchRatedResData, RatedId, RequesStatus } from "../types/types";

interface IResponse {
    data: IFetchRatedResData;
    status: string;
}

export const RatedMoviesRequest = async (ratedIds: Array<RatedId>, params: FetchRatedParams): Promise<IResponse> => {
    const { page, searchValue } = params;
    let ratedMovies = [...ratedIds];
    const response: IResponse = {
        data: {
          movies: [],
          page: 1,
          totalPages: 1
        },
        status: '',
    }

    if (!ratedIds.length) {
        return response;
    }

    ratedMovies = filterMovies(searchValue, ratedMovies);
    if (!ratedMovies.length) {
        return response;
    }

    const total = Math.ceil(ratedMovies.length / COUNT_RATED_ON_PAGE);
    response.data.totalPages = total;
    response.data.page = getCurrentPage(page, total);

    const ratedPart = getRatedMoviesOnPage(response.data.page, ratedMovies);
    const promices: Array<any> = [];

    ratedPart.forEach((item) => promices.push(store.dispatch(fetchRatedMovie(item.id.toString()))));
    const actions = await Promise.all(promices);

    const rejectedReq = actions.filter((item) => item.meta.requestStatus === RequesStatus.REJECTED);
    if(rejectedReq.length > 0) {
        response.status = RequesStatus.REJECTED;
        return Promise.resolve(response);
    }

    response.data.movies = actions.map((item) => item.payload);
    return Promise.resolve(response);
}

function getCurrentPage(page: number, totalPages: number): number {
    if (page < totalPages) {
        return page;
    }
    return totalPages;
}

function getRatedMoviesOnPage(page: number, ratedIds: Array<RatedId>): Array<RatedId> {
    let ratedPart;
    const startIndex = (page * COUNT_RATED_ON_PAGE) - COUNT_RATED_ON_PAGE;

    if(ratedIds.length >= page * COUNT_RATED_ON_PAGE) {
        ratedPart = [...ratedIds.slice(startIndex, startIndex + COUNT_RATED_ON_PAGE)];
    } else {
        ratedPart = [...ratedIds.slice(startIndex)];
    }

    return ratedPart;
}

function filterMovies(value: string, ratedIds: Array<RatedId>): Array<RatedId> {
    if (value === '') {
        return ratedIds;
    }
    const result = ratedIds.filter((item) => item.title.toLowerCase().search(value.toLowerCase()) !== -1);
    return result.length ? result : [];
};
