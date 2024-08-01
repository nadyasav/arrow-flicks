import { z } from "zod";
import { RELEASE_YEAR_START, SortByKeysEnum } from "../../types/types";
import { validateRating } from "../../utils/validateRating";

export const urlParamsSchema = z.object({
  with_genres: z
  .array(z.string())
  .optional()
  .catch(undefined),
  primary_release_year: z
    .coerce.number()
    .int()
    .min(RELEASE_YEAR_START)
    .max(new Date().getFullYear())
    .optional()
    .catch(undefined),
  sort_by: z.nativeEnum(SortByKeysEnum).catch(SortByKeysEnum["popularity.desc"]),
  'vote_average.gte': z.coerce.number().optional().catch(undefined),
  'vote_average.lte': z.coerce.number().optional().catch(undefined),
})

export const filtersSchema = z.object({
  'vote_average.gte': z.number().min(0).max(10).optional(),
  'vote_average.lte': z.number().min(0).max(10).optional(),
}).partial().refine((data) => validateRating({
  voteAverageGte: data["vote_average.gte"],
  voteAverageLte: data["vote_average.lte"]
}), {
  message: "max rating value cannot be less than min",
  path: ['rating']});
