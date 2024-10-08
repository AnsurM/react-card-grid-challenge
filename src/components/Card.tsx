import { FC } from "react";
import { Gif } from "../types";
import styled from "styled-components";

interface CardProps {
  gif: Gif;
  onClick: (gif: Gif) => void;
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 200px;
  height: 0;
  padding-bottom: 100%;
  position: relative;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
  object-fit: cover;
`;

const StyledTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
`;

export const Card: FC<CardProps> = ({ gif, onClick }) => {
  return (
    <StyledCard onClick={() => onClick(gif)}>
      <StyledImage src={gif.images.original.url} alt={gif.title} />
      <StyledTitle>
        {gif.title.substring(0, 30)}
        {gif.title.length > 30 ? "..." : ""}
      </StyledTitle>
    </StyledCard>
  );
};
