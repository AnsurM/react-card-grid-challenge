import { FC, useMemo } from "react";
import { SkeletonLoader } from "../../";

import * as Styled from "./loadingIndicator.styles";

/**
 * Generates an array of SkeletonLoader components wrapped in styled containers.
 *
 * @param limit - The number of SkeletonLoader components to generate.
 * @returns An array of SkeletonLoader components.
 */
type GetLoadingSkeletonsListType = (limit: number) => JSX.Element[];
export const getLoadingSkeletonsList: GetLoadingSkeletonsListType = (limit) => {
  return new Array(limit).fill(0).map((_, index) => (
    <Styled.SkeletonLoaderContainer key={index}>
      <SkeletonLoader />
    </Styled.SkeletonLoaderContainer>
  ));
};

export const LoadingIndicator: FC<{ limit: number }> = ({ limit }) => {
  const loadingSkeletonsList = useMemo(() => {
    return getLoadingSkeletonsList(limit);
  }, [limit]);
  return (
    <Styled.LoadingContainer data-testid="skeleton-loading-container">
      {loadingSkeletonsList}
    </Styled.LoadingContainer>
  );
};
