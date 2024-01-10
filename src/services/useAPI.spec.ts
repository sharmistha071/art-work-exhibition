import { fetchReducer } from "./useAPI"; // Make sure to import your reducer file

const initialState = {
  loading: false,
  results: [],
  error: {}
};

const sampleResponse = [
  {
    id: 1,
    title: "Artwork 1",
    alt_text: "Alt Text 1",
    thumbnail: "thumbnail_url_1"
  },
  {
    id: 2,
    title: "Artwork 2",
    alt_text: "Alt Text 2",
    thumbnail: "thumbnail_url_2"
  }
];

describe("fetchReducer", () => {
  it("should handle BOOK_LOADING action", () => {
    const newState = fetchReducer(initialState, { type: "BOOK_LOADING" });
    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: {}
    });
  });

  it("should handle BOOK_RESPONSE_COMPLETE action", () => {
    const newState = fetchReducer(initialState, {
      type: "BOOK_RESPONSE_COMPLETE",
      payload: { response: sampleResponse }
    });
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      results: sampleResponse,
      error: {}
    });
  });

  it("should handle BOOK_ERROR action", () => {
    const errorPayload = { error: { message: "Test error message" } };
    const newState = fetchReducer(initialState, {
      type: "BOOK_ERROR",
      payload: errorPayload
    });
    expect(newState).toEqual({
      ...initialState,
      loading: false,
      error: errorPayload.error
    });
  });

  it("should handle IMAGE_DATA_COMPLETE action", () => {
    const stateWithResults = {
      ...initialState,
      results: sampleResponse
    };
    const newState = fetchReducer(stateWithResults, {
      type: "IMAGE_DATA_COMPLETE",
      payload: {
        response: {
          id: 1,
          thumbnail: "new_thumbnail_url_1"
        }
      }
    });
    expect(newState).toEqual({
      ...stateWithResults,
      results: [
        {
          id: 1,
          title: "Artwork 1",
          alt_text: "Alt Text 1",
          thumbnail: "new_thumbnail_url_1"
        },
        {
          id: 2,
          title: "Artwork 2",
          alt_text: "Alt Text 2",
          thumbnail: "thumbnail_url_2"
        }
      ]
    });
  });
});
