import { z } from "zod";
import { RELEASE_YEAR_START, SortByValuesEnum } from "../../types/types";
import { validateRating } from "../../utils/validateRating";

export const filtersSchema = z
  .object({
    withGenres: z
      .string()
      .array()
      .optional(),
    primaryReleaseYear: z
      .coerce.number()
      .int()
      .min(RELEASE_YEAR_START)
      .max(new Date().getFullYear())
      .optional(),
    sortBy: z.nativeEnum(SortByValuesEnum),
    rating: z.object({
      voteAverageGte: z.coerce.number().int().min(0).max(10).optional(),
      voteAverageLte: z.coerce.number().int().min(0).max(10).optional(),
    })
  }).partial().refine((data) => validateRating({...data.rating}), {
    message: "max rating value cannot be less than min",
    path: ['rating']});
