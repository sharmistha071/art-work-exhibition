import { useReducer, useEffect } from "react";
import initalState, { initalStateType } from "../state";

const _LOADING = "BOOK_LOADING";
const _RESPONSE_COMPLETE = "BOOK_RESPONSE_COMPLETE";
const _ERROR = "BOOK_ERROR";

type ActionTypes =
  | {
      type: "BOOK_LOADING";
    }
  | {
      type: "BOOK_RESPONSE_COMPLETE";
      payload: {
        response: []; // Adjust the type based on the actual response structure
      };
    }
  | {
      type: "BOOK_ERROR";
      payload: {
        error: {
          message?: string;
        }; // Adjust the type based on the actual error structure
      };
    };

const fetchReducer = (state: initalStateType, action: ActionTypes) => {
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
    default:
      return state;
  }
};

const useAPI = (url: string, extractData: any) => {
  const [state, dispatch] = useReducer(fetchReducer, initalState);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      dispatch({
        type: _LOADING
      });
      try {
        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();
        const formattedData = extractData(data.docs);
        console.log("formattedData", formattedData);
        dispatch({
          type: _RESPONSE_COMPLETE,
          payload: {
            response: formattedData
          }
        });
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted due to component unmount or new request.");
        } else {
          dispatch({
            type: _ERROR,
            payload: {
              error: error
            }
          });
        }
      }
    };
    fetchData();
    // Cleanup function
    return () => {
      console.log("clean up function.....");
      controller.abort();
    };
  }, [url, extractData]);

  // const loadInitialData = async () => {
  //   console.log("checking if it calls");
  //   const controller = new AbortController();
  //   dispatch({
  //     type: _LOADING
  //   });
  //   try {
  //     const response = await fetch(url, { signal: controller.signal });
  //     const data = await response.json();
  //     console.log("data", data);
  //     const formattedData = extractData(data.docs);

  //     console.log("formattedData in useAPI", formattedData);
  //     dispatch({
  //       type: _RESPONSE_COMPLETE,
  //       payload: {
  //         response: formattedData
  //       }
  //     });
  //   } catch (error: any) {
  //     if (error.name === "AbortError") {
  //       console.log("Fetch aborted due to component unmount or new request.");
  //     } else {
  //       dispatch({
  //         type: _ERROR,
  //         payload: {
  //           error: error
  //         }
  //       });
  //     }
  //   }
  // };

  return { state };
};

export default useAPI;
