import styled from "styled-components";

export const SkeletonLoader = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  animation: skeleton-loading 1s linear infinite alternate;

  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 80%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
    }
  }
`;
