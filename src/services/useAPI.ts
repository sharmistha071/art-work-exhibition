import { useReducer, useEffect } from "react";
import initalState, { initialStateType } from "../state";
import { BASE_URL } from "../utils/endpoint";
import { FormattedArtWork, OriginalArtWork } from "../utils/globalTypes";

const _LOADING = "BOOK_LOADING";
const _RESPONSE_COMPLETE = "BOOK_RESPONSE_COMPLETE";
const _ERROR = "BOOK_ERROR";
const _IMAGE_DATA_COMPLETE = "IMAGE_DATA_COMPLETE";

type ActionTypes =
  | {
      type: "BOOK_LOADING";
    }
  | {
      type: "BOOK_RESPONSE_COMPLETE";
      payload: {
        response: FormattedArtWork[];
      };
    }
  | {
      type: "BOOK_ERROR";
      payload: {
        error: {
          message?: string;
        };
      };
    }
  | {
      type: "IMAGE_DATA_COMPLETE";
      payload: {
        response: {
          id: number;
          thumbnail: string;
        };
      };
    };

export const fetchReducer = (state: initialStateType, action: ActionTypes) => {
  switch (action.type) {
    case _LOADING:
      return {
        ...state,
        loading: true,
        error: {}
      };
    case _RESPONSE_COMPLETE:
      return {
        ...state,
        loading: false,
        results: action.payload.response,
        error: {}
      };
    case _ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    case _IMAGE_DATA_COMPLETE: {
      const newState = state.results.map((item) => {
        if (item.id === action.payload.response.id) {
          return {
            ...item,
            thumbnail: action.payload.response.thumbnail
          };
        } else return item;
      });
      return {
        ...state,
        results: newState
      };
    }
    default:
      return state;
  }
};

type ExtractDataFunction = (data: OriginalArtWork[]) => FormattedArtWork[];

const useAPI = (url: string, extractData: ExtractDataFunction) => {
  const [state, dispatch] = useReducer(fetchReducer, initalState);

  const fetchImagedata = (imageIds: number[]) => {
    imageIds.forEach(async (element: number) => {
      const image_response = await fetch(
        `${BASE_URL}/api/v1/artworks/${element}?fields=image_id`
      );
      const data = await image_response.json();
      const thumbnail_id = data.data.image_id;
      dispatch({
        type: _IMAGE_DATA_COMPLETE,
        payload: {
          response: {
            id: element,
            thumbnail: thumbnail_id
          }
        }
      });
    });
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      dispatch({
        type: _LOADING
      });
      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        const formattedData = extractData(data.data);
        fetchImagedata(formattedData.map((item: FormattedArtWork) => item.id));
        dispatch({
          type: _RESPONSE_COMPLETE,
          payload: {
            response: formattedData
          }
        });
      } catch (error: unknown) {
        if (error && typeof error === "object" && "message" in error) {
          dispatch({
            type: _ERROR,
            payload: {
              error: {
                message: (error as { message: string }).message
              }
            }
          });
        }
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      controller.abort();
    };
  }, [url, extractData]);

  return { state };
};

export default useAPI;
