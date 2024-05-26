export const validateRating = (rating: {
  voteAverageGte?: number;
  voteAverageLte?: number;
}): boolean => {
  if(!(rating.voteAverageGte !== undefined && rating.voteAverageLte !== undefined)) {
    return true;
  }

  const isInValidRange = rating.voteAverageGte <= 10 && rating.voteAverageLte <= 10;
  return !(isInValidRange && rating.voteAverageLte < rating.voteAverageGte) ;
}
