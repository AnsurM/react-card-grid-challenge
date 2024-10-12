import { getTrendingGifs } from "./giphyApi";

describe("giphyApi", async () => {
  const response = await getTrendingGifs({ offset: 0, limit: 10 });
  it("fetches trending gifs successfully", async () => {
    expect(response).toBeDefined();
  });
  it("fetches trending gifs with correct offset and limit", async () => {
    expect(response.pagination.offset).toBe(0);
    expect(response.pagination.count).toBe(10);
    expect(response.data.length).toBe(10);
  });
});
