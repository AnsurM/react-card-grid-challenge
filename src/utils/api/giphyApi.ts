import { Gif, Pagination } from "../types";
import {
  GIPHY_SEARCH_ENDPOINT,
  GIPHY_TRENDING_ENDPOINT,
} from "./giphyApi.constants";

interface GifResponse {
  data: Gif[];
  pagination: Pagination;
  meta: {
    status: number;
    msg: string;
    response_id: string;
  };
}

interface GetTrendingGifsParams {
  offset: number;
  limit: number;
}

export const getTrendingGifs = async ({
  offset,
  limit,
}: GetTrendingGifsParams): Promise<GifResponse> => {
  const response = await fetch(
    `${GIPHY_TRENDING_ENDPOINT}&limit=${limit}&offset=${offset}&rating=g`
  );
  const data = await response.json();
  return data;
};

interface GetSearchGifsParams {
  query: string;
  offset: number;
  limit: number;
}

export const getSearchGifs = async ({
  query,
  offset,
  limit,
}: GetSearchGifsParams): Promise<GifResponse> => {
  const response = await fetch(
    `${GIPHY_SEARCH_ENDPOINT}&q=${query}&limit=${limit}&offset=${offset}&rating=g`
  );
  const data = await response.json();
  return data;
};
